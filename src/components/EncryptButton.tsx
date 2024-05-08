import { useRef, useState } from "react";
import { FiLock } from "react-icons/fi";
import { motion } from "framer-motion";
import { CartItem } from "@/hooks/use-cart";
import { Loader2 } from "lucide-react";

interface CheckoutButtonProps {
	productIds: string[];
	isLoading: boolean;
	createCheckoutSession: any;
	items: CartItem[];
}

const TARGET_TEXT = "Checkout";
const CYCLES_PER_LETTER = 4;
const SHUFFLE_TIME = 50;

const CHARS = "!@#$%^&*():{};|,.<>/?";

const CheckoutButton = ({
	productIds,
	isLoading,
	createCheckoutSession,
	items,
}: CheckoutButtonProps) => {
	const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

	const [text, setText] = useState(TARGET_TEXT);

	const scramble = () => {
		let pos = 0;

		intervalRef.current = setInterval(() => {
			const scrambled = TARGET_TEXT.split("")
				.map((char, index) => {
					if (pos / CYCLES_PER_LETTER > index) {
						return char;
					}

					const randomCharIndex = Math.floor(Math.random() * CHARS.length);
					const randomChar = CHARS[randomCharIndex];

					return randomChar;
				})
				.join("");

			setText(scrambled);
			pos++;

			if (pos >= TARGET_TEXT.length * CYCLES_PER_LETTER) {
				stopScramble();
			}
		}, SHUFFLE_TIME);
	};

	const stopScramble = () => {
		clearInterval(intervalRef.current || undefined);

		setText(TARGET_TEXT);
	};

	return (
		<motion.button
			whileHover={{
				scale: 1.025,
			}}
			whileTap={{
				scale: 0.975,
			}}
			onMouseEnter={scramble}
			onMouseLeave={stopScramble}
			className="group relative overflow-hidden  w-full bg-green-600 h-11 bg-primary  hover:bg-primary/85 rounded-md px-8 font-mono flex justify-center items-center font-medium uppercase text-primary-foreground transition-colors disabled:cursor-not-allowed disabled:opacity-65"
			onClick={() => createCheckoutSession({ productIds })}
			disabled={isLoading || items.length === 0}
		>
			<div className="relative z-10 flex items-center gap-3">
				{isLoading ? (
					<Loader2 className="w-4 h-4 animate-spin mr-1.5" />
				) : (
					<FiLock />
				)}
				<span>{text}</span>
			</div>
			<motion.span
				initial={{
					y: "100%",
				}}
				animate={{
					y: "-100%",
				}}
				transition={{
					repeat: Infinity,
					repeatType: "mirror",
					duration: 1,
					ease: "linear",
				}}
				className="duration-300 absolute inset-0 z-0 scale-125 bg-gradient-to-t from-green-200/0 from-40% via-green-200/100 to-green-200/0 to-60% opacity-0 transition-opacity group-hover:opacity-100"
			/>
		</motion.button>
	);
};

export default CheckoutButton;
