import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { PERKS } from "@/config";
import ProductReel from "@/components/ProductReel";
import { StaggerTestimonials } from "@/components/StaggerTestimonials";

export default function Home() {
	return (
		<>
			<MaxWidthWrapper>
				<div className="py-20 mx-auto text-center flex flex-col items-center max-w-2xl">
					<h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
						Your marketplace for premium{" "}
						<span className="text-green-600">digital assets</span>.
					</h1>
					<p className="mt-6 text-lg max-w-prose text-muted-foreground">
						Welcome to Digital Giraffe. Every asset on our platform is verified
						by our team to ensure our highest quality standards.
					</p>
					<div className="flex sm:flex-row flex-col gap-4 mt-6">
						<Link href="/products" className={buttonVariants()}>
							Browse Trending
						</Link>
						<Button variant="ghost">Our quality promise &rarr;</Button>
					</div>
				</div>
			</MaxWidthWrapper>

			<MaxWidthWrapper>
				<ProductReel
					href="/products"
					title="Brand new"
					query={{ sort: "desc", limit: 4 }}
				/>
			</MaxWidthWrapper>
			<section className="border-t border-gray-200 bg-gray-50">
				<MaxWidthWrapper className="py-20">
					<div className="grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3 lg:gap-y-0">
						{PERKS.map((perk) => (
							<div
								key={perk.id}
								className="text-center md:flex md:items-start md:text-left lg:block lg:text-center"
							>
								<div className="md:flex-shrink-0 flex justify-center">
									<div className="h-16 w-16 flex items-center justify-center rounded-full bg-green-100 text-green-800">
										{<perk.Icon className="w-1.5/3 h-1.5/3" />}
									</div>
								</div>

								<div className="mt-6 md:ml-4 md:mt-0 lg:ml-0 lg:mt-6">
									<h3 className="text-base font-medium text-gray-900">
										{perk.name}
									</h3>
									<p className="mt-3 text-sm text-muted-foreground">
										{perk.description}
									</p>
								</div>
							</div>
						))}
					</div>
				</MaxWidthWrapper>
			</section>
			<StaggerTestimonials />
		</>
	);
}
