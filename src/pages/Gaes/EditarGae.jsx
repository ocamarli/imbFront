import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { TextField, Button, Grid, Paper } from "@mui/material";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import HeaderContent from "../HeaderContent";
import RespuestaModal from "../../components/ModalGenerico";
import { crearGae } from "../../api/gaesApi";
import { useGaeService } from "../../hooks/useGaeServices";
import Home from "../Home/Home";
import ModalGenerico from "../../components/ModalGenerico";
const EditarGae = (props) => {
  const { idGae, setSelectedComponent, auth, onResponse } = props;
  const [estaActivo, setEstaActivo] = useState(false);
  const [respuestaModal, setRespuestaModal] = useState(false);
  const { handleEditarGae,gae,gaes, isLoading, fetchGaes,fetchGae, handleDeshabilitarGae, cerrarModalOk, cerrarModalConfirmacion,
    setEstaActivoModalConfirmacion, estaActivoModalOk,respuestaModalOk,estaActivoModalConfirmacion,respuestaModalConfirmacion } = useGaeService(onResponse);  


  const {
    register,
    handleSubmit,
    setValue, // Añadido para establecer los valores del formulario
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    data.idGae = idGae;
    console.log("submit");
    console.log(data);
    handleEditarGae(data);
  };

  const cerrarModal = () => {
    setEstaActivo(false); // Restablecer el estado a false cuando se cierra el modal
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
    fetchGae(idGae);
  }, [fetchGae, idGae]);


  if ( gae==null) {
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
        <HeaderContent titulo="Editar GAE" />
        <Paper style={{ padding: 20 }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography>Nombre GAE</Typography>
                <TextField
                  {...register("nombre", { required: true })}
                  fullWidth
                  placeholder="Nombre Gae"
                  variant="outlined"
                  error={errors.nombre ? true : false}
                  helperText={errors.nombre ? "Este campo es requerido" : ""}
                  onChange={handleOnChangeInput}
                  defaultValue={gae.nombre}
                  name="nombre"
                />
              </Grid>
              <Grid item xs={12}>
                <InputLabel>Código GAE</InputLabel>
                <TextField
                  {...register("codigo", { required: true })}
                  fullWidth
                  placeholder="Código"
                  variant="outlined"
                  error={errors.codigo ? true : false}
                  helperText={errors.codigo ? "Este campo es requerido" : ""}
                  onChange={handleOnChangeInput}
                  defaultValue={gae.codigo}
                  name="codigo"
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
      <RespuestaModal activo={estaActivo} respuesta={respuestaModal} autoCierre={true} onClose={cerrarModal} />
    </Grid>
  );
};

export default EditarGae;