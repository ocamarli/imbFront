import { useForm } from "react-hook-form";
import { useState } from "react";
import { TextField, Button, Grid, Paper,} from "@mui/material";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import HeaderContent from "../HeaderContent";
import RespuestaModal from "../../components/RespuestaModal";
import { crearFirmware} from "../../api/axios";
const AgregarFirmware = () => {

  const onSubmit = (data) => {
    data.idFirmware = parseInt(data.idFirmware);
    console.log("submit");
    console.log(data);
    handleCloseRegister(data);
  };

  const cerrarModal = () => {
    setEstaActivo(false); // Restablecer el estado a false cuando se cierra el modal
  };
  const [estaActivo, setEstaActivo] = useState(false);
  const [respuestaModal, setRespuestaModal] = useState(false);
  const handleCloseRegister = async (data) => {

    console.log(data);

    const response = await crearFirmware(
      data,
      JSON.parse(sessionStorage.getItem("ACCSSTKN")).access_token
    );
    console.log(response);
    console.log(response.status);
    setEstaActivo(true);
    setRespuestaModal(response);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <Grid container padding={2}  justifyContent={"center"}>
      <Grid item xs={7}>
        <HeaderContent titulo="Agregar firmware"></HeaderContent>
        <Paper style={{ padding: 20 }} >
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3}>

              <Grid item xs={12}>
                <Typography>Descripción firmware</Typography>
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
                <InputLabel>Código firmware</InputLabel>
                <TextField
                  {...register("codigo", { required: true })}
                  fullWidth
                  placeholder="Código"
                  variant="outlined"
                  error={errors.codigo ? true : false}
                  helperText={errors.codigo ? "Este campo es requerido" : ""}
                />
              </Grid>

              <Grid item xs={12}>
                <Grid container sx={{ justifyContent: "space-around" }} spacing={2}>
                  <Grid item xs={4}>
                    <Button
                      variant="contained"
                      type="submit"
                      sx={{ height: "50px" }}
                      fullWidth
                    >
                      Agregar código
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Grid>
       {/* Renderiza el componente de Snackbar */}
       <RespuestaModal activo={estaActivo} respuesta={respuestaModal} autoCierre={false} onClose={cerrarModal}/>
    </Grid>
  );
};

export default AgregarFirmware;
