"use client";

import { useCallback, useState } from 'react';

export function useFocusedInput() {
  const [isInputFocused, setIsInputFocused] = useState(false);

  const handleInputFocus = useCallback(() => {
    setIsInputFocused((prev) => !prev);
  }, []);

  return {
    isInputFocused,
    handleInputFocus,
  };
}
