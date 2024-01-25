import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { API_AUTHORIZATION } from "$env/static/private";
import {
  createPostInDatabase,
  deletePostFromDatabase,
  getPostFromDatabase,
  getPostsFromDatabase,
  updatePostFromDatabase,
} from "$lib/helper/database/posts";
import { getSessionFromDatabase } from "$lib/helper/database/sessions";
import { SessionCookieName } from "$lib/helper/constants";
import type { Post } from "$lib/types/Post";

export const GET: RequestHandler = ({ request, url }) => {
  const authToken = request.headers.get("Authorization");
  if (!authToken || authToken !== API_AUTHORIZATION) {
    return new Response(null, { status: 403 });
  }

  const postIdQueryParam = Number(url.searchParams.get("postId"));
  if (!isNaN(postIdQueryParam) && postIdQueryParam !== 0) {
    const post = getPostFromDatabase(postIdQueryParam);
    return post ? json(post) : new Response(null, { status: 500 });
  }

  const posts = getPostsFromDatabase();
  return json(posts);
};

export const POST: RequestHandler = async ({ request }) => {
  const authToken = request.headers.get("Authorization");
  const sessionCookie = (request.headers.get("Cookie") ?? "").split(
    `${SessionCookieName}=`
  )[1];

  if (
    (!authToken || authToken !== API_AUTHORIZATION) &&
    (!sessionCookie || !getSessionFromDatabase(sessionCookie))
  ) {
    return new Response(null, { status: 403 });
  }

  try {
    const payload = (await request.json()) as {
      title?: Post["title"];
      description?: Post["description"];
      body?: Post["body"];
    };
    if (!payload?.title || !payload?.description || !payload?.body) {
      return new Response(null, { status: 510 });
    }
    createPostInDatabase(payload.title, payload.description, payload.body);
  } catch {
    return new Response(null, { status: 500 });
  }

  return new Response();
};

export const DELETE: RequestHandler = async ({ request }) => {
  const authToken = request.headers.get("Authorization");
  const sessionCookie = (request.headers.get("Cookie") ?? "").split(
    `${SessionCookieName}=`
  )[1];

  if (
    (!authToken || authToken !== API_AUTHORIZATION) &&
    (!sessionCookie || !getSessionFromDatabase(sessionCookie))
  ) {
    return new Response(null, { status: 403 });
  }

  try {
    const payload = (await request.json()) as { postId?: Post["id"] };
    if (!payload?.postId) {
      return new Response(null, { status: 510 });
    }
    deletePostFromDatabase(payload.postId);
  } catch {
    return new Response(null, { status: 500 });
  }

  return new Response();
};

export const PUT: RequestHandler = async ({ request }) => {
  const authToken = request.headers.get("Authorization");
  const sessionCookie = (request.headers.get("Cookie") ?? "").split(
    `${SessionCookieName}=`
  )[1];

  if (
    (!authToken || authToken !== API_AUTHORIZATION) &&
    (!sessionCookie || !getSessionFromDatabase(sessionCookie))
  ) {
    return new Response(null, { status: 403 });
  }

  let updatedPost: Post | undefined;

  try {
    const payload = (await request.json()) as {
      postId?: Post["id"];
      title?: Post["title"];
      description?: Post["description"];
      body?: Post["body"];
    };
    if (
      !payload?.postId ||
      !payload?.title ||
      !payload?.description ||
      !payload?.body
    ) {
      return new Response(null, { status: 510 });
    }
    updatePostFromDatabase(
      payload.postId,
      payload.title,
      payload.description,
      payload.body
    );

    updatedPost = getPostFromDatabase(payload.postId);
  } catch {
    return new Response(null, { status: 500 });
  }

  return updatedPost ? json(updatedPost) : new Response(null, { status: 500 });
};
