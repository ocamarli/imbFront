import { useForm } from "react-hook-form";
import { useState } from "react";
import { TextField, Button, Grid, Paper,} from "@mui/material";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import HeaderContent from "../HeaderContent";
import RespuestaModal from "../../components/RespuestaModal";
import { crearHardware } from "../../api/axios";
const AgregarHardware = () => {
  const onSubmit = (data) => {
    data.idHardware = parseInt(data.idHardware);
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
    const response = await crearHardware(
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
    <Grid container padding={2} >
      <Grid item xs={12}>
        <HeaderContent titulo="Agregar Hardware"></HeaderContent>
        <Paper style={{ padding: 20 }} >
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <Typography>Id hardware</Typography>
                <TextField
                  {...register("idHardware", { required: true })}
                  fullWidth
                  placeholder="ID"
                  variant="outlined"
                  error={errors.idHardware ? true : false}
                  helperText={errors.idHardware ? "Este campo es requerido" : ""}
                />
              </Grid>
              <Grid item xs={6}>
                <Typography>Nombre hardware</Typography>
                <TextField
                  {...register("nombre", { required: true })}
                  fullWidth
                  placeholder="Nombre hardware"
                  variant="outlined"
                  error={errors.nombre ? true : false}
                  helperText={errors.nombre ? "Este campo es requerido" : ""}
                />
              </Grid>
              <Grid item xs={6}>
                <InputLabel>Código hardware</InputLabel>
                <TextField
                  {...register("codigo", { required: true })}
                  fullWidth
                  placeholder="Codigo"
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

       <RespuestaModal activo={estaActivo} respuesta={respuestaModal} autoCierre={false} onClose={cerrarModal}/>
    </Grid>
  );
};

export default AgregarHardware;
