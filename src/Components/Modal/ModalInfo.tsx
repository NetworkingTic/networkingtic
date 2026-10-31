import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Modal,
  Typography,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { ModalImageProps, ModalProps } from "./ModalModel";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: "70rem",
  bgcolor: "background.paper",
  border: "2px solid #eeebeb",
  borderRadius: 3,
  boxShadow: 24,
  p: 4,
};

export const ModalInfo: React.FC<ModalProps> = ({
  title,
  text,
  onClose,
  open,
}) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {title}
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          {text}
        </Typography>
      </Box>
    </Modal>
  );
};
const style_modal = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "90%", md: "35%" },
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

export const ModalService: React.FC<ModalImageProps> = ({
  title,
  text,
  onClose,
  open,
  imageSrc,
  altImage,
}) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style_modal}>
        <Card sx={{ boxShadow: "none" }}>
          <CardHeader
            title={
              <Typography variant="h6" sx={{ color: "black" }} align="center">
                {title}
              </Typography>
            }
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              alignItems: "center",
            }}
          >
            <CardMedia
              component="img"
              image={imageSrc}
              alt={altImage}
              sx={{ borderRadius: 2, width: { xs: "100%", md: "50%" } }}
            />
            <CardContent sx={{ width: { xs: "100%", md: "50%" } }}>
              <Typography variant="body2" color="text.secondary">
                {text}
              </Typography>
              <Button component={RouterLink} to="/contactanos" onClick={onClose} variant="contained" sx={{
                marginTop: 2,
              }}>Contáctanos</Button>
            </CardContent>
          </Box>
        </Card>
      </Box>
    </Modal>
  );
};
