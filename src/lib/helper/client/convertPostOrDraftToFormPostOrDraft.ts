import type { Draft } from "$lib/types/Draft";
import type { Post } from "$lib/types/Post";

export const convertPostOrDraftToFormPostOrDraft = (
  postOrDraft: Post | Draft
) => {
  return {
    date: (postOrDraft as Post)?.date ?? "",
    title: postOrDraft.title,
    description: postOrDraft.description,
    body: postOrDraft.body,
    latestChangeDate: (postOrDraft as Post)?.latestChangeDate ?? "",
  };
};
