"use client";

import { User } from "@/cms-types";
import { Button } from "./ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import Link from "next/link";
import { useAuth } from "@/hooks/use-auth";

const UserAccountNav = ({ user }: { user: User }) => {
	const { logOut } = useAuth();
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild className="overflow-visible">
				<Button variant="ghost" size="sm" className="relative">
					My account
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="bg-white w-60" align="end">
				<div className="flex items-center justify-start gap-2 p-2">
					<div className="flex flex-col space-y-0.5 leading-none">
						<p className=" text-sm font-semibold text-black ">{user.email}</p>
					</div>
				</div>

				<DropdownMenuSeparator />

				<DropdownMenuItem asChild>
					<Link className="cursor-pointer" href="/sell">
						Seller Dashboard
					</Link>
				</DropdownMenuItem>

				<DropdownMenuItem onClick={logOut} className="cursor-pointer">
					Log out
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
export default UserAccountNav;
