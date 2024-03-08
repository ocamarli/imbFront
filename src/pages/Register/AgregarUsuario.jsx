import { useForm } from "react-hook-form";
import { useState } from "react";
import {
  TextField,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Button,
  FormControl,
  Grid,
  Paper,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import { setRegister } from "../../api/axios";
import HeaderContent from "../HeaderContent";
import RespuestaModal from "../../components/RespuestaModal";
const AgregarUsuario = () => {
  const onSubmit = (data) => {
    console.log("submit");
    console.log(data);
    handleCloseRegister(data);
  };

  const cerrarModal = () => {
    setEstaActivo(false); // Restablecer el estado a false cuando se cierra el modal
  };
  const [estaActivo, setEstaActivo] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [ setResponse] = useState(null);
  const handleCloseRegister = async (data) => {
    let newData;
    console.log(data);
    console.log(autorizaciones);

    newData = { ...data, permisos:autorizaciones };
    console.log(newData);
    console.log(autorizaciones);
    data=newData
    const response = await setRegister(
      data,
      JSON.parse(sessionStorage.getItem("ACCSSTKN")).access_token
    );
    console.log(response);
    console.log(response.status);
    setResponse(response)
    setEstaActivo(true);
    setMensaje(response.msg);
  };
  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setAutorizaciones((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
  };
  const [autorizaciones, setAutorizaciones] = useState({
    superusuario: false,
    electrico: false,
    refrigeracion: false,
    laboratorio: false,
  });
  const {
    register,

    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <Grid container padding={2}>
      <Grid item xs={12}>
        <HeaderContent></HeaderContent>
        <Paper style={{ padding: 20 }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <Typography>Nombre completo</Typography>
                <TextField
                  {...register("nombre", { required: true })}
                  fullWidth
                  placeholder="Nombre completo"
                  variant="outlined"
                  error={errors.nombre ? true : false}
                  helperText={errors.nombre ? "Este campo es requerido" : ""}
                />
              </Grid>
              <Grid item xs={6}>
                <Typography>Correo electrónico</Typography>
                <TextField
                  {...register("correo", { required: true })}
                  fullWidth
                  placeholder="Correo electrónico"
                  variant="outlined"
                  error={errors.correo ? true : false}
                  helperText={errors.correo ? "Este campo es requerido" : ""}
                />
              </Grid>
              <Grid item xs={6}>
                <InputLabel>Contraseña</InputLabel>
                <TextField
                  {...register("pwo", { required: true })}
                  fullWidth
                  placeholder="Contraseña"
                  variant="outlined"
                  error={errors.pwo ? true : false}
                  helperText={errors.pwo ? "Este campo es requerido" : ""}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  Autorizaciones
                </Typography>
                <FormControl component="fieldset">
                  <FormGroup row>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={autorizaciones.superusuario}
                          onChange={handleCheckboxChange}
                          name="superusuario"
                        />
                      }
                      label="Superusuario"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={autorizaciones.refrigeracion}
                          onChange={handleCheckboxChange}
                          name="refrigeracion"
                        />
                      }
                      label="Refrigeración"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={autorizaciones.laboratorio}
                          onChange={handleCheckboxChange}
                          name="laboratorio"
                        />
                      }
                      label="Laboratorio"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={autorizaciones.electrico}
                          onChange={handleCheckboxChange}
                          name="electrico"
                        />
                      }
                      label="Eléctrico"
                    />
                  </FormGroup>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Grid container sx={{ justifyContent: "flex-end" }} spacing={2}>
                  <Grid item xs={12}>
                    <Button
                      variant="contained"
                      type="submit"
                      sx={{ height: "50px" }}
                      fullWidth
                    >
                      Agregar usuario
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Grid>
       {/* Renderiza el componente de Snackbar */}
       <RespuestaModal activo={estaActivo} mensaje={mensaje}  onClose={cerrarModal}/>
    </Grid>
  );
};

export default AgregarUsuario;
