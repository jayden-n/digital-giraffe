import { CollectionConfig } from "payload/types";

export const Users: CollectionConfig = {
	slug: "users",
	auth: {
		verify: {
			generateEmailHTML: ({ token }) => {
				return `<a href='${process.env.NEXT_PUBLIC_SERVER_URL}/verify-email?token=${token}'>Verify account</a>`;
			},
		},
	},
	access: {
		read: () => true,
		create: () => true,
	},
	fields: [
		{
			name: "role",
			defaultValue: "user", // user should be default
			required: true,
			type: "select",
			options: [
				{
					label: "Admin",
					value: "admin",
				},
				{
					label: "User",
					value: "user",
				},
			],
		},
	],
};
