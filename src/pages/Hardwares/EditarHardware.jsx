import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { TextField, Button, Grid, Paper } from "@mui/material";
import Typography from "@mui/material/Typography";
import HeaderContent from "../HeaderContent";
import { useHardwareService } from "../../hooks/useHardwareService";
import Home from "../Home/Home";
import ModalGenerico from "../../components/ModalGenerico";
const EditarHardware = (props) => {
  const { idHardware, setSelectedComponent, onResponse } = props;
  const { handleEditarHardware,hardware,fetchHardware,  cerrarModalOk,  estaActivoModalOk,respuestaModalOk} = useHardwareService(onResponse);  


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    data.idHardware = idHardware;
    console.log("submit");
    console.log(data);
    handleEditarHardware(data);
  };

  const handleOnChangeInput = (event) => {
    // Expresión regular que permite letras (mayúsculas y minúsculas) y espacios en blanco
    const regex = /^[A-Za-z\s]*$/;
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

  useEffect(() => {
    fetchHardware(idHardware);
  }, [fetchHardware, idHardware]);


  if ( hardware==null) {
    return <div>Loading...</div>;
  }

  return (
    <Grid container padding={2} justifyContent={"center"}>

<ModalGenerico
            tipoModal={"correcto"}          
            open={estaActivoModalOk}
            onClose={cerrarModalOk}
            title="Correcto"
            message={respuestaModalOk.msg}
            autoCierre={true}
      />      
      {/* Modal Confirmación */}

      <Grid item xs={7}>
        <HeaderContent titulo="Editar Hardware" />
        <Paper style={{ padding: 20 }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3}>
            <Grid item xs={12}>
                <Typography>Id Hardware</Typography>
                <TextField
                  {...register("idHardwareInterno")}
                  fullWidth
                  placeholder="Id Hardware"
                  variant="outlined"
                  error={errors.idHardwareInterno ? true : false}
                  helperText={errors.idHardwareInterno ? "Este campo es requerido" : ""}
                  onChange={handleOnChangeInput}
                  defaultValue={hardware.idHardwareInterno}
                  name="idHardwareInterno"
                  disabled={true}
                />
              </Grid>              
              <Grid item xs={12}>
                <Typography>Nombre hardware</Typography>
                <TextField
                  {...register("nombre", { required: true })}
                  fullWidth
                  placeholder="Nombre hardware"
                  variant="outlined"
                  error={errors.nombre ? true : false}
                  helperText={errors.nombre ? "Este campo es requerido" : ""}
                  onChange={handleOnChangeInput}
                  defaultValue={hardware.nombre}
                  name="nombre"
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
                      Actualizar
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

    </Grid>
  );
};

export default EditarHardware;