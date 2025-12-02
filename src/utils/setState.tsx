import type React from "react";

export const setStateToTrue = (
  setState: React.Dispatch<React.SetStateAction<boolean>>
): (() => void) => {
  return () => setState(true);
};

export const setStateToFalse = (
  setState: React.Dispatch<React.SetStateAction<boolean>>
): (() => void) => {
  return () => setState(false);
};
