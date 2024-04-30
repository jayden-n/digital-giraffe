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
import { useRouter } from "next/navigation";

const Page = () => {
	const router = useRouter();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<TAuthCredentialsValidator>({
		resolver: zodResolver(AuthCredentialsValidator),
	});

	// api call if registration was successful
	const { mutate, isLoading } = trpc.auth.createPayloadUser.useMutation({
		onError: (err) => {
			if (err.data?.code === "CONFLICT") {
				toast.error("This email is already in use. Login instead?");
				return;
			}
			if (err instanceof ZodError) {
				toast.error(err.issues[0].message);
				return;
			}

			toast.error("Something went wrong. Please try again.");
		},

		onSuccess: ({ sentToEmail }) => {
			toast.success(`Verification email sent to ${sentToEmail}.`);
			router.push("/verify-email?to=" + sentToEmail);
		},
	});

	const onSubmit = ({ email, password }: TAuthCredentialsValidator) => {
		mutate({ email, password });
	};

	return (
		<div className="container relative flex flex-col pt-20 items-center justify-center lg:px-0">
			<div className="mx-auto flex w-full justify-center flex-col space-y-6 sm:w-[450px]">
				<div className="flex flex-col items-center text-center">
					<Image src={Logo} height={90} alt="Logo of DigitalGiraffe" />
					<h1 className=" mt-6 text-center text-2xl font-bold">
						Create your account
					</h1>
					<Link
						className={cn(buttonVariants({ variant: "link" }))}
						href="login"
					>
						Already have an account? Login &rarr;
					</Link>
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

							<Button className="w-full mt-2">Register</Button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};
export default Page;
