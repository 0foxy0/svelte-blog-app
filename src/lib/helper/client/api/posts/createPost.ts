import type { Post } from "$lib/types/Post";

export const createPost = async (
  title: Post["title"],
  description: Post["description"],
  body: Post["body"],
  sessionCookie: string
) => {
  const res = await fetch("/api/posts", {
    method: "POST",
    body: JSON.stringify({ title, description, body }),
    headers: {
      Cookie: sessionCookie,
    },
  });

  return res.status;
};
