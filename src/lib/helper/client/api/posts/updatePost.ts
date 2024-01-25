import type { Post } from "$lib/types/Post";

export const updatePost = async (
  postId: Post["id"],
  title: Post["title"],
  description: Post["description"],
  body: Post["body"],
  sessionCookie: string
) => {
  const res = await fetch("/api/posts", {
    method: "PUT",
    body: JSON.stringify({
      postId,
      title,
      description,
      body,
    }),
    headers: {
      Cookie: sessionCookie,
    },
  });

  return res.status;
};
