import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useAuth = () => {
	const router = useRouter();

	const logOut = async () => {
		try {
			// CMS automatically created this endpoint
			const res = await fetch(
				`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/logout`,
				{
					method: "POST",
					credentials: "include",
					headers: {
						"Content-Type": "application/json",
					},
				},
			);

			if (!res.ok) throw new Error();

			toast.success("Logged out successfully");

			router.push("/login");
			router.refresh();
		} catch (error) {
			toast.error("Couldn't log out, please try again.");
		}
	};

	return { logOut };
};
