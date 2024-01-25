import type { Draft } from "$lib/types/Draft";

export const createDraft = async (
  title: Draft["title"],
  description: Draft["description"],
  body: Draft["body"],
  sessionCookie: string
) => {
  const res = await fetch("/api/drafts", {
    method: "POST",
    body: JSON.stringify({ title, description, body }),
    headers: {
      Cookie: sessionCookie,
    },
  });

  return res.status;
};
