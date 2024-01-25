import type { Draft } from "./Draft";
import type { Post } from "./Post";

export interface FormPostOrDraft {
  date: Post["date"];
  title: Post["title"] | Draft["title"];
  description: Post["description"] | Draft["description"];
  body: Post["body"] | Draft["body"];
  latestChangeDate: Post["latestChangeDate"];
}
