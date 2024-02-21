import { useState } from "react";

export const useLocalStorage = <T extends string>(
  key: string,
  initialValue: T,
): [T, (value: T | ((val: T) => T)) => void] => {
  const [state, setState] = useState<T>(() => {
    if (typeof window !== "undefined") {
      try {
        const value = window.localStorage.getItem(key);
        return value ? (JSON.parse(value) as T) : initialValue;
      } catch (error) {
        console.log(error);
      }
    }
    return initialValue;
  });

  const setValue = (value: T | ((val: T) => T)) => {
    if (typeof window !== "undefined") {
      try {
        const valueToStore = value instanceof Function ? value(state) : value;
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
        setState(valueToStore);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return [state, setValue];
};
