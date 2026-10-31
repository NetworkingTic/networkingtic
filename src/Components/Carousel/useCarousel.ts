import { useCallback } from "react";
import { CarouselSettings } from "./CarouselTypes";
import { DEFAULT_SETTINGS } from "./CarouselConstants";

export const useCarousel = () => {
  const getSettings = useCallback((): CarouselSettings => {
    return DEFAULT_SETTINGS;
  }, []);

  return {
    getSettings,
  };
};
