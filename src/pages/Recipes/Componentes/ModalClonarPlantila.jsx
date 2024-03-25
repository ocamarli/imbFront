import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Grid, TextField, Box, Modal } from "@mui/material";
import { useForm } from "react-hook-form";
import { copiarPlantilla } from "../../../api/axios";
import EditarPlantilla from "../EditarPlantilla";


const ModalClonarPlantilla = (props) => {
  const { activo, plantillaAClonar ,autoCierre, onClose,auth ,setSelectedComponent} = props;

  
  const [abierto, setAbierto] = useState(activo);
  const [texto2, setTexto2] = useState("");

  const { register, handleSubmit, formState: { errors } } = useForm();
  const handleCopiarPlantilla = async (data) => {

    const newData = {
      ...data,
      idPlantilla:plantillaAClonar._id,
      creadoPor: auth.correo,
     };
     console.log("newData");
    console.log(newData);

    const response = await copiarPlantilla(
      newData,
      JSON.parse(sessionStorage.getItem("ACCSSTKN")).access_token
    );
    console.log("response", response);
    if (response.status) {
      console.log("reponse idP");
      console.log(response.idPlantilla);
      setSelectedComponent(
      <EditarPlantilla
      idPlantilla={response.idPlantilla}
      setSelectedComponent={setSelectedComponent}
      auth={auth}
    ></EditarPlantilla>)


    } else {
      console.log("Error");
    }
  };
  const onSubmit = (data) => {
    console.log("onsub");
    console.log(data);
    handleCopiarPlantilla(data);
  };
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
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 8, // Ajusta la cantidad de espacio alrededor del contenido
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
  }}
      >
        <Grid container spacing={0} p={1} justifyContent={"space-between"} justifyItems={"center"}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid item xs={12}>
            
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
             {"Platilla a clonar ("+plantillaAClonar.nombrePlantilla+")"}
            </Typography>            
          </Grid>
          <Grid item xs={12}>
            <TextField
            {...register("nombrePlantilla",{required:true})}
              label="Nombre de la nueva plantilla"
              variant="outlined"
              value={texto2}
              onChange={(e) => setTexto2(e.target.value)}
              sx={{ marginBottom: 2 }}
              fullWidth
              error={errors.nombrePlantilla ? true : false}
              helperText={errors.nombrePlantilla ? "Este campo es requerido" : ""} 
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{ marginBottom: 2 }}
            >
              Clonar
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button
              onClick={handleCerrarModal}
              variant="contained"
              fullWidth

              color={"error"}
            >
              Cancelar
            </Button>
          </Grid>
          </form>
        </Grid>
      </Box>
    </Modal>
  );
};

export default ModalClonarPlantilla;
