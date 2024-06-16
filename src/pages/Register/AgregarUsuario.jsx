import { useForm } from "react-hook-form";
import { useState } from "react";
import { TextField, FormGroup, FormControlLabel, Checkbox, Button, 
  FormControl, Grid, Paper,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import { setRegister } from "../../api/usuariosApi";
import HeaderContent from "../HeaderContent";
import ModalGenerico from "../../components/ModalGenerico";
import Home from "../Home/Home";
const AgregarUsuario = (props) => {
  const { setSelectedComponent } = props;
  const onSubmit = (data) => {
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
    setEstaActivo(true);
    setRespuestaModal(response);
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
    refrigeracion: true,
    laboratorio: false,
  });
  const handleOnChangeCorreo = (e) => {
      e.target.value = e.target.value.trim().toUpperCase();

  };

  const handleOnChangeInput = (e) => {
    // Expresión regular que permite letras (mayúsculas y minúsculas) y espacios en blanco
    const regex = /^[A-Za-z\s]*$/;
    const inputValue = e.target.value;

    // Validar si el texto ingresado cumple con la expresión regular
    if (regex.test(inputValue)) {
      // Si cumple, convertir a mayúsculas y establecer en el campo de texto
      e.target.value = inputValue.toUpperCase();
    } else {
      // Si no cumple, eliminar el último caracter ingresado
      e.target.value = inputValue.slice(0, -1);
    }
  };
  const handleOnCLickSalir = () => {
    setSelectedComponent(<Home></Home>);
  };  
  const inicializarFormulario = () => {
    reset({
      nombre: "John Doe",
      correo: "johndoe@example.com",
      descripcion: "Lorem ipsum dolor sit amet",
    });
  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  return (
    <Grid container padding={2}>
      <Grid item xs={12}>
        <HeaderContent titulo="Agregar usuario"></HeaderContent>
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
                  onChange={handleOnChangeInput}
                />
              </Grid>
              <Grid item xs={6}>
                <Typography>Correo electrónico</Typography>
                <TextField
                  type={"email"}
                  {...register("correo", { required: true })}
                  fullWidth
                  placeholder="Correo electrónico"
                  variant="outlined"
                  error={errors.correo ? true : false}
                  helperText={errors.correo ? "Este campo es requerido" : ""}
                  onChange={handleOnChangeCorreo}

                />
              </Grid>
              <Grid item xs={6}>
                <InputLabel>Contraseña</InputLabel>
                <TextField
                type={"password"}
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
       {/* Renderiza el componente de Snackbar */}
       <ModalGenerico activo={estaActivo} respuesta={respuestaModal} autoCierre={true} onClose={cerrarModal}/>
    </Grid>
  );
};

export default AgregarUsuario;
