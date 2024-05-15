"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { TESTIMONIAL_DATA, TestimonialType } from "@/config";
import Image from "next/image";

const CARD_SIZE_LG = 365;
const CARD_SIZE_SM = 290;

const BORDER_SIZE = 1;
const CORNER_CLIP = 50;
const CORNER_LINE_LEN = Math.sqrt(
	CORNER_CLIP * CORNER_CLIP + CORNER_CLIP * CORNER_CLIP,
);

const ROTATE_DEG = 2.5;

const STAGGER = 15;
const CENTER_STAGGER = -65;

const SECTION_HEIGHT = 600;

export const StaggerTestimonials = () => {
	const [cardSize, setCardSize] = useState(CARD_SIZE_LG);

	const [testimonials, setTestimonials] = useState(TESTIMONIAL_DATA);

	const handleMove = (position: number) => {
		const copy = [...testimonials];

		if (position > 0) {
			for (let i = position; i > 0; i--) {
				const firstEl = copy.shift();

				if (!firstEl) return;

				copy.push({ ...firstEl, tempId: Math.random() });
			}
		} else {
			for (let i = position; i < 0; i++) {
				const lastEl = copy.pop();

				if (!lastEl) return;

				copy.unshift({ ...lastEl, tempId: Math.random() });
			}
		}

		setTestimonials(copy);
	};

	useEffect(() => {
		const { matches } = window.matchMedia("(min-width: 640px)");

		if (matches) {
			setCardSize(CARD_SIZE_LG);
		} else {
			setCardSize(CARD_SIZE_SM);
		}

		const handleSetCardSize = () => {
			const { matches } = window.matchMedia("(min-width: 640px)");

			if (matches) {
				setCardSize(CARD_SIZE_LG);
			} else {
				setCardSize(CARD_SIZE_SM);
			}
		};

		window.addEventListener("resize", handleSetCardSize);

		return () => window.removeEventListener("resize", handleSetCardSize);
	}, []);

	return (
		<MaxWidthWrapper>
			<h1 className="text-2xl mt-8 flex justify-center font-bold text-gray-900 sm:text-3xl">
				Testimonials
			</h1>
			<div
				className="relative w-full overflow-hidden"
				style={{
					height: SECTION_HEIGHT,
				}}
			>
				{testimonials.map((t, idx) => {
					let position = 0;

					if (testimonials.length % 2) {
						position = idx - (testimonials.length + 1) / 2;
					} else {
						position = idx - testimonials.length / 2;
					}

					return (
						<TestimonialCard
							key={t.tempId}
							testimonial={t}
							handleMove={handleMove}
							position={position}
							cardSize={cardSize}
						/>
					);
				})}
				<div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-8">
					<button
						onClick={() => handleMove(-1)}
						className="grid h-14 w-14 place-content-center text-3xl transition-colors hover:bg-gray-900 hover:text-zinc-100"
					>
						<GoArrowLeft />
					</button>
					<button
						onClick={() => handleMove(1)}
						className="grid h-14 w-14 place-content-center text-3xl transition-colors hover:bg-gray-900 hover:text-zinc-100"
					>
						<GoArrowRight />
					</button>
				</div>
			</div>
		</MaxWidthWrapper>
	);
};

interface TestimonialProps {
	position: number;
	testimonial: TestimonialType;
	handleMove: Function;
	cardSize: number;
}

const TestimonialCard = ({
	position,
	testimonial,
	handleMove,
	cardSize,
}: TestimonialProps) => {
	const isActive = position === 0;

	return (
		<motion.div
			initial={false}
			onClick={() => handleMove(position)}
			className={`
      absolute left-1/2 top-1/2 cursor-pointer border-black p-8 text-black transition-colors duration-500 ${
				isActive ? "z-10 bg-green-500" : "z-0 bg-white"
			}
      `}
			style={{
				borderWidth: BORDER_SIZE,
				clipPath: `polygon(${CORNER_CLIP}px 0%, calc(100% - ${CORNER_CLIP}px) 0%, 100% ${CORNER_CLIP}px, 100% 100%, calc(100% - ${CORNER_CLIP}px) 100%, ${CORNER_CLIP}px 100%, 0 100%, 0 0)`,
			}}
			animate={{
				width: cardSize,
				height: cardSize,
				x: `calc(-50% + ${position * (cardSize / 1.5)}px)`,
				y: `calc(-50% + ${
					isActive ? CENTER_STAGGER : position % 2 ? STAGGER : -STAGGER
				}px)`,
				rotate: isActive ? 0 : position % 2 ? ROTATE_DEG : -ROTATE_DEG,
				boxShadow: isActive ? "0px 8px 0px 4px black" : "0px 0px 0px 0px black",
			}}
			transition={{
				type: "spring",
				mass: 3,
				stiffness: 400,
				damping: 50,
			}}
		>
			<span
				className="absolute block origin-top-right rotate-45 bg-black object-cover"
				style={{
					right: -BORDER_SIZE,
					top: CORNER_CLIP - BORDER_SIZE,
					width: CORNER_LINE_LEN,
					height: BORDER_SIZE,
				}}
			/>
			<Image
				src={testimonial.imgSrc}
				alt={`Testimonial image for ${testimonial.by}`}
				className="mb-4 h-14 w-12 bg-neutral-600 object-cover object-top"
				width={0}
				height={0}
				sizes="100vw"
				style={{
					boxShadow: "3px 3px 0px white",
				}}
			/>
			<h3
				className={`text-base sm:text-xl ${
					isActive ? "text-white" : "text-black"
				}`}
			>
				&quot;{testimonial.testimonial}&quot;
			</h3>
			<p
				className={`absolute bottom-8 left-8 right-8 mt-2 text-sm italic ${
					isActive ? "text-green-100" : "text-neutral-700"
				}`}
			>
				- {testimonial.by}
			</p>
		</motion.div>
	);
};
