import React from "react";
import { Typography} from "@mui/material";
import "./ServiceCard.css";
import { ServiceCardProps } from "./ServicesTypes";

export const ServiceCard: React.FC<ServiceCardProps> = ({
  service,
  isEven,
}) => {
  return (
    <div className={`service-card ${isEven ? "even" : "odd"}`}>
      <div className="service-card-image">
        <img src={service.modalImage} alt={service.altImage} loading="lazy" />
      </div>
      <div className="service-card-content">
        <Typography variant="h4" component="h2" gutterBottom>
          {service.modalTitle}
        </Typography>
        <Typography variant="body1">{service.modalText}</Typography>
      </div>
    </div>
  );
};
