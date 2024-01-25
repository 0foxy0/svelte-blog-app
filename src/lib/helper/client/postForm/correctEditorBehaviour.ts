import { My_KeyUp } from "./constructKeyboardEvent";

export const correctEditorBehaviour = (event: KeyboardEvent) => {
  if (event.key === My_KeyUp) {
    event.preventDefault();
    return;
  }
  if (event.key.toLowerCase() === "tab") {
    event.preventDefault();
    const textarea = event.target as HTMLTextAreaElement;
    const selectionStart = textarea.selectionStart;
    const selectionEnd = textarea.selectionEnd;

    const textToAdd = "\t";

    const selectedText = selectionStart !== selectionEnd;
    const markedText = textarea.value.substring(selectionStart, selectionEnd);
    const arr = textarea.value.split("");

    if (selectedText && markedText.includes("\n")) {
      let addedTexts = 0;

      const newMarkedText = markedText
        .split("\n")
        .map((line) => {
          addedTexts++;
          return textToAdd + line;
        })
        .join("\n");

      textarea.value =
        textarea.value.substring(0, selectionStart) +
        newMarkedText +
        textarea.value.substring(selectionEnd, textarea.value.length);

      textarea.selectionStart = selectionStart;
      textarea.selectionEnd = selectionEnd + addedTexts * textToAdd.length;
      return;
    }

    arr.splice(selectionStart, 0, ...textToAdd.split(""));

    textarea.value = arr.join("");
    textarea.selectionStart = selectionStart + textToAdd.length;
    textarea.selectionEnd = selectionStart + textToAdd.length;
  }
};
