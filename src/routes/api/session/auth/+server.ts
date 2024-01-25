import { SessionCookieName } from "$lib/helper/constants";
import { getSessionFromDatabase } from "$lib/helper/database/sessions";
import type { RequestHandler } from "./$types";

export const GET: RequestHandler = ({ request }) => {
  const sessionCookie = (request.headers.get("Cookie") ?? "").split(
    `${SessionCookieName}=`
  )[1];

  if (!sessionCookie || !getSessionFromDatabase(sessionCookie)) {
    return new Response(null, { status: 403 });
  }

  return new Response();
};
