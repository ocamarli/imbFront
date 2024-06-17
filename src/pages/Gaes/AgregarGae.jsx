import { useForm } from "react-hook-form";
import { useState } from "react";
import { TextField, Button, Grid, Paper,} from "@mui/material";
import Typography from "@mui/material/Typography";
import HeaderContent from "../HeaderContent";
import RespuestaModal from "../../components/ModalGenerico";
import { crearGae } from "../../api/gaesApi";
import Home from "../Home/Home";
const AgregarGae = (props) => {
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

    console.log(data);
    const response = await crearGae(
      data,
      JSON.parse(sessionStorage.getItem("ACCSSTKN")).access_token
    );
    console.log(response);
    console.log(response.status);
    setEstaActivo(true);
    setRespuestaModal(response);
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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <Grid container padding={2}  justifyContent={"center"}>
      <Grid item xs={7}>
        <HeaderContent titulo="Agregar GAE"></HeaderContent>
        <Paper style={{ padding: 20 }} >
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography>Id GAE</Typography>
                <TextField
                  {...register("idGaeInterno", { required: true })}
                  fullWidth
                  placeholder="id GAE"
                  variant="outlined"
                  error={errors.idGaeInterno ? true : false}
                  helperText={errors.idGaeInterno ? "Este campo es requerido" : ""}
                  onChange={handleOnChangeInput}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography>Nombre GAE</Typography>
                <TextField
                  {...register("nombre", { required: true })}
                  fullWidth
                  placeholder="Nombre GAE"
                  variant="outlined"
                  error={errors.nombre ? true : false}
                  helperText={errors.nombre ? "Este campo es requerido" : ""}
                  onChange={handleOnChangeInput}
                />
              </Grid>              
              <Grid item xs={12}>
                <Typography>Código GAE</Typography>
                <TextField
                  {...register("codigo", { required: true })}
                  fullWidth
                  placeholder="Código GAE"
                  variant="outlined"
                  error={errors.codigo ? true : false}
                  helperText={errors.codigo ? "Este campo es requerido" : ""}
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
       <RespuestaModal activo={estaActivo} respuesta={respuestaModal} autoCierre={true} onClose={cerrarModal}/>
    </Grid>
  );
};

export default AgregarGae;
