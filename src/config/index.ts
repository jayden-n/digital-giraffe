import { ArrowDownToLine, CheckCircle, Leaf } from "lucide-react";

export const PERKS = [
	{
		id: 1,
		name: "Instant Delivery",
		Icon: ArrowDownToLine,
		description:
			"Get your assets delivered to your email in seconds and download them right away.",
	},
	{
		id: 2,
		name: "Guaranteed Quality",
		Icon: CheckCircle,
		description:
			"Every asset on our platform is verified by our team to ensure our highest quality standards. Not happy? We offer a 30-day refund guarantee.",
	},
	{
		id: 3,
		name: "For the Planet",
		Icon: Leaf,
		description:
			"We've pledged 1% of sales to the preservation and restoration of the natural environment.",
	},
];

export const PRODUCT_CATEGORIES = [
	{
		label: "UI Kits",
		value: "ui_kits" as const, // for URL navigation
		featured: [
			{
				name: "Editor picks",
				href: "#",
				imageSrc: "/nav/ui-kits/mixed.jpg",
			},
			{
				name: "New Arrivals",
				href: "#",
				imageSrc: "/nav/ui-kits/blue.jpg",
			},
			{
				name: "Bestsellers",
				href: "#",
				imageSrc: "/nav/ui-kits/purple.jpg",
			},
		],
	},

	{
		label: "Icons",
		value: "icons" as const, // for URL navigation
		featured: [
			{
				name: "Favorite Icon Picks",
				href: "#",
				imageSrc: "/nav/icons/picks.jpg",
			},
			{
				name: "New Arrivals",
				href: "#",
				imageSrc: "/nav/icons/new.jpg",
			},
			{
				name: "Bestselling Icons",
				href: "#",
				imageSrc: "/nav/icons/bestsellers.jpg",
			},
		],
	},
];
