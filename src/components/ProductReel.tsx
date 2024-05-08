"use client";

import { Product } from "@/cms-types";
import { TQueryValidator } from "@/lib/validators/query-validator";
import { trpc } from "@/trpc/client";
import Link from "next/link";
import ProductListing from "./ProductListing";

interface ProductReelProps {
	title: string;
	subtitle?: string;
	href?: string;
	query: TQueryValidator;
}

const FALLBACK_LIMIT = 4; // initially only fetch 4 products

const ProductReel = (props: ProductReelProps) => {
	const { title, subtitle, href, query } = props;

	const { data: queryResults, isLoading } =
		trpc.getInfiniteProducts.useInfiniteQuery(
			{
				limit: query.limit ?? FALLBACK_LIMIT,
				query,
			},
			{
				// trpc docs
				getNextPageParam: (lastPage) => lastPage.nextPage,
			},
		);

	// Extract products from the queryResults, if available
	const products = queryResults?.pages.flatMap((page) => page.items);

	// Initialize a variable map to hold Product objects or null values
	let map: (Product | null)[] = [];

	// Check if products are available and not empty.
	if (products && products.length) {
		map = products;
	} else if (isLoading) {
		// If products are not available and loading is in progress, fill the map with null values up to the limit.
		map = new Array<null>(query.limit ?? FALLBACK_LIMIT).fill(null);
	}

	return (
		<section className="py-12">
			<div className="md:flex md:items-center md:justify-between mb-4">
				<div className="max-w-2xl px-4 lg:max-w-4xl lg:px-0">
					{title ? (
						<h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
							{title}
						</h1>
					) : null}

					{subtitle ? (
						<p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>
					) : null}
				</div>

				{href ? (
					<Link
						href={href}
						className="hidden text-sm md:block font-medium text-green-600 hover:text-green-500"
					>
						Shop the collection <span aria-hidden="true">&rarr;</span>
					</Link>
				) : null}
			</div>

			<div className="relative">
				<div className="mt-6 flex items-center w-full">
					<div className="w-full grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4 md:gap-y-10 lg:gap-x-8">
						{map.map((product, i) => (
							<ProductListing
								key={`product-${i}`}
								product={product}
								index={i}
							/>
						))}
					</div>
				</div>
			</div>
		</section>
	);
};
export default ProductReel;
