import { CollectionConfig } from "payload/types";

export const Users: CollectionConfig = {
	slug: "users",
	auth: {
		verify: true,
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
