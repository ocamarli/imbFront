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
} from "@mui/material";
import { obtenerParametros } from "../../api/parametrosApi.jsx";
import HeaderContent from "../HeaderContent";
import EditarPlantilla from "./EditarPlantilla";
import { crearPlantilla } from "../../api/plantillasApi.jsx";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Home from "../Home/Home.jsx";
import { obtenerFirmwares } from "../../api/firmwaresApi.jsx";
import { obtenerHardwares } from "../../api/hardwaresApi.jsx";
const AgregarPlantilla = (props) => {
  const { setSelectedComponent, onResponse, auth } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [parametros, setParametros] = useState([]);
  const [firmwares, setFirmwares] = useState([]);
  const [hardwares, setHardwares] = useState([]);

  const handleCrearPlantilla = async (data) => {
    const listaParametrosGenerales = [];
    const listaParametrosProgramacion = [];
    // Filtrar parámetros y modificarlos según su tipo
    parametros.filter((param) => {
      if (param.tipoParametro === "General") {
        // Modificar el parámetro y agregarlo a la lista de generales
        listaParametrosGenerales.push({
          idParametro: param.idParametro,
          valor: "",
          estado: false,
        });
        return false; // No incluir este parámetro en la lista final
      } else if (param.tipoParametro === "Programacion") {
        // Modificar el parámetro y agregarlo a la lista de programación
        listaParametrosProgramacion.push({
          idParametro: param.idParametro,
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
        { noProgramacion: "2", parametros: listaParametrosProgramacion },
        { noProgramacion: "3", parametros: listaParametrosProgramacion },
        { noProgramacion: "4", parametros: listaParametrosProgramacion },
        { noProgramacion: "5", parametros: listaParametrosProgramacion },
        { noProgramacion: "6", parametros: listaParametrosProgramacion },
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
      setSelectedComponent(
        <EditarPlantilla
          idPlantilla={response.idPlantilla}
          setSelectedComponent={setSelectedComponent}
          onResponse={onResponse}
          auth={auth}
        ></EditarPlantilla>
      );
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
  const fetchFirmwares = useCallback(async () => {
    try {
      setIsLoading(true);
      const tkn = JSON.parse(sessionStorage.getItem("ACCSSTKN"))?.access_token;
      if (tkn !== undefined) {
        const json = await obtenerFirmwares(tkn);
        console.log("fetchFirmwares");
        console.log(json);
        setFirmwares(json.firmwares || []);
        setIsLoading(false);
      } else {
        setFirmwares([]);
        onResponse({ status: false, msg: "Unauthorized Access" });
      }
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  }, [setIsLoading, setFirmwares, onResponse]);
  const fetchHardwares = useCallback(async () => {
    try {
      setIsLoading(true);
      const tkn = JSON.parse(sessionStorage.getItem("ACCSSTKN"))?.access_token;
      if (tkn !== undefined) {
        const json = await obtenerHardwares(tkn);
        console.log("fetchHardwares");
        console.log(json);
        setHardwares(json.hardwares || []);
        setIsLoading(false);
      } else {
        setHardwares([]);
        onResponse({ status: false, msg: "Unauthorized Access" });
      }
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  }, [setIsLoading, setHardwares, onResponse]);

  useEffect(() => {
    fetchparametros();
  }, [fetchparametros]);
  useEffect(() => {
    fetchHardwares();
  }, [fetchHardwares]);
  useEffect(() => {
    fetchFirmwares();
  }, [fetchFirmwares]);
  return (
    <Grid container padding={2} justifyContent={"center"}>
    {!isLoading ? (
      <Grid item xs={12}>
          <HeaderContent titulo={"Agregar plantilla"}></HeaderContent>
          <Paper style={{ padding: 20 }}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={3}>
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
                            <em >
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
                      {firmwares.map((firmware,index) => (
                        <MenuItem key={index+1} value={firmware.codigo}>
                          {firmware.nombre}
                        </MenuItem>
                      ))}
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
                            <em >
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
                      {hardwares.map((hardware,index) => (
                        <MenuItem key={index+1} value={hardware.codigo}>
                          {hardware.nombre}
                        </MenuItem>
                      ))}
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
                <Grid item xs={3}>
                  <Grid
                    container
                    sx={{ justifyContent: "flex-end" }}
                    spacing={2}
                  >
                    <Grid item xs={12}>
                      <Button variant="contained" fullWidth type="submit">
                        Guardar cambios y continuar
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </form>
            <Button
        sx={{ mt: 5 }}
        variant="contained"
        color="success"
        onClick={() => setSelectedComponent(<Home />)}
        startIcon={<ArrowBackIcon />}
      >
        Salir
      </Button>
          </Paper>

    </Grid>
 ) : (
  <></>
)}
</Grid>
);
};

export default AgregarPlantilla;
