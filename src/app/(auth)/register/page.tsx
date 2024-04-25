"use client";

import Image from "next/image";
import Logo from "../../../../public/logo.svg";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	AuthCredentialsValidator,
	TAuthCredentialsValidator,
} from "@/lib/validators/account-credentials-validator";

const Page = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<TAuthCredentialsValidator>({
		resolver: zodResolver(AuthCredentialsValidator),
	});

	const onSubmit = ({ email, password }: TAuthCredentialsValidator) => {
		// TODO: send data to the server
	};

	return (
		<div className="container relative flex flex-col pt-20 items-center justify-center lg:px-0">
			<div className="mx-auto flex w-full justify-center flex-col space-y-6 sm:w-[450px]">
				<div className="flex flex-col items-center text-center">
					<Image src={Logo} height={90} alt="Logo of DigitalGiraffe" />
					<h1 className="mb-2 mt-4 text-center text-4xl font-semibold">
						Create your account
					</h1>
					<p className="text-base text-muted-foreground text-center">
						Try it for free, no CC required
					</p>
				</div>

				<div className="grid gap-6">
					<form onSubmit={handleSubmit(onSubmit)}>
						<div className="grid gap-2">
							{/* Email */}
							<div className="grid gap-1 py-2">
								<Label htmlFor="email">
									Email<span className="text-red-600">*</span>
								</Label>
								<Input
									{...register("email")}
									className={cn({ "focus-visible:ring-red-500": errors.email })}
									placeholder="you@example.com"
								/>
							</div>

							{/* Password */}
							<div className="grid gap-1 py-2">
								<Label htmlFor="password">
									Password<span className="text-red-600">*</span>
								</Label>
								<Input
									{...register("password")}
									type="password"
									className={cn({
										"focus-visible:ring-red-500": errors.password,
									})}
									placeholder="secret123"
								/>
							</div>

							{/* Confirm Password */}
							{/* <div className="grid gap-1 py-2">
								<Label htmlFor="password">
									Confirm Password<span className="text-red-600">*</span>
								</Label>
								<Input
									type="password"
									className={cn({
										"focus-visible:ring-red-500": errors.confirmPassword,
									})}
									placeholder="secret123"
								/>
							</div> */}

							<Button className="w-full mt-2">Register</Button>
						</div>
					</form>
					<Link
						className={cn(buttonVariants({ variant: "link" }))}
						href="sign-in"
					>
						Already have an account? Login &rarr;
					</Link>
				</div>
			</div>
		</div>
	);
};
export default Page;
