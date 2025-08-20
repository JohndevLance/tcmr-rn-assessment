import { useState } from 'react';
import { I18nManager } from 'react-native';

export function useToggleLanguage() {
  const [isArabic, setIsArabic] = useState(false);

  const toggleLanguage = () => {
    setIsArabic((prev) => {
      const next = !prev;
      I18nManager.forceRTL(next);
      return next;
    });
  };

  return { isArabic, toggleLanguage };
}
