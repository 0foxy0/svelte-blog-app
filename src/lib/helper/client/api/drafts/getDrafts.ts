import type { FetchMethod } from "$lib/types/FetchMethod";
import type { Draft } from "$lib/types/Draft";
import { API_AUTHORIZATION } from "$env/static/private";

export const getDrafts = async (fetch: FetchMethod) => {
  const res = await fetch("/api/drafts", {
    headers: {
      Authorization: API_AUTHORIZATION,
    },
  });
  if (res.status !== 200) {
    return null;
  }

  const drafts = (await res.json()) as Draft[];
  return drafts;
};

export const getDraft = async (draftId: Draft["id"], fetch: FetchMethod) => {
  const res = await fetch(`/api/drafts?draftId=${draftId}`, {
    headers: {
      Authorization: API_AUTHORIZATION,
    },
  });
  if (res.status !== 200) {
    return null;
  }

  const draft = (await res.json()) as Draft;
  return draft;
};
