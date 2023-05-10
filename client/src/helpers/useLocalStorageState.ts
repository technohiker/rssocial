import { useState, useEffect } from "react";

/** Hook that lets any set values be stored to localStorage. */
export const useLocalStorageState = (key: string, defaultValue: string) => {
  const [state, setState] = useState(() => {
    let value;
    if (window.localStorage.getItem(key) !== '""') {
      console.log(window.localStorage.getItem(key));
      try {
        value = JSON.parse(
          window.localStorage.getItem(key) || JSON.stringify(defaultValue)
        );
      } catch (e) {
        value = defaultValue;
      }
      console.log({ value })
      return value;
    }
    return defaultValue
  });
  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState];
};