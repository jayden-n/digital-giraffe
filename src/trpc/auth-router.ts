import { publicProcedure, router } from "./trpc";
import { getPayloadClient } from "../get-payload";
import { AuthCredentialsValidator } from "../lib/validators/account-credentials-validator";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

export const authRouter = router({
	// SIGN-UP user in CMS
	createPayloadUser: publicProcedure
		.input(AuthCredentialsValidator)
		.mutation(async ({ input }) => {
			// get access to email & password
			const { email, password } = input;
			const payload = await getPayloadClient();

			// looking up...
			const { docs: users } = await payload.find({
				collection: "users",
				where: {
					// give back user matched with incoming input email
					email: {
						equals: email,
					},
				},
			});

			// check if user already exists
			if (users.length !== 0) throw new TRPCError({ code: "CONFLICT" });

			// create new user
			await payload.create({
				collection: "users", // "database table"
				data: {
					email,
					password,
					role: "user",
				},
			});

			return { success: true, sentToEmail: email }; // send email verification if success
		}),

	// VERIFY email (token)
	verifyEmail: publicProcedure
		.input(z.object({ token: z.string() }))
		.query(async ({ input }) => {
			const { token } = input;

			const payload = await getPayloadClient();

			const isVerified = await payload.verifyEmail({
				collection: "users",
				token,
			});

			if (!isVerified) throw new TRPCError({ code: "UNAUTHORIZED" });

			return { success: true };
		}),
});
