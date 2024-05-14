import { useForm } from "react-hook-form";
import { useState,useCallback,useEffect } from "react";
import {
  TextField, FormGroup, FormControlLabel, Checkbox, Button, FormControl, Grid, Paper,CircularProgress} from "@mui/material";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import { setRegister } from "../../api/usuariosApi";
import HeaderContent from "../HeaderContent";
import RespuestaModal from "../../components/RespuestaModal";
import { obtenerUsuario } from "../../api/usuariosApi";
import { actualizarUsuario } from "../../api/usuariosApi";
import Home from "../Home/Home";

const EditarUsuario = (props) => {
  const {idUsuario,setSelectedComponent,auth} = props
  const onSubmit = (data) => {
    console.log("submit");
    console.log(data);
    handleCloseRegister(data);
  };
console.log("----ID----",idUsuario)
  const [usuario, setUsuario] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const [estaActivo, setEstaActivo] = useState(false);
  const [respuestaModal, setRespuestaModal] = useState(false);
  const [autorizaciones, setAutorizaciones] = useState();
  const fetchObtenerUsuario = useCallback(async () => {
    try {
      setIsLoading(true);
      const tkn = JSON.parse(sessionStorage.getItem("ACCSSTKN"))?.access_token;
      if (tkn !== undefined) {

        const json = await obtenerUsuario(tkn, idUsuario);
        console.log(json);

        setUsuario(json.usuario || null);
        setAutorizaciones(json.usuario.permisos || null);
        setIsLoading(false);
      } else {
        setUsuario(null);
      }
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  }, [setIsLoading, setUsuario, idUsuario,setAutorizaciones]);
  const cerrarModal = () => {
    setEstaActivo(false); // Restablecer el estado a false cuando se cierra el modal
  };
  const handleCloseRegister = async (data) => {
    let newData;
    newData = { idUsuario:idUsuario,...data, permisos:autorizaciones };
    data=newData
    const response = await actualizarUsuario(
      data,
      JSON.parse(sessionStorage.getItem("ACCSSTKN")).access_token
    );
    console.log(response);
    setEstaActivo(true);
    setRespuestaModal(response);
  };
  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    // Si el checkbox actual está siendo deseleccionado y es el único seleccionado, no hacemos nada
    if (!checked && Object.values(autorizaciones).filter(val => val).length === 1) {
      return;
    }
    setAutorizaciones((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
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
  useEffect(() => {
    fetchObtenerUsuario(idUsuario);
  }, [fetchObtenerUsuario]);
  return (
    <Grid container padding={2}>
      {isLoading || usuario == null ? ( // Agrega el loader condicionalmente
        <Grid item xs={12} align="center" mt="25%">
          <CircularProgress size={50} />
        </Grid>
      ) : (
      <Grid item xs={12}>
        <HeaderContent titulo={"Editar usuario ("+usuario.correo+")"}></HeaderContent>
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
                  defaultValue={usuario.nombre ? usuario.nombre : ""}
                  onChange={handleOnChangeInput}           
                />
              </Grid>

              <Grid item xs={6}>
                <InputLabel>Contraseña</InputLabel>
                <TextField
                  {...register("pwo", { required: true })}
                  fullWidth
                  type={"password"}
                  placeholder="Contraseña"
                  variant="outlined"
                  error={errors.pwo ? true : false}
                  helperText={errors.pwo ? "Este campo es requerido" : ""}
                  defaultValue={usuario.pwo ? usuario.pwo : ""}
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
                      Actualizar usuario
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
        <RespuestaModal activo={estaActivo} respuesta={respuestaModal} autoCierre={true} onClose={cerrarModal}/>
      </Grid>


      )}
    </Grid>
  );
};

export default EditarUsuario;
