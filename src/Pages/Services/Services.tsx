import React from 'react';
import { Typography } from '@mui/material';
import './Services.css';
import { useServices } from './useServices';
import { ServiceCard } from './ServiceCard';

export const Services: React.FC = () => {
  const { services, isEven } = useServices();

  return (
    <div className="services-container">

        <Typography variant="h3" component="h1" className="services-title" sx={{
            marginBottom:2,
        }}>
          Nuestros Servicios
        </Typography>
        {services.map((service, index) => (
          <ServiceCard
            key={service.id}
            service={service}
            isEven={isEven(index)}
          />
        ))}

    </div>
  );
};