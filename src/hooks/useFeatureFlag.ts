import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const DISCOUNT_STORAGE_KEY = "enableDiscount";

const readStoredFlag = () => localStorage.getItem(DISCOUNT_STORAGE_KEY) === "true";

export const useFeatureFlag = (): boolean => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const queryFlag = params.get("ff");
  const isQueryEnabled = queryFlag === "discount";

  useEffect(() => {
    if (queryFlag !== null) {
      localStorage.setItem(DISCOUNT_STORAGE_KEY, String(isQueryEnabled));
    }
  }, [queryFlag, isQueryEnabled]);

  if (queryFlag !== null) {
    return isQueryEnabled;
  }

  return readStoredFlag();
};
