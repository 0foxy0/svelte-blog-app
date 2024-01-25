import { SessionCookieName } from "$lib/helper/constants";
import {
  deleteSessionFromDatabase,
  getSessionFromDatabase,
} from "$lib/helper/database/sessions";
import type { RequestHandler } from "./$types";

export const GET: RequestHandler = ({ request, cookies }) => {
  const sessionCookie = (request.headers.get("Cookie") ?? "").split(
    `${SessionCookieName}=`
  )[1];

  if (!sessionCookie || !getSessionFromDatabase(sessionCookie)) {
    return new Response(null, { status: 403 });
  }

  deleteSessionFromDatabase(sessionCookie);
  cookies.set(SessionCookieName, "", {
    httpOnly: true,
    path: "/",
    maxAge: 0,
  });

  return new Response();
};
