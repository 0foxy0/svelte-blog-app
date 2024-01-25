import type { Draft } from "$lib/types/Draft";

export const deleteDraft = async (
  draftId: Draft["id"],
  sessionCookie: string
) => {
  const res = await fetch("/api/drafts", {
    method: "DELETE",
    body: JSON.stringify({ draftId }),
    headers: {
      "Content-Type": "application/json",
      Cookie: sessionCookie,
    },
  });

  return res.status;
};
