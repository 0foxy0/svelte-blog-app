import { error } from "@sveltejs/kit";

export const throw404 = () => {
  throw error(404, { message: "Not found" });
};
