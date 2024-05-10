import React from "react";
import UserAccountNav from "./UserAccountNav";
import Link from "next/link";

import { ClassNameValue } from "tailwind-merge";

import { User } from "@/cms-types";
import { buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";

type UserNavProps = {
	user: User | null;
	className?: ClassNameValue;
};

const UserNav = ({ user, className }: UserNavProps) => {
	return (
		// @ts-ignore
		<div className={cn(className)}>
			{user ? null : (
				<Link href="/login" className={buttonVariants({ variant: "ghost" })}>
					Login
				</Link>
			)}
			{user ? null : <span className="h-6 w-px " aria-hidden="true" />}

			{user ? (
				<UserAccountNav user={user} />
			) : (
				<Link href="/register" className={buttonVariants({ variant: "ghost" })}>
					Register
				</Link>
			)}

			{user ? <span className="h-6 w-px " aria-hidden="true" /> : null}

			{user ? null : (
				<div className="flex lg:ml-6">
					<span className="h-6 w-px " aria-hidden="true" />
				</div>
			)}
		</div>
	);
};

export default UserNav;
