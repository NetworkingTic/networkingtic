import React from 'react';
import Slider from 'react-slick';
import { Container } from '@mui/material';
import { Card } from '../Card/Card';
import { useCarousel } from './useCarousel';
import { CarouselProps } from './CarouselTypes';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './CarouselStyles.css';

export const Carousel: React.FC<CarouselProps> = ({ items }) => {
  const { getSettings } = useCarousel();

  return (
    <section className="carousel-container">
      <Container>
        <Slider {...getSettings()}>
          {items.map((item) => (
            <div key={item.id} className="carousel-item">
              <Card {...item} />
            </div>
          ))}
        </Slider>
      </Container>
    </section>
  );
};