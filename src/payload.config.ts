import { webpackBundler } from "@payloadcms/bundler-webpack";
import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { slateEditor } from "@payloadcms/richtext-slate";
import path from "path";
import { buildConfig } from "payload/config";
import { Users } from "./collections/Users";
import dotenv from "dotenv";
import { Products } from "./collections/Products/Products";
import { Media } from "./collections/Media";

dotenv.config({
	path: path.resolve(__dirname, "../.env"),
});

export default buildConfig({
	serverURL: process.env.NEXT_PUBLIC_SERVER_URL || "",
	collections: [Users, Products, Media], // database collection tables
	routes: {
		admin: "/sell",
	},

	// admin dashboard
	admin: {
		user: "users",
		bundler: webpackBundler(),
		meta: {
			titleSuffix: "- Digital Giraffe",
			favicon: "/favicon.ico",
			ogImage: "/thumbnail.jpg",
		},
	},
	rateLimit: {
		max: 2000,
	},

	// editor for CMS
	editor: slateEditor({}),

	// database connection
	db: mongooseAdapter({
		url: process.env.MONGODB_URL!,
	}),

	typescript: {
		outputFile: path.resolve(__dirname, "cms-types.ts"),
	},
});
