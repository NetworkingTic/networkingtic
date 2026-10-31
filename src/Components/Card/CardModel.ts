export interface CardProps {
  imageSrc: string;
  text: string;
  modalTitle: string;
  modalText: string;
  modalImage?: string;
  altImage?: string;
}

export interface CardPropsWithId extends CardProps {
  id: string;
}
