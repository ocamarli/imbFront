import { useForm } from "react-hook-form";
import { useState,useCallback } from "react";
import { TextField, Button, Grid, Paper,} from "@mui/material";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import HeaderContent from "../HeaderContent";
import RespuestaModal from "../../components/RespuestaModal";
import { crearGae } from "../../api/gaesApi";
import { actualizarGae } from "../../api/gaesApi";
import { obtenerGae } from "../../api/gaesApi";
import Home from "../Home/Home"
const EditarGae = (props) => {
    const {idGae,setSelectedComponent,auth} = props
    const [estaActivo, setEstaActivo] = useState(false);
    const [respuestaModal, setRespuestaModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);    
  const onSubmit = (data) => {
    data.id_gae = parseInt(data.id_gae);
    console.log("submit");
    console.log(data);
    handleCloseRegister(data);
  };
  const [gae, setGae] = useState(null);
  const cerrarModal = () => {
    setEstaActivo(false); // Restablecer el estado a false cuando se cierra el modal
  };
  const fetchObtenerGae = useCallback(async () => {
    try {
      setIsLoading(true);
      const tkn = JSON.parse(sessionStorage.getItem("ACCSSTKN"))?.access_token;
      if (tkn !== undefined) {

        const json = await obtenerGae(tkn, idGae);
        console.log(json);
        setGae(json.usuario || null);
        setIsLoading(false);
      } else {
        setGae(null);
      }
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  }, [setIsLoading, setGae, idGae]);

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
        <HeaderContent titulo="Editar GAE"></HeaderContent>
        <Paper style={{ padding: 20 }} >
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
                />
              </Grid>
              <Grid item xs={12}>
                <InputLabel>Descripción GAE</InputLabel>
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
       <RespuestaModal activo={estaActivo} respuesta={respuestaModal} autoCierre={true} onClose={cerrarModal}/>
    </Grid>
  );
};

export default EditarGae;
