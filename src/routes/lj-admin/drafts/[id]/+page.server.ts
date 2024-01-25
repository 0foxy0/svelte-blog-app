import { getDraft } from "$lib/helper/client/api/drafts/getDrafts";
import type { PageServerLoad } from "./$types";
import { SessionCookieName } from "$lib/helper/constants";
import { throw404 } from "$lib/helper/client/throw404";

export const load: PageServerLoad = async ({ fetch, params, cookies }) => {
  const draftId = Number(params.id);
  if (isNaN(draftId)) {
    return throw404();
  }

  const draft = await getDraft(draftId, fetch);
  const sessionCookie = cookies.get(SessionCookieName) ?? "";

  if (!draft) {
    return throw404();
  }

  return { draft, sessionCookie };
};
