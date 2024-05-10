"use client";

import { trpc } from "@/trpc/client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface PaymentStatusProps {
	orderEmail: string;
	orderId: string;
	isPaid: boolean;
}

const PaymentStatus = ({ orderEmail, orderId, isPaid }: PaymentStatusProps) => {
	const router = useRouter();

	// 🔄 polling order status back to the database to check _isPaid is true
	const { data } = trpc.payment.pollOrderStatus.useQuery(
		{ orderId },
		{
			enabled: isPaid === false,
			refetchInterval: (data) => (data?.isPaid ? false : 1000), // stop querying when the order is paid, and try again for every 1 sec
		},
	);

	useEffect(() => {
		if (data?.isPaid === true) router.refresh();
	}, [data?.isPaid, router]);

	return (
		<div className="mt-16 grid grid-cols-2 gap-x-4 text-sm text-gray-600">
			<div>
				<p className="font-medium text-gray-900">Shipping To</p>
				<p>{orderEmail}</p>
			</div>

			<div>
				<p className="font-medium text-gray-900">Order Status</p>
				<p>{isPaid ? "Payment successful" : "Pending payment"}</p>
			</div>
		</div>
	);
};
export default PaymentStatus;
