import { ADMIN_PASSWORD, ADMIN_USERNAME } from "$env/static/private";
import { v4 as uuid } from "uuid";
import type { Actions, PageServerLoad } from "./$types";
import { SessionCookieMaxAge, SessionCookieName } from "$lib/helper/constants";
import { createSessionInDatabase } from "$lib/helper/database/sessions";
import { isLoggedIn } from "$lib/helper/client/api/isLoggedIn";

export const load: PageServerLoad = async ({ fetch, cookies }) => {
  const sessionCookie = cookies.get(SessionCookieName) ?? "";
  const authorized = isLoggedIn(sessionCookie, fetch);

  return {
    authorized,
  };
};

export const actions: Actions = {
  default: async ({ cookies, request }) => {
    const formData = await request.formData();
    const [username, password] = [
      formData.get("username"),
      formData.get("password"),
    ];

    if (!username || !password) {
      return { success: false, error: "No username or password specified" };
    }
    if (username !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
      return { success: false, error: "Wrong username or password" };
    }

    const sessionId = uuid();
    cookies.set(SessionCookieName, sessionId, {
      path: "/",
      maxAge: SessionCookieMaxAge,
    });
    createSessionInDatabase(sessionId);

    return { success: true, error: null };
  },
};
