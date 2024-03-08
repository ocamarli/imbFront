import React, { useState, useEffect } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const RespuestaModal = ({ activo, mensaje, onClose }) => {
  const [abierto, setAbierto] = useState(activo);

  useEffect(() => {
    setAbierto(activo);

    // Si el modal está activo, configurar un temporizador para cerrarlo después de cierto tiempo
    if (activo) {
      const temporizador = setTimeout(() => {
        setAbierto(false);
        if (onClose) {
          onClose(); // Llamar a la función onClose para notificar que el modal se ha cerrado automáticamente
        }
      }, 1300); // Tiempo en milisegundos antes de que el modal se cierre automáticamente

      // Limpiar el temporizador al desmontar el componente o cuando el modal se cierre manualmente
      return () => clearTimeout(temporizador);
    }
  }, [activo, onClose]);

  return (
    <Modal
      open={abierto}
      onClose={() => {
        setAbierto(false);
        if (onClose) {
          onClose(); // Llamar a la función onClose para notificar que el modal se ha cerrado manualmente
        }
      }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Respuesta
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          {mensaje}
        </Typography>
      </Box>
    </Modal>
  );
};

export default RespuestaModal;
