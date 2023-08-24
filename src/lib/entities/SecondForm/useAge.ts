import { useCallback, useEffect, useRef, useState } from "react";
import { getAgeByName } from "./getAge";
import { Nullable } from "../../shared/types/nullable";

export function useAge(name: string) {
  const abortControllerRef = useRef<AbortController>();
  const [ageByName, setAgeByName] = useState<Record<string, number>>({});
  const [errorMessage, setErrorMessage] = useState<Nullable<string>>(null);

  const getAge = useCallback(
    async (name: string) => {
      if (name.length === 0) return null;

      if (abortControllerRef.current) abortControllerRef.current.abort();
      abortControllerRef.current = new AbortController();
      const { signal } = abortControllerRef.current;

      try {
        if (typeof ageByName[name] === "undefined") {
          const age = await getAgeByName(name, signal);
          setAgeByName({
            ...ageByName,
            [name]: age,
          });

          return age;
        }

        return ageByName[name];
      } catch (e) {
        setErrorMessage((e as Error).message);
      }
    },
    [ageByName]
  );

  useEffect(() => {
    setErrorMessage(null);
  }, [name]);

  return { userAge: ageByName[name], getAge, errorMessage };
}
