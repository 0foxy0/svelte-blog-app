import type { FetchMethod } from "$lib/types/FetchMethod";
import type { Post } from "$lib/types/Post";
import { API_AUTHORIZATION } from "$env/static/private";

export const getPosts = async (fetch: FetchMethod) => {
  const res = await fetch("/api/posts", {
    headers: {
      Authorization: API_AUTHORIZATION,
    },
  });
  if (res.status !== 200) {
    return null;
  }

  const posts = (await res.json()) as Post[];
  return posts;
};

export const getPost = async (postId: Post["id"], fetch: FetchMethod) => {
  const res = await fetch(`/api/posts?postId=${postId}`, {
    headers: {
      Authorization: API_AUTHORIZATION,
    },
  });
  if (res.status !== 200) {
    return null;
  }

  const post = (await res.json()) as Post;
  return post;
};
