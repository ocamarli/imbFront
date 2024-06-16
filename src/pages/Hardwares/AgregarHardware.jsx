import { useForm } from "react-hook-form";
import { useState } from "react";
import { TextField, Button, Grid, Paper,} from "@mui/material";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import HeaderContent from "../HeaderContent";
import ModalGenerico from "../../components/ModalGenerico";
import { useHardwareService } from "../../hooks/useHardwareService";
import Home from "../Home/Home";
const AgregarHardware = (props) => {
  const {setSelectedComponent} = props
  const onSubmit = (data) => {
    console.log("submit");
    console.log(data);
    handleCreate(data)
  };
  const cerrarModal = () => {
    setEstaActivo(false); // Restablecer el estado a false cuando se cierra el modal
  };
  const {handleCreate,estaActivo,setEstaActivo,respuestaModal}=useHardwareService()
  const handleOnChangeInput = (event) => {
    // Expresión regular que permite letras (mayúsculas y minúsculas) y espacios en blanco
    const regex = /^[A-Za-z0-9\s_-]*$/;
    const inputValue = event.target.value;
    // Validar si el texto ingresado cumple con la expresión regular
    if (regex.test(inputValue)) {
      // Si cumple, convertir a mayúsculas y establecer en el campo de texto
      event.target.value = inputValue.toUpperCase();
    } else {
      // Si no cumple, eliminar el último caracter ingresado
      event.target.value = inputValue.slice(0, -1);
    }
  };
  const handleOnCLickSalir = () => {
    setSelectedComponent(<Home></Home>);
  };    
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <Grid container padding={2}  justifyContent={"center"}>
      <Grid item xs={7}>
        <HeaderContent titulo="Agregar Hardware"></HeaderContent>
        <Paper style={{ padding: 20 }} >
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography>Nombre hardware</Typography>
                <TextField
                  {...register("nombre", { required: true })}
                  fullWidth
                  placeholder="Nombre hardware"
                  variant="outlined"
                  error={errors.descripcion ? true : false}
                  helperText={errors.descripcion ? "Este campo es requerido" : ""}
                  onChange={handleOnChangeInput}
                />
              </Grid>
              <Grid item xs={12}>
                <InputLabel>Descripción hardware</InputLabel>
                <TextField
                  {...register("descripcion", { required: true })}
                  fullWidth
                  placeholder="Descripción"
                  variant="outlined"
                  error={errors.descripcion ? true : false}
                  helperText={errors.descripcion ? "Este campo es requerido" : ""}
                  onChange={handleOnChangeInput}
                />
              </Grid>

              <Grid item xs={12}>
                <Grid container sx={{ justifyContent: "space-around" }} spacing={2}>
                  <Grid item xs={6}>
                    <Button
                      variant="contained"
                      type="submit"
                      sx={{ height: "50px" }}
                      fullWidth
                    >
                      Agregar
                    </Button>
                  </Grid>
                  <Grid item xs={6}>
                    <Button
                      color="error"
                      variant="contained"
                      sx={{ height: "50px" }}
                      fullWidth
                      onClick={handleOnCLickSalir}
                    >
                      Salir
                    </Button>
                  </Grid>                     
                </Grid>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Grid>

       <ModalGenerico activo={estaActivo} respuesta={respuestaModal} autoCierre={false} onClose={cerrarModal}/>
    </Grid>
  );
};

export default AgregarHardware;
