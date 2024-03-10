import React, { useState, useEffect } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import Button from "@mui/material/Button";

const RespuestaModal = (props) => {
  const { activo, respuesta, autoCierre, onClose } = props
  const [abierto, setAbierto] = useState(activo);

  useEffect(() => {
    setAbierto(activo);
    if (activo && autoCierre) {
      const temporizador = setTimeout(() => {
        setAbierto(false);
        if (onClose) {
          onClose();
        }
      }, 1300);
      return () => clearTimeout(temporizador);
    }
  }, [activo, autoCierre, onClose]);

  const handleCerrarModal = () => {
    setAbierto(false);
    if (onClose) {
      onClose();
    }
  };

  return (
    <Modal
      open={abierto}
      onClose={handleCerrarModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 300,
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {respuesta.status ? (
          <CheckCircleOutlineIcon sx={{ color: "green", marginBottom: 2 }} fontSize="large" />
        ) : (
          <ErrorOutlineIcon sx={{ color: "red", marginBottom: 2 }} fontSize="large" />
        )}
        <Typography id="modal-modal-description" variant="body1" component="div" sx={{ marginBottom: 2 }}>
          {respuesta.msg}
        </Typography>
        {!autoCierre && (
          <Button onClick={handleCerrarModal} variant="contained" sx={{ width: "100%" }}>
            Cerrar
          </Button>
        )}
      </Box>
    </Modal>
  );
};

export default RespuestaModal;
