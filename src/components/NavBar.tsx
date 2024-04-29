import Link from "next/link";
import MaxWidthWrapper from "./MaxWidthWrapper";
import Logo from "../../public/logo.svg";
import Image from "next/image";
import NavItems from "./NavItems";
import { buttonVariants } from "./ui/button";
import Cart from "./Cart";

const NavBar = () => {
	// mocking user
	const user = null;

	return (
		<div className="bg-white sticky top-0 z-50 h-16 inset-x-0">
			<header className="relative bg-white">
				<MaxWidthWrapper>
					<div className="border-b border-gray-200">
						<div className="flex h-16 items-center">
							{/* TODO: Mobile nav */}
							<div className="ml-4 flex lg:ml-0">
								<Link href="/">
									<Image src={Logo} height={45} alt="Logo of DigitalGiraffe" />
								</Link>
							</div>
							<div className="hidden lg:block lg:ml-8 lg:self-stretch">
								<NavItems />
							</div>

							{/* RIGHT ELEMENTS */}
							<div className="ml-auto flex items-center">
								<div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
									{user ? null : (
										<Link
											href="/login"
											className={buttonVariants({ variant: "ghost" })}
										>
											Login
										</Link>
									)}

									{user ? null : (
										<span className="h-6 w-px bg-gray-200" aria-hidden="true" />
									)}

									{user ? (
										<p></p>
									) : (
										<Link
											href="/register"
											className={buttonVariants({ variant: "ghost" })}
										>
											Register
										</Link>
									)}

									{user ? (
										<span className="h-6 w-px bg-gray-200" aria-hidden="true" />
									) : null}

									{user ? null : (
										<div className="flex lg:ml-6">
											<span
												className="h-6 w-px bg-gray-200"
												aria-hidden="true"
											/>
										</div>
									)}

									<div className="ml-4 flow-root lg:ml-6">
										<Cart />
									</div>
								</div>
							</div>
						</div>
					</div>
				</MaxWidthWrapper>
			</header>
		</div>
	);
};
export default NavBar;
