import { z } from "zod";
import { privateProcedure, router } from "./trpc";
import { TRPCError } from "@trpc/server";
import { getPayloadClient } from "../get-payload";
import { stripe } from "../lib/stripe";
import type Stripe from "stripe";

export const paymentRouter = router({
	createSession: privateProcedure
		.input(z.object({ productIds: z.array(z.string()) }))
		.mutation(async ({ ctx, input }) => {
			const { user } = ctx;
			let { productIds } = input;

			if (productIds.length === 0) {
				throw new TRPCError({ code: "BAD_REQUEST" });
			}

			const payload = await getPayloadClient();

			const { docs: products } = await payload.find({
				collection: "products",
				where: {
					id: {
						in: productIds,
					},
				},
			});

			// filter and only get the products with id
			const filteredProducts = products.filter((prod) => Boolean(prod.priceId));

			// creating order in database
			const order = await payload.create({
				collection: "orders",
				data: {
					_isPaid: false,
					products: filteredProducts.map((prod) => prod.id),
					user: user.id,
				},
			});

			const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [];

			filteredProducts.forEach((product) => {
				line_items.push({
					price: product.priceId!,
					quantity: 1, // just need 1-time transaction for digital product
				});
			});

			line_items.push({
				// get from "create product" from Stripe
				price: "price_1PDsz9EYrxeyUEBNcy2YZdqR",
				quantity: 1,
				adjustable_quantity: {
					enabled: false,
				},
			});

			// ===================== STRIPE API INTEGRATION =====================
			try {
				const stripeSession = await stripe.checkout.sessions.create({
					success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/thank-you?orderId=${order.id}`,
					cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/cart`,
					payment_method_types: ["card"],
					mode: "payment",

					// sending to the webhook
					metadata: {
						userId: user.id,
						orderId: order.id,
					},
					line_items,
				});

				return { url: stripeSession.url };
			} catch (error) {
				console.log(error);

				return { url: null };
			}
		}),

	pollOrderStatus: privateProcedure
		.input(z.object({ orderId: z.string() }))
		.query(async ({ input }) => {
			const { orderId } = input;
			const payload = await getPayloadClient();

			const { docs: orders } = await payload.find({
				collection: "orders",
				where: {
					id: {
						equals: orderId,
					},
				},
			});

			if (!orders.length) {
				throw new TRPCError({ code: "NOT_FOUND" });
			}

			const [order] = orders;

			return { isPaid: order._isPaid };
		}),
});
