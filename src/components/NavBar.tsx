import Link from "next/link";
import MaxWidthWrapper from "./MaxWidthWrapper";
import Logo from "../../public/logo.svg";
import Image from "next/image";
import NavItems from "./NavItems";
const NavBar = () => {
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
						</div>
					</div>
				</MaxWidthWrapper>
			</header>
		</div>
	);
};
export default NavBar;
