import type { FetchMethod } from "$lib/types/FetchMethod";

export const isLoggedIn = async (sessionCookie: string, fetch: FetchMethod) => {
  const res = await fetch("/api/session/auth", {
    headers: {
      Cookie: sessionCookie,
    },
  });

  return res.status === 200;
};
