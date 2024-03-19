import { useForm } from "react-hook-form";
import React, { useState, useEffect, useCallback } from "react";
import {
  TextField,
  Button,
  FormControl,
  Grid,
  Paper,
  Select,
  MenuItem,
  Typography,
  CircularProgress,
} from "@mui/material";
import { obtenerParametros } from "../../api/axios";
import HeaderContent from "../HeaderContent";
import EditarPlantilla from "./EditarPlantilla";
import { crearPlantilla } from "../../api/axios";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Home from "../Home/Home.jsx"
const AgregarPlantilla = (props) => {
  const { setSelectedComponent, onResponse, auth } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [parametros, setParametros] = useState([]);


  const handleCrearPlantilla = async (data) => {
    const listaParametrosGenerales = [];
    const listaParametrosProgramacion = [];
    // Filtrar parámetros y modificarlos según su tipo
    parametros.filter((param) => {
      if (param.tipoParametro === "General") {
        // Modificar el parámetro y agregarlo a la lista de generales
        listaParametrosGenerales.push({
          id_parametro: param.id_parametro,
          valor: "",
          estado: false,
        });
        return false; // No incluir este parámetro en la lista final
      } else if (param.tipoParametro === "Programacion") {
        // Modificar el parámetro y agregarlo a la lista de programación
        listaParametrosProgramacion.push({
          id_parametro: param.id_parametro,
          valor: "",
          estado: false,
        });
        return false; // No incluir este parámetro en la lista final
      }
      return true; // Mantener los parámetros que no son generales ni de programación
    });

    console.log("P");
    console.log(parametros);
    console.log("PG");
    console.log(listaParametrosGenerales);
    console.log("PP");
    console.log(listaParametrosProgramacion);
    const newData = {
      ...data,
      creadoPor: auth.correo,
      numeroProgramaciones: 1,
      parametrosGenerales: listaParametrosGenerales,
      programaciones: [
        { noProgramacion: "1", parametros: listaParametrosProgramacion },
      ],
    };
    console.log(newData);

    const response = await crearPlantilla(
      newData,
      JSON.parse(sessionStorage.getItem("ACCSSTKN")).access_token
    );
    console.log("response", response);
    if (response.status) {
      console.log("reponse idP");
      console.log(response.idPlantilla);
      setSelectedComponent( <EditarPlantilla idPlantilla={response.idPlantilla} setSelectedComponent={setSelectedComponent} onResponse={onResponse} auth={auth}></EditarPlantilla>)
    } else {
      console.log("Error");
    }
  };
  const onSubmit = (data) => {
    console.log("onsub");
    console.log(data);
    handleCrearPlantilla(data);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const fetchparametros = useCallback(async () => {
    try {
      setIsLoading(true);
      const tkn = JSON.parse(sessionStorage.getItem("ACCSSTKN"))?.access_token;
      if (tkn !== undefined) {
        const json = await obtenerParametros(tkn);
        console.log("fetchParametros");
        console.log(json);
        setParametros(json.parametros || []);
        setIsLoading(false);
      } else {
        setParametros([]);
        onResponse({ status: false, msg: "Unauthorized Access" });
      }
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  }, [setIsLoading, setParametros, onResponse]);


  useEffect(() => {
    fetchparametros();
  }, [fetchparametros]);
  return (
    <Grid container padding={1}>
      {isLoading ? ( // Agrega el loader condicionalmente
        <Grid item xs={12} align="center" mt="25%">
          <CircularProgress size={50} />
        </Grid>
      ) : (
        <Grid>
          <HeaderContent></HeaderContent>
          <Paper style={{ padding: 10 }}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={1}>
                <Grid item xs={6}>
                  <Typography>Nombre de plantilla</Typography>
                  <TextField
                    {...register("nombrePlantilla", { required: true })}
                    size="small"
                    fullWidth
                    placeholder="Nombre plantilla"
                    variant="outlined"
                    error={errors.nombrePlantilla ? true : false}
                    helperText={
                      errors.nombrePlantilla ? "Este campo es requerido" : ""
                    }
                  />
                </Grid>
                <Grid item xs={6}>
                  <Typography>Firmware</Typography>
                  <FormControl variant="outlined" sx={{ width: "100%" }}>
                    <Select
                      {...register("firmware", { required: true })}
                      size="small"
                      error={errors.firmware ? true : false}
                      defaultValue="" // Asegúrate de dejar este defaultValue vacío
                      displayEmpty // Esta propiedad garantiza que el elemento seleccionado muestre el placeholder cuando esté vacío
                      renderValue={(selected) => {
                        if (!selected) {
                          return (
                            <em style={{ color: "rgba(0, 0, 0, 0.54)" }}>
                              Selecciona una firmware
                            </em>
                          );
                        }
                        return selected;
                      }}
                    >
                      <MenuItem disabled value="">
                        <em>Selecciona una firmware</em>
                      </MenuItem>
                      <MenuItem value={"Firmware 1"}>Firmware 1</MenuItem>
                      <MenuItem value={"Firmware 2"}>Firmware 2</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <Typography>Hardware</Typography>
                  <FormControl variant="outlined" sx={{ width: "100%" }}>
                    <Select
                      {...register("hardware", { required: true })}
                      size="small"
                      error={errors.hardware ? true : false}
                      defaultValue="" // Asegúrate de dejar este defaultValue vacío
                      displayEmpty // Esta propiedad garantiza que el elemento seleccionado muestre el placeholder cuando esté vacío
                      renderValue={(selected) => {
                        if (!selected) {
                          return (
                            <em style={{ color: "rgba(0, 0, 0, 0.54)" }}>
                              Selecciona una hardware
                            </em>
                          );
                        }
                        return selected;
                      }}
                    >
                      <MenuItem disabled value="">
                        <em>Selecciona una hardware</em>
                      </MenuItem>
                      <MenuItem value={"Hardware 2"}>Hardware 1</MenuItem>
                      <MenuItem value={"Hardware 2"}>Hardware 2</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <Typography>Última nota</Typography>
                  <TextField
                    {...register("ultima_nota", { required: true })}
                    size="small"
                    fullWidth
                    placeholder="Última nota"
                    variant="outlined"
                    error={errors.ultima_nota ? true : false}
                    helperText={
                      errors.ultima_nota ? "Este campo es requerido" : ""
                    }
                  />
                </Grid>

                <Grid item xs={6}></Grid>

                <Grid item xs={3}>
                  <Grid
                    container
                    sx={{ justifyContent: "flex-end" }}
                    spacing={2}
                  >
                    <Grid item xs={12}>
                      <Button variant="contained" fullWidth type="submit">
                        Guardar cambios y salir
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item xs={3}>
                  <Grid
                    container
                    sx={{ justifyContent: "flex-end" }}
                    spacing={2}
                  >
                    <Grid item xs={12}>
                      <Button variant="contained" fullWidth type="submit">
                        Guardar cambios y congelar
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Grid>
      )}
          <Button sx={{mt:5}}
      variant="contained"
      color="success" 
      onClick={setSelectedComponent(<Home></Home>)}
      startIcon={<ArrowBackIcon />} 
    >
      Salir
    </Button>
    </Grid>
  );
};

export default AgregarPlantilla;
