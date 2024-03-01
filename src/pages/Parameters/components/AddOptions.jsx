import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import { TextField, Button } from "@mui/material";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import "../ParametersCss.css";
// Estilos personalizados para el modal
const AddOptions = ({ open, handleClose }) => {
  const [inputValue, setInputValue] = useState("");
  const [inputName, setInputName] = useState("");
  const [validateValue, setValidateValue] = useState(false);
  const [validateName, setValidateName] = useState(false);

  const handleInputValue = (e) => {
    setInputValue(e.target.value);
    if (e.target.value === "") {
      setValidateValue(true);
    } else {
      setValidateValue(false);
    }
  };

  const handleInputName = (e) => {
    setInputName(e.target.value);
    if (e.target.value === "") {
      setValidateName(true);
    } else {
      setValidateName(false);
    }
  };

  const handleSave = () => {
    // Realizar acciones al guardar los inputs
    const data = { valor: inputValue, nombre: inputName };
    let isError=false
    if (inputValue === "") {
      setValidateValue(true);
      isError=true;
    }
    if (inputName === "") {
      isError=true;
      setValidateName(true)
    }
    if (isError)
    {
      
    }
    else{
      handleClose(data);
    }
  };

  return (
    <Modal open={open} onClose={handleClose} className={"ao-modal"}>
      <Paper
        elevation={3}
        spacing={2}
        sx={{
          minWidth: "calc(20vw)",
          padding: 2,
          height: "fit-content",
          maxWidth: "calc(20vw)",
        }}
      >
        <Grid container direction="column" spacing={2}>
          <Grid item xs={12}>
            {" "}
            <Typography sx={{ fontSize: 20 }}>Agregar opción</Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              onChange={(e) => handleInputValue(e)}
              label="Valor"
              error={validateValue}
              helperText={validateValue ? "Este campo es requerido" : ""}
              variant="standard"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              onChange={(e) => handleInputName(e)}
              error={validateName}
              helperText={validateName ? "Este campo es requerido" : ""}
              label="Nombre"
              variant="standard"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} spacing={2}>
            <Grid container sx={{ justifyContent: "flex-end" }} spacing={2}>
              <Grid item>
                <Button variant="outlined" color="primary" type="submit" onClick={handleSave}>
                  Agregar
                </Button>
              </Grid>
              <Grid item>
                <Button variant="contained" onClick={handleClose}>
                  cancelar
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Modal>
  );
};

export default AddOptions;
