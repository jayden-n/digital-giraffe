import { User } from "../cms-types";
import { BeforeChangeHook } from "payload/dist/collections/config/types";
import { CollectionConfig } from "payload/types";

const addUser: BeforeChangeHook = ({ req, data }) => {
	const user = req.user as User | null;
	return { ...data, user: user?.id };
};

export const productFiles: CollectionConfig = {
	slug: "product_files",
	admin: {
		hidden: ({ user }) => user.role !== "admin",
	},

	hooks: {
		beforeChange: [addUser],
	},

	upload: {
		staticURL: "/product_files",
		staticDir: "product_files",
		mimeTypes: ["image/*", "font/*", "application/postscript"],
	},

	fields: [
		{
			name: "user",
			type: "relationship",
			relationTo: "users",
			admin: {
				condition: () => false,
			},
			hasMany: false,
			required: true,
		},
	],
};
