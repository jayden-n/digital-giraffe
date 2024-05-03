import { User } from "../cms-types";
import { Access, CollectionConfig } from "payload/types";

const isAdminOrHasAccessToImages =
	(): Access =>
	async ({ req }) => {
		const user = req.user as User | undefined;

		if (!user) return false; // check if user is logged in
		if (user.role === "admin") return true;

		// only allow access to one's own images
		return {
			user: {
				equals: req.user.id,
			},
		};
	};

export const Media: CollectionConfig = {
	slug: "media",
	hooks: {
		beforeChange: [
			// data: incoming data to update or create with
			// req: full express request
			async ({ req, data }) => {
				return { ...data, user: req.user.id }; // tie to user who create the product
			},
		],
	},

	access: {
		read: async ({ req }) => {
			// url capture
			const referer = req.headers.referer;

			// users can see all the images when only browsing in the front-end
			if (!req.user || !referer?.includes("sell")) {
				return true;
			}

			return await isAdminOrHasAccessToImages()({ req });
		},

		delete: isAdminOrHasAccessToImages(),
		update: isAdminOrHasAccessToImages(),
	},

	admin: {
		hidden: ({ user }) => user.role !== "admin",
	},

	// ref: https://payloadcms.com/docs/upload/overview#uploads
	upload: {
		staticURL: "/media",
		staticDir: "media",
		imageSizes: [
			{
				name: "thumbnail",
				width: 400,
				height: 300,
				position: "centre",
			},
			{
				name: "card",
				width: 768,
				height: 1024,
				position: "centre",
			},
			{
				name: "tablet",
				width: 1024,
				height: undefined,
				position: "centre",
			},
		],
		mimeTypes: ["image/*"],
	},

	fields: [
		{
			name: "user",
			type: "relationship",
			relationTo: "users",
			required: true,
			hasMany: false,
			admin: {
				condition: () => false,
			},
		},
	],
};
