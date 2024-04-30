import { ExpressContext } from "@/server";
import { initTRPC } from "@trpc/server";

// initialized tRPC
const t = initTRPC.context<ExpressContext>().create();

export const router = t.router;
export const publicProcedure = t.procedure;
