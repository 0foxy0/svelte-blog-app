export const My_KeyUp = "My_KeyUp";

export const constructKeyboardEvent = () => {
  return new KeyboardEvent("keyup", {
    key: My_KeyUp,
  });
};
