import type { Draft } from "$lib/types/Draft";

export const updateDraft = async (
  draftId: Draft["id"],
  title: Draft["title"],
  description: Draft["description"],
  body: Draft["body"],
  sessionCookie: string
) => {
  const res = await fetch("/api/drafts", {
    method: "PUT",
    body: JSON.stringify({
      draftId,
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
