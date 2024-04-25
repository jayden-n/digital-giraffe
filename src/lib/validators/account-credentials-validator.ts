// input schema validations with Zod <3
import { z } from "zod";

export const AuthCredentialsValidator = z.object({
	email: z.string().email(),
	password: z
		.string()
		.min(8, { message: "Password must be at least 8 characters long." })
		.max(20, { message: "Password must be less than 20 characters long." }),

	// confirmPassword: z.string(),
});
// confirming passwords
// .refine((data) => data.password !== data.confirmPassword, {
// 	message: "Passwords do not match",
// 	path: ["confirmPassword"],
// });

export type TAuthCredentialsValidator = z.infer<
	typeof AuthCredentialsValidator
>;
