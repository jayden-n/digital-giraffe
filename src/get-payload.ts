import dotenv from "dotenv";
import path from "path";
import payload from "payload";
import { InitOptions } from "payload/config";

dotenv.config({
	path: path.resolve(__dirname, "../.env"),
});

let cached = (global as any).payload; // initialized to store a cached Payload client.

// Checks if a cached client already exists in the global scope.
if (!cached) {
	cached = (global as any).payload = {
		client: null,
		promise: null,
	};
}

interface Args {
	initOptions?: Partial<InitOptions>;
}

export const getPayloadClient = async ({ initOptions }: Args = {}) => {
	if (!process.env.PAYLOAD_SECRET) {
		throw new Error("PAYLOAD_SECRET is missing");
	}

	if (cached.client) {
		return cached.client;
	}

	if (!cached.promise) {
		cached.promise = payload.init({
			secret: process.env.PAYLOAD_SECRET,
			local: initOptions?.express ? false : true,
			...(initOptions || {}),
		});
	}

	try {
		cached.client = await cached.promise;
	} catch (error: unknown) {
		cached.promise = null;
		throw error;
	}

	return cached.client;
};
