import { getPosts } from "$lib/helper/client/api/posts/getPosts";
import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ fetch }) => {
  const posts = await getPosts(fetch);
  if (!posts) {
    throw error(500, { message: "Unexpected Error" });
  }
  return { posts };
};
