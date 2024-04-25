// server
import { authRouter } from "./auth-router";
import { publicProcedure, router } from "./trpc";

export const appRouter = router({
	testingApiRoute: publicProcedure.query(() => {
		return "hello world";
	}),
	auth: authRouter,
});

export type AppRouter = typeof appRouter;
