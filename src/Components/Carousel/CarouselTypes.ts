import { CardPropsWithId } from "../Card/CardModel";


export interface CarouselProps {
  items: CardPropsWithId[];
}

export interface CarouselSettings {
  dots: boolean;
  infinite: boolean;
  speed: number;
  slidesToShow: number;
  slidesToScroll: number;
  autoplay: boolean;
  autoplaySpeed: number;
  responsive: Array<{
    breakpoint: number;
    settings: {
      slidesToShow: number;
    };
  }>;
}