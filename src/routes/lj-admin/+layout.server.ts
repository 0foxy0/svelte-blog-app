import { SessionCookieName } from "$lib/helper/constants";
import { isLoggedIn } from "$lib/helper/client/api/isLoggedIn";
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({ fetch, cookies }) => {
  const sessionCookie = cookies.get(SessionCookieName) ?? "";
  const authorized = await isLoggedIn(sessionCookie, fetch);

  return {
    authorized,
  };
};
