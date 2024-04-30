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

import { trpc } from "@/trpc/client";
import {
	AuthCredentialsValidator,
	TAuthCredentialsValidator,
} from "@/lib/validators/account-credentials-validator";
import { toast } from "sonner";
import { ZodError } from "zod";
import { useRouter, useSearchParams } from "next/navigation";

const Page = () => {
	const searchParams = useSearchParams();
	const router = useRouter();

	// check if user is seller
	const isSeller = searchParams.get("as") === "seller"; // "login?as=seller"
	const origin = searchParams.get("origin");

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<TAuthCredentialsValidator>({
		resolver: zodResolver(AuthCredentialsValidator),
	});

	// api call if registration was successful
	const { mutate: login, isLoading } = trpc.auth.login.useMutation({
		onSuccess: () => {
			toast.success("Logged in successfully");
			router.refresh(); // freshly show logout option

			// navigates back to user's previous activity
			if (origin) {
				router.push(`/${origin}`);
				return;
			}

			// navigates to seller's CMS dashboard
			if (isSeller) {
				router.push("/sell");
				return;
			}

			// navigates to homepage as regular user/buyer
			router.push("/");
		},

		onError: (err) => {
			if (err.data?.code === "UNAUTHORIZED") {
				toast.error("Invalid email or password");
			}
		},
	});

	const onSubmit = ({ email, password }: TAuthCredentialsValidator) => {
		login({ email, password });
	};

	return (
		<div className="container relative flex flex-col pt-20 items-center justify-center lg:px-0">
			<div className="mx-auto flex w-full justify-center flex-col space-y-6 sm:w-[450px]">
				<div className="flex flex-col items-center text-center">
					<Image src={Logo} height={90} alt="Logo of DigitalGiraffe" />
					<h1 className="mb-2 mt-4 text-center text-4xl font-semibold">
						Welcome back
					</h1>
					<p className="text-base text-muted-foreground text-center">
						We miss you {"<3"}
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

								{/* error handling */}
								{errors?.email && (
									<p className="text-sm text-red-500">{errors.email.message}</p>
								)}
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
								{/* error handling */}
								{errors?.password && (
									<p className="text-sm text-red-500">
										{errors.password.message}
									</p>
								)}
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

							<Button className="w-full mt-2">Login</Button>
						</div>
					</form>
					<Link
						className={cn(buttonVariants({ variant: "link" }))}
						href="register"
					>
						Don&apos;t have an account? Register &rarr;
					</Link>

					{/* other option */}
					<div className="relative">
						<div
							aria-hidden="true"
							className="absolute inset-0 flex items-center"
						>
							<span className="w-full border-t" />
						</div>
						<div className="relative flex justify-center text-xs uppercase">
							<span className="bg-background px-2 text-muted-foreground">
								or
							</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
export default Page;
