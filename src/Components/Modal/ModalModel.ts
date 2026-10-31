export interface ModalProps {
  title: string;
  text: string;
  open:boolean;
  onClose: () => void;
}

export interface ModalImageProps extends ModalProps {
  imageSrc: string;
  altImage: string;
}
