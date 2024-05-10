import {
	AfterChangeHook,
	BeforeChangeHook,
} from "payload/dist/collections/config/types";
import { PRODUCT_CATEGORIES } from "../../config/index";
import { Access, CollectionConfig } from "payload/types";
import { Product } from "../../cms-types";
import { stripe } from "../../lib/stripe";
import { User } from "payload/dist/auth";

const addUser: BeforeChangeHook<Product> = async ({ req, data }) => {
	const user = req.user;

	return { ...data, user: user.id };
};

const syncUser: AfterChangeHook<Product> = async ({ req, doc }) => {
	// retrieve the full user data by their ID from the "users" collection using the request payload.
	const fullUser = await req.payload.findByID({
		collection: "users",
		id: req.user.id,
	});

	if (fullUser && typeof fullUser === "object") {
		// destructure the 'products' field from the full user data.
		const { products } = fullUser;

		// create an array containing unique IDs of products associated with the user.
		const allIDs = [
			...(products?.map((product) =>
				typeof product === "object" ? product.id : product,
			) || []),
		];

		// filter out duplicate product IDs to ensure uniqueness.
		const createdProductIDs = allIDs.filter(
			(id, index) => allIDs.indexOf(id) === index,
		);

		// construct an updated array of product IDs by adding the ID of the changed product (doc).
		const dataToUpdate = [...createdProductIDs, doc.id];

		// update the user's product list in the database with the new array of product IDs.
		await req.payload.update({
			collection: "users",
			id: fullUser.id,
			data: {
				products: dataToUpdate,
			},
		});
	}
};

const isAdminOrHasAccess =
	(): Access =>
	({ req: { user: _user } }) => {
		const user = _user as User | undefined;

		if (!user) return false;
		if (user.role === "admin") return true;

		// @ts-ignore
		const userProductIDs = (user.products || []).reduce<Array<string>>(
			// @ts-ignore
			(acc, product) => {
				if (!product) return acc;
				if (typeof product === "string") {
					acc.push(product);
				} else {
					acc.push(product.id);
				}

				return acc;
			},
			[],
		);

		return {
			id: {
				in: userProductIDs,
			},
		};
	};
export const Products: CollectionConfig = {
	slug: "products", // table name
	admin: {
		useAsTitle: "name",
	},
	access: {
		read: isAdminOrHasAccess(),
		update: isAdminOrHasAccess(),
		delete: isAdminOrHasAccess(),
	},
	hooks: {
		afterChange: [syncUser],
		beforeChange: [
			addUser,
			async (args) => {
				if (args.operation === "create") {
					const data = args.data as Product;

					// when product is created, tell Stripe...
					const createdProduct = await stripe.products.create({
						name: data.name,
						default_price_data: {
							currency: "CAD",
							unit_amount: Math.round(data.price * 100), // cents 12.00
						},
					});

					// ...what data Stripe uses internally?
					const updated: Product = {
						...data,
						stripeId: createdProduct.id,
						priceId: createdProduct.default_price as string,
					};

					return updated;
				} else if (args.operation === "update") {
					const data = args.data as Product;

					// when product is updated, tell Stripe...
					const updatedProduct = await stripe.products.update(data.stripeId!, {
						name: data.name,
						default_price: data.priceId!,
					});

					// ...what data Stripe uses internally?
					const updated: Product = {
						...data,
						stripeId: updatedProduct.id,
						priceId: updatedProduct.default_price as string,
					};

					return updated;
				}
			},
		],
	},
	fields: [
		{
			name: "user", // get associated with a unique user
			type: "relationship",
			relationTo: "users", // "users" table
			required: true,
			hasMany: false, // 1 product cannot be created by multiple ppl
			admin: {
				condition: () => false,
			},
		},

		{
			name: "name", // product name
			label: "Name",
			type: "text",
			required: true,
		},
		{
			name: "description",
			label: "Product details",
			type: "textarea",
		},
		{
			name: "price",
			label: "Price in CAD",
			min: 0,
			max: 1000,
			type: "number",
			required: true,
		},
		{
			name: "category",
			label: "Category",
			type: "select",
			options: PRODUCT_CATEGORIES.map(({ label, value }) => ({ label, value })),
			required: true,
		},

		{
			name: "product_files",
			label: "Product file(s)",
			type: "relationship",
			required: true,
			relationTo: "product_files",
			hasMany: false, // each product has just 1 product file
		},

		// admin is the one who approves seller's product (is it appropriate to upload?)
		{
			name: "approvedForSale",
			label: "Product Status",
			type: "select",
			defaultValue: "pending",

			// prevent regular users from being able to approve
			access: {
				create: ({ req }) => req.user.role === "admin",
				read: ({ req }) => req.user.role === "admin",
				update: ({ req }) => req.user.role === "admin",
			},

			options: [
				{
					label: "Pending verification",
					value: "pending",
				},
				{
					label: "Approved",
					value: "approved",
				},
				{
					label: "Denied",
					value: "denied",
				},
			],
		},

		// for Stripe checkout
		{
			name: "priceId",
			access: {
				create: () => false,
				read: () => false,
				update: () => false,
			},
			type: "text",
			admin: {
				hidden: true,
			},
		},
		{
			name: "stripeId",
			access: {
				create: () => false,
				read: () => false,
				update: () => false,
			},
			type: "text",
			admin: {
				hidden: true,
			},
		},

		// Product images
		{
			name: "images",
			type: "array",
			label: "Product images",
			minRows: 1,
			maxRows: 4,
			required: true,
			labels: {
				singular: "Image",
				plural: "Images",
			},
			fields: [
				{
					name: "image",
					type: "upload",
					relationTo: "media",
					required: true,
				},
			],
		},
	],
};
