import type { EventHandler } from "svelte/elements";

export interface PostFormButtons {
  primary?: PostFormSubmitButton;
  secondary?: PostFormButton;
}

interface ButtonLabel {
  label: string;
}

interface PostFormButton extends ButtonLabel {
  onClick: (form: HTMLFormElement) => void | Promise<void>;
}

interface PostFormSubmitButton extends ButtonLabel {
  onClick: EventHandler<SubmitEvent, HTMLFormElement>;
}
