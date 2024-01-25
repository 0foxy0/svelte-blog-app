export type FetchMethod = (
  input: RequestInfo | URL,
  init?: RequestInit | undefined
) => Promise<Response>;
