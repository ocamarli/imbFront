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
  FormHelperText,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { setRegister } from "../../api/axios";
import HeaderContent from "../HeaderContent";

const handleCloseRegister = async (data) => {
  const response = await setRegister(
    data,
    JSON.parse(sessionStorage.getItem("ACCSSTKN")).access_token
  );
  console.log(response);
};

const onSubmit = (data) => {
  console.log(data);
  handleCloseRegister(data);
};

const AgregarUsuario = () => {
  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setAutorizaciones((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
  };
  const [autorizaciones, setAutorizaciones] = useState({
    superusuario: false,
    refrigeracion: false,
    laboratorio: false,
    servicios: false,
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
                <Typography>Puesto</Typography>
                <FormControl variant="outlined" sx={{ width: "100%" }}>
                  <Select
                    {...register("puesto", { required: true })}
                    error={errors.puesto ? true : false}
                    defaultValue="" // Asegúrate de dejar este defaultValue vacío
                    displayEmpty // Esta propiedad garantiza que el elemento seleccionado muestre el placeholder cuando esté vacío
                    renderValue={(selected) => {
                      if (!selected) {
                        return (
                          <em style={{ color: "rgba(0, 0, 0, 0.54)" }}>
                            Selecciona un puesto
                          </em>
                        );
                      }
                      return selected;
                    }}
                  >
                    <MenuItem disabled value="">
                      <em>Selecciona un puesto</em>
                    </MenuItem>
                    <MenuItem value={"administrador"}>Administrador</MenuItem>
                    <MenuItem value={"monitor"}>Monitor</MenuItem>
                  </Select>
                  {errors.puesto && (
                    <FormHelperText error>
                      Este campo es requerido
                    </FormHelperText>
                  )}
                </FormControl>
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
                <Typography>Permisos</Typography>
                <FormControl variant="outlined" sx={{ width: "100%" }}>
                  <Select
                    {...register("permisos", { required: true })}
                    error={errors.permisos ? true : false}
                    defaultValue="" // Asegúrate de dejar este defaultValue vacío
                    displayEmpty // Esta propiedad garantiza que el elemento seleccionado muestre el placeholder cuando esté vacío
                    renderValue={(selected) => {
                      if (!selected) {
                        return (
                          <em style={{ color: "rgba(0, 0, 0, 0.54)" }}>
                            Selecciona un permiso
                          </em>
                        );
                      }
                      return selected;
                    }}
                  >
                    <MenuItem disabled value="">
                      <em>Selecciona un permiso</em>
                    </MenuItem>
                    <MenuItem value={"permiso1"}>Administrador</MenuItem>
                    <MenuItem value={"permiso2"}>Monitor</MenuItem>
                  </Select>
                  {errors.permisos && (
                    <FormHelperText error>
                      Este campo es requerido
                    </FormHelperText>
                  )}
                </FormControl>
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
              <Grid item xs={6}>
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
                          checked={autorizaciones.servicios}
                          onChange={handleCheckboxChange}
                          name="servicios"
                        />
                      }
                      label="Servicios"
                    />
                  </FormGroup>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Grid container sx={{ justifyContent: "flex-end" }} spacing={2}>
                  <Grid item xs={6}>
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
    </Grid>
  );
};

export default AgregarUsuario;
