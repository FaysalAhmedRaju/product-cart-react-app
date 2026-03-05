import { useLocation } from "react-router-dom";

export const useFeatureFlag = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  return params.get("ff") === "discount";
};