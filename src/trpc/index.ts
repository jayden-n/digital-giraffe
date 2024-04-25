// server
import { publicProcedure, router } from "./trpc";

export const appRouter = router({
	testingApiRoute: publicProcedure.query(() => {
		return "hello world";
	}),
});

export type AppRouter = typeof appRouter;
