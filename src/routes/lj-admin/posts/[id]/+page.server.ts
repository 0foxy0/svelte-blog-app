import { getPost } from "$lib/helper/client/api/posts/getPosts";
import type { PageServerLoad } from "./$types";
import { SessionCookieName } from "$lib/helper/constants";
import { throw404 } from "$lib/helper/client/throw404";

export const load: PageServerLoad = async ({ fetch, params, cookies }) => {
  const postId = Number(params.id);
  if (isNaN(postId)) {
    return throw404();
  }

  const post = await getPost(postId, fetch);
  const sessionCookie = cookies.get(SessionCookieName) ?? "";

  if (!post) {
    return throw404();
  }

  return { post, sessionCookie };
};
