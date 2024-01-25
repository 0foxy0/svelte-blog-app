export const escapeTags = (event: KeyboardEvent) => {
  const textarea = event.target as HTMLTextAreaElement;
  textarea.value = textarea.value.replaceAll(
    /<(\/?)([^>]*)>/gi,
    "&lt;$1$2&gt;"
  );
};
