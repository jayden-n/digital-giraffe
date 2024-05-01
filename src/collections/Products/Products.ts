import { PRODUCT_CATEGORIES } from "../../config/index";
import { CollectionConfig } from "payload/types";

export const Products: CollectionConfig = {
	slug: "products", // table name
	admin: {
		useAsTitle: "name",
	},
	access: {},
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

		// {
		// 	name: "product_files",
		// 	label: "Product file(s)",
		// 	type: "relationship",
		// 	required: true,
		// 	relationTo: "product_files",
		// 	hasMany: false, // each product has just 1 product file
		// },

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
