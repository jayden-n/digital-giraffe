import { User } from "../cms-types";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { NextRequest } from "next/server";

export const getServerSideUser = async (
	cookies: NextRequest["cookies"] | ReadonlyRequestCookies,
) => {
	const token = cookies.get("payload-token")?.value;

	const meRes = await fetch(
		// CMS automatically created this endpoint
		`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/me`,
		{
			headers: {
				Authorization: `JWT ${token}`,
			},
		},
	);

	const { user } = (await meRes.json()) as { user: User | null };
	return { user };
};
