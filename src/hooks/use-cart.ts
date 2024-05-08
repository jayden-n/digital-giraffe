// add items
// remove items
// clear the cart
// (keep track of cart items)
import { Product } from "@/cms-types";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type CartItem = {
	product: Product;
};

type CartState = {
	items: CartItem[];
	addItem: (product: Product) => void;
	removeItem: (productId: string) => void;
	clearCart: () => void;
};

export const useCart = create<CartState>()(
	persist(
		(set) => ({
			items: [],

			addItem: (product) =>
				set((state) => {
					return { items: [...state.items, { product }] };
				}),

			removeItem: (id) =>
				set((state) => ({
					items: state.items.filter((item) => item.product.id !== id),
				})),

			clearCart: () => set({ items: [] }),
		}),
		{
			name: "cart-storage", // appears in local storage name
			storage: createJSONStorage(() => localStorage), // forced saves to local storage
		},
	),
);
