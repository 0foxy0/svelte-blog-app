import type { Post } from "$lib/types/Post";

export const deletePost = async (postId: Post["id"], sessionCookie: string) => {
  const res = await fetch("/api/posts", {
    method: "DELETE",
    body: JSON.stringify({ postId }),
    headers: {
      "Content-Type": "application/json",
      Cookie: sessionCookie,
    },
  });

  return res.status;
};
