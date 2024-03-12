import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Grid, TextField, Box, Modal } from "@mui/material";
const ModalClonarPlantilla = (props) => {
  const { activo, plantillaAClonar ,autoCierre, onClose } = props;
  const [abierto, setAbierto] = useState(activo);
  const [texto2, setTexto2] = useState("");

  useEffect(() => {
    setAbierto(activo);
    setTexto2("");
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
          width: 400,

          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
          textAlign: "center",
          display: "flex",
          flexDirection: "column",

        }}
      >
        <Grid container spacing={2} p={2}>
          <Grid item xs={12}>
            {" "}
            <Typography
              id="modal-modal-description"
              variant="body1"
              component="div"
              sx={{ marginBottom: 2 }}
            >
             Colocar nombre a plantilla a generar
            </Typography>
            <Typography
              id="modal-modal-description"
              variant="body1"
              component="div"
              fontWeight={600}
              sx={{ marginBottom: 2 }}
            >
             {"Platilla a clonar ("+plantillaAClonar+")"}
            </Typography>            
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Nombre de la plantilla"
              variant="outlined"
              value={texto2}
              onChange={(e) => setTexto2(e.target.value)}
              sx={{ marginBottom: 2 }}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            {" "}
            <Button
              onClick={handleCerrarModal}
              variant="contained"
              sx={{ width: "100%" }}
            >
              Clonar
            </Button>
          </Grid>
          <Grid item xs={12}>
            {" "}
            <Button
              onClick={handleCerrarModal}
              variant="contained"
              sx={{ width: "100%" }}
              color={"error"}
            >
              Cancelar
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

export default ModalClonarPlantilla;
