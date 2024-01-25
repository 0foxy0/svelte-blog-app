import { SessionCookieName } from "$lib/helper/constants";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = ({ cookies }) => {
  const sessionCookie = cookies.get(SessionCookieName) ?? "";

  return { sessionCookie };
};
