import { useMemo } from "react";
import { cardsData } from "../../mocks/CardMock";

export const useServices = () => {
  const services = useMemo(() => cardsData, []);

  const isEven = (index: number): boolean => {
    return index % 2 === 0;
  };

  return {
    services,
    isEven,
  };
};
