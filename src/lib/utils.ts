import { type ClassValue, clsx } from "clsx";
import { Metadata } from "next";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function formatPrice(
	price: number | string,
	options: {
		currency?: "CAD" | "USD";
		notation?: Intl.NumberFormatOptions["notation"];
	} = {},
) {
	const { currency = "CAD", notation = "compact" } = options;
	const numericPrice = typeof price === "string" ? parseFloat(price) : price; // convert price to to number

	return new Intl.NumberFormat("en-US", {
		style: "currency",
		currency,
		notation,
		maximumFractionDigits: 2,
	}).format(numericPrice);
}
export function constructMetadata({
	title = "Digital Giraffe - Your marketplace for digital assets!",
	description = "Digital Giraffe is an open-source marketplace for high-quality digital goods.",
	image = "../../public/logo.svg",
	icons = "/favicon.ico",
	noIndex = false,
}: {
	title?: string;
	description?: string;
	image?: string;
	icons?: string;
	noIndex?: boolean;
} = {}): Metadata {
	return {
		title,
		description,
		openGraph: {
			title,
			description,
			images: [
				{
					url: image,
				},
			],
		},
		icons,
		metadataBase: new URL("https://localhost:3000"),
		...(noIndex && {
			robots: {
				index: false,
				follow: false,
			},
		}),
	};
}
