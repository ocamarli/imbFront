import { useForm } from "react-hook-form";
import { useState } from "react";
import { TextField, Button, Grid, Paper } from "@mui/material";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import HeaderContent from "../HeaderContent";
import ModalGenerico from "../../components/ModalGenerico";
import { actualizarFirmware } from "../../api/firmwaresApi";
import Home from "../Home/Home"
const EditarFirmware = (props) => {
  const { idFirmware, setSelectedComponent, auth } = props;
  const onSubmit = (data) => {
    data.idFirmware = parseInt(data.idFirmware);
    console.log("submit");
    console.log(data);
    handleCloseRegister(data);
  };
  const handleOnCLickSalir = () => {
    setSelectedComponent(<Home></Home>);
  };
  const cerrarModal = () => {
    setEstaActivo(false); // Restablecer el estado a false cuando se cierra el modal
  };
  const [estaActivo, setEstaActivo] = useState(false);
  const [respuestaModal, setRespuestaModal] = useState(false);
  const handleCloseRegister = async (data) => {
    let newData;
    newData = { idFirmware: idFirmware, ...data };
    data = newData;
    const response = await actualizarFirmware(
      data,
      JSON.parse(sessionStorage.getItem("ACCSSTKN")).access_token
    );
    console.log(response);
    setEstaActivo(true);
    setRespuestaModal(response);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <Grid container padding={2} justifyContent={"center"}>
      <Grid item xs={7}>
        <HeaderContent titulo="Editar firmware"></HeaderContent>
        <Paper style={{ padding: 20 }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography>Nombre firmware</Typography>
                <TextField
                  {...register("nombre", { required: true })}
                  fullWidth
                  placeholder="Nombre"
                  variant="outlined"
                  error={errors.nombre ? true : false}
                  helperText={
                    errors.nombre ? "Este campo es requerido" : ""
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <InputLabel>Descripción firmware</InputLabel>
                <TextField
                  {...register("descripcion", { required: true })}
                  fullWidth
                  placeholder="Descripción"
                  variant="outlined"
                  error={errors.descripcion ? true : false}
                  helperText={errors.descripcion ? "Este campo es requerido" : ""}
                />
              </Grid>

              <Grid item xs={12}>
                <Grid
                  container
                  sx={{ justifyContent: "space-around" }}
                  spacing={2}
                >
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
                      salir
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Grid>
      {/* Renderiza el componente de Snackbar */}
      <ModalGenerico
        activo={estaActivo}
        respuesta={respuestaModal}
        autoCierre={false}
        onClose={cerrarModal}
      />
    </Grid>
  );
};

export default EditarFirmware;
