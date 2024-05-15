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
			"We've pledged 70% of sales to the preservation and restoration of the natural environment.",
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

export type TestimonialType = {
	tempId: number;
	testimonial: string;
	by: string;
	imgSrc: string;
};

export const TESTIMONIAL_DATA: TestimonialType[] = [
	{
		tempId: 0,
		testimonial:
			"Digital Giraffe transformed my business with its seamless buying and selling process. Highly recommend!",
		by: "Alex, CEO at Creative Solutions",
		imgSrc: "/headshots/1.jpeg",
	},
	{
		tempId: 1,
		testimonial:
			"Perfect for freelance designers! Great quality UI kits and icons. So easy to use!",
		by: "Dan, CEO at DesignHub",
		imgSrc: "/headshots/2.jpeg",
	},
	{
		tempId: 2,
		testimonial:
			"Love it! Excellent product quality and responsive support. My go-to marketplace.",
		by: "Stephanie, CEO at Pixel Perfect",
		imgSrc: "/headshots/3.jpeg",
	},
	{
		tempId: 3,
		testimonial:
			"Fantastic selection and user-friendly interface. Top-notch downloads every time.",
		by: "Marie, CEO at Innovative Creations",
		imgSrc: "/headshots/4.jpeg",
	},
	{
		tempId: 4,
		testimonial: "If I could give 11 stars, I'd give 12.",
		by: "Andre, CEO at Tech Ventures",
		imgSrc: "/headshots/5.jpeg",
	},
	{
		tempId: 5,
		testimonial:
			"Game-changer for selling my digital products. User-friendly and increased my sales!",
		by: "Jeremy, CEO at Freelance Wonders",
		imgSrc: "/headshots/6.jpeg",
	},
	{
		tempId: 6,
		testimonial:
			"As a freelance designer, Digital Giraffe is my go-to marketplace. The UI kits and icon sets are top-notch, and the purchase process is quick and easy. Highly recommended!",
		by: "Pam, CEO at Skyline Graphics",
		imgSrc: "/headshots/7.jpeg",
	},
	{
		tempId: 7,
		testimonial:
			"Smooth experience for buyers and sellers. Efficient process and great support.",
		by: "Daniel, CEO at Digital Dynamo",
		imgSrc: "/headshots/8.jpeg",
	},
	{
		tempId: 8,
		testimonial:
			"High-quality assets and easy checkout. Very happy with my purchases!",
		by: "Fernando, CEO at Creative Minds",
		imgSrc: "/headshots/9.jpeg",
	},
	{
		tempId: 9,
		testimonial:
			"Fantastic resource for digital creators. Amazing products and fast downloads.",
		by: "Andy, CEO at Digital Design Co.",
		imgSrc: "/headshots/10.jpeg",
	},
	{
		tempId: 10,
		testimonial:
			"Great marketplace with a wide variety of digital products. Very user-friendly!",
		by: "Pete, CEO at Design Genius",
		imgSrc: "/headshots/11.jpeg",
	},
	{
		tempId: 11,
		testimonial:
			"Digital Giraffe has a fantastic selection of digital products. I've purchased several UI kits and icons for my projects, and they have all been of exceptional quality. The site is also very user-friendly.",
		by: "Marina, CEO at BlueWave Studios",
		imgSrc: "/headshots/12.jpeg",
	},
];
