import { SessionCookieName } from "$lib/helper/constants";
import { getPosts } from "$lib/helper/client/api/posts/getPosts";
import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ fetch, cookies }) => {
  const posts = await getPosts(fetch);
  if (!posts) {
    throw error(500, { message: "Unexpected Error" });
  }
  const sessionCookie = cookies.get(SessionCookieName) ?? "";

  return {
    posts,
    sessionCookie,
  };
};
