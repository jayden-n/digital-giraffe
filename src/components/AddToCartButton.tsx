"use client";

import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { useCart } from "@/hooks/use-cart";
import { Product } from "@/cms-types";

const AddToCartButton = ({ product }: { product: Product }) => {
	const { addItem } = useCart();

	const [isSuccess, setIsSuccess] = useState<boolean>(false);

	useEffect(() => {
		const timeout = setTimeout(() => {
			setIsSuccess(false);
		}, 1500);

		return () => clearTimeout(timeout);
	}, [isSuccess]);

	return (
		<Button
			onClick={() => {
				addItem(product);
				setIsSuccess(true);
			}}
			size="lg"
			className="w-full"
			disabled={isSuccess}
		>
			{isSuccess ? "Added successfully! 🥳" : "Add to cart"}
		</Button>
	);
};

export default AddToCartButton;
