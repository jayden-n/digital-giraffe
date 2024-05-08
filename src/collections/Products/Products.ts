import { BeforeChangeHook } from "payload/dist/collections/config/types";
import { PRODUCT_CATEGORIES } from "../../config/index";
import { CollectionConfig } from "payload/types";
import { Product } from "../../cms-types";
import { stripe } from "../../lib/stripe";

const addUser: BeforeChangeHook<Product> = async ({ req, data }) => {
	const user = req.user;

	return { ...data, user: user.id };
};

export const Products: CollectionConfig = {
	slug: "products", // table name
	admin: {
		useAsTitle: "name",
	},
	access: {},
	hooks: {
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
