import { SessionCookieName } from "$lib/helper/constants";
import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { getDrafts } from "$lib/helper/client/api/drafts/getDrafts";

export const load: PageServerLoad = async ({ fetch, cookies }) => {
  const drafts = await getDrafts(fetch);
  if (!drafts) {
    throw error(500, { message: "Unexpected Error" });
  }
  const sessionCookie = cookies.get(SessionCookieName) ?? "";

  return {
    drafts,
    sessionCookie,
  };
};
