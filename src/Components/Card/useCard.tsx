import { useState } from "react";


export const useCard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleCardClick = () => {
    openModal();
  };

  return {
    isModalOpen,
    handleCardClick,
    closeModal,
  };
};