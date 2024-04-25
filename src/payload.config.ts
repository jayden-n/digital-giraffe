import { webpackBundler } from "@payloadcms/bundler-webpack";
import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { slateEditor } from "@payloadcms/richtext-slate";
import path from "path";
import { buildConfig } from "payload/config";

export default buildConfig({
	serverURL: process.env.NEXT_PUBLIC_SERVER_URL || "",
	collections: [], // products, users, etc
	routes: {
		admin: "/sell",
	},

	// admin dashboard
	admin: {
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

	// database
	db: mongooseAdapter({
		url: process.env.MONGODB_URL!,
	}),

	typescript: {
		outputFile: path.resolve(__dirname, "payload-types.ts"),
	},
});
