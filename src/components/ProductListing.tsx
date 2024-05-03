"use client";

import { Product } from "@/cms-types";
import { useEffect, useState } from "react";
import ProductPlaceholder from "./ProductPlaceholder";
import Link from "next/link";
import { cn, formatPrice } from "@/lib/utils";
import { PRODUCT_CATEGORIES } from "@/config";
import ImageSlider from "./ImageSlider";

interface ProductListingProps {
	product: Product | null;
	index: number;
}

const ProductListing = ({ product, index }: ProductListingProps) => {
	// getting image urls
	const validImageUrls = product?.images
		.map(({ image }) => (typeof image === "string" ? image : image.url))
		.filter(Boolean) as string[]; // get rid of null or undefined

	const [isVisible, setIsVisible] = useState<boolean>(false);

	// product stagger delay
	useEffect(() => {
		const timer = setTimeout(() => {
			setIsVisible(true);
		}, index * 75);

		return () => clearTimeout(timer); // clean up to avoid memory leak
	}, [index]);

	// loading state...
	if (!product || !isVisible) {
		return <ProductPlaceholder />;
	}

	const label = PRODUCT_CATEGORIES.find(
		// checking if the "value" property of each object in PRODUCT_CATEGORIES is equal to the "category" property of the product object
		({ value }) => value === product.category,
	)?.label; // took out the "label"

	if (product && isVisible) {
		return (
			<Link
				className={cn("invisible h-full w-full cursor-pointer group/main", {
					"visible animate-in fade-in-5": isVisible,
				})}
				href={`/product/${product.id}`}
			>
				<div className="flex flex-col w-full">
					<ImageSlider urls={validImageUrls} />

					<h3 className="mt-4 font-medium text-sm text-gray-700">
						{product.name}
					</h3>

					<p className="mt-1 text-sm text-gray-500">{label}</p>

					<p className="mt-1 font-medium text-sm text-gray-900">
						{formatPrice(product.price)}
					</p>
				</div>
			</Link>
		);
	}
};
export default ProductListing;
