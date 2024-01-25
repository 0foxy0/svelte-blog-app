import { getPost } from "$lib/helper/client/api/posts/getPosts";
import { throw404 } from "$lib/helper/client/throw404";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ fetch, params }) => {
  const postId = Number(params.id);
  if (isNaN(postId)) {
    return throw404();
  }

  const post = await getPost(postId, fetch);
  if (!post) {
    return throw404();
  }

  return { post };
};
