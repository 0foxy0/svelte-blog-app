import { API_AUTHORIZATION } from "$env/static/private";
import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import {
  createDraftInDatabase,
  deleteDraftFromDatabase,
  getDraftFromDatabase,
  getDraftsFromDatabase,
  updateDraftFromDatabase,
} from "$lib/helper/database/drafts";
import { SessionCookieName } from "$lib/helper/constants";
import { getSessionFromDatabase } from "$lib/helper/database/sessions";
import type { Draft } from "$lib/types/Draft";

export const GET: RequestHandler = ({ request, url }) => {
  const authToken = request.headers.get("Authorization");
  if (!authToken || authToken !== API_AUTHORIZATION) {
    return new Response(null, { status: 403 });
  }

  const draftIdQueryParam = Number(url.searchParams.get("draftId"));
  if (!isNaN(draftIdQueryParam) && draftIdQueryParam !== 0) {
    const draft = getDraftFromDatabase(draftIdQueryParam);
    return draft ? json(draft) : new Response(null, { status: 500 });
  }

  const drafts = getDraftsFromDatabase();
  return json(drafts);
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
      title?: Draft["title"];
      description?: Draft["description"];
      body?: Draft["body"];
    };
    if (!payload?.title || !payload?.description || !payload?.body) {
      return new Response(null, { status: 510 });
    }
    createDraftInDatabase(payload.title, payload.description, payload.body);
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
    const payload = (await request.json()) as { draftId?: number };
    if (!payload?.draftId) {
      return new Response(null, { status: 510 });
    }
    deleteDraftFromDatabase(payload.draftId);
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

  let updatedDraft: Draft | undefined;

  try {
    const payload = (await request.json()) as {
      draftId?: Draft["id"];
      title?: Draft["title"];
      description?: Draft["description"];
      body?: Draft["body"];
    };
    if (
      !payload?.draftId ||
      !payload?.title ||
      !payload?.description ||
      !payload?.body
    ) {
      return new Response(null, { status: 510 });
    }
    updateDraftFromDatabase(
      payload.draftId,
      payload.title,
      payload.description,
      payload.body
    );

    updatedDraft = getDraftFromDatabase(payload.draftId);
  } catch {
    return new Response(null, { status: 500 });
  }

  return updatedDraft
    ? json(updatedDraft)
    : new Response(null, { status: 500 });
};
