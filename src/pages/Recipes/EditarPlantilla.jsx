import { useForm } from "react-hook-form";
import React, { useState, useEffect, useCallback } from "react";
import { useTheme } from "@mui/material/styles";
import {
  TextField,
  Button,
  FormControl,
  Grid,
  Paper,
  Select,
  MenuItem,
  Typography,
  InputLabel,
  CircularProgress,
} from "@mui/material";
import { crearReceta } from "../../api/axios";
import TablaDatos from "../../components/TablaDatos";
import { obtenerParametros } from "../../api/axios";
import HeaderContent from "../HeaderContent";
import LockIcon from "@mui/icons-material/Lock";
import LockOpenIcon from "@mui/icons-material/LockOpen";
const EditarPlantilla = (props) => {
  const { onResponse, auth } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [parametros, setParametros] = useState([]);
  const theme = useTheme();
  const [bloqueado, setBloqueado] = useState(false);

  const alternarBloqueo = () => {
    setBloqueado(!bloqueado);
  };

  console.log("auth");
  console.log(auth);
  const handleCrearReceta = async (data) => {
    const list = [];
    parametros.map((param) => {
      list.push({ id_parametro: param, valor: "", estado: false });
      return null;
    });

    const newData = { ...data, parametros: list };
    console.log(newData);
    const response = await crearReceta(
      newData,
      JSON.parse(sessionStorage.getItem("ACCSSTKN")).access_token
    );
    console.log("response", response);
    if (response.status) {
      console.log("YES");

      handleClose();
    } else {
      console.log("Error");
    }
  };
  const onSubmit = (data) => {
    console.log("onsub");
    console.log(data);
    handleCrearReceta(data);
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
      console.log(tkn);
      if (tkn !== undefined) {
        const json = await obtenerParametros(tkn);
        console.log(json);
        setParametros(json.parameters || []);
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

  const handleClose = useCallback(async () => {
    await fetchparametros();
  }, [fetchparametros]);

  useEffect(() => {
    fetchparametros();
  }, [fetchparametros]);
  return (
    <Grid container padding={1}>
        {isLoading ? ( // Agrega el loader condicionalmente
          <Grid item xs={12} align="center" mt="25%">
            <CircularProgress size={50} />
          </Grid>
        ):(<Grid>
                  <HeaderContent></HeaderContent>
        <Paper style={{ padding: 10 }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={1}>
            <Grid item xs={6}>
                <Typography>Nombre de plantilla</Typography>
                <TextField
                  {...register("nombre_plantilla", { required: true })}
                  size="small"
                  fullWidth
                  placeholder="Nombre plantilla"
                  variant="outlined"
                  error={errors.nombre_plantilla ? true : false}
                  helperText={
                    errors.nombre_plantilla ? "Este campo es requerido" : ""
                  }
                />
              </Grid>
              <Grid item xs={6}>
                <Typography>Familia</Typography>
                <FormControl variant="outlined" sx={{ width: "100%" }}>
                  <Select
                    {...register("familia", { required: true })}
                    size="small"
                    error={errors.familia ? true : false}
                    defaultValue="" // Asegúrate de dejar este defaultValue vacío
                    displayEmpty // Esta propiedad garantiza que el elemento seleccionado muestre el placeholder cuando esté vacío
                    renderValue={(selected) => {
                      if (!selected) {
                        return (
                          <em style={{ color: "rgba(0, 0, 0, 0.54)" }}>
                            Selecciona una familia
                          </em>
                        );
                      }
                      return selected;
                    }}
                  >
                    <MenuItem disabled value="">
                      <em>Selecciona una familia</em>
                    </MenuItem>
                    <MenuItem value={"Familia 1"}>Familia 1</MenuItem>
                    <MenuItem value={"Familia 1"}>Familia 2</MenuItem>
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
              <Grid item xs={6}>
                <InputLabel>Autoriza</InputLabel>
                <TextField
                  {...register("autoriza", { required: true })}
                  size="small"
                  fullWidth
                  placeholder="Autoriza"
                  variant="outlined"
                  error={errors.autoriza ? true : false}
                  helperText={errors.autoriza ? "Este campo es requerido" : ""}
                />
              </Grid>
              <Grid item xs={12}>
                <InputLabel>Bloquear</InputLabel>
                <Button
                  {...register("congelar", { required: true })}
                  size="small"
                  onClick={alternarBloqueo}
                  variant="contained"
                  style={{
                    backgroundColor: bloqueado
                      ? theme.palette.grey[400]
                      : theme.palette.primary.light,
                  }}
                  startIcon={bloqueado ? <LockIcon /> : <LockOpenIcon />}
                  error={errors.congelar ? true : false}
                  helperText={errors.congelar ? "Este campo es requerido" : ""}
                >
                  {bloqueado ? "Congelado" : "Congelar"}
                </Button>
              </Grid>
              <Grid item xs={6}></Grid>

              <Grid item xs={12}>
                <Grid container sx={{ justifyContent: "flex-end" }} spacing={2}>
                  <Grid item xs={12}>
                    <Button variant="contained" fullWidth type="submit">
                      Crear Receta
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6">Parametros</Typography>
              </Grid>
              <Grid item xs={12}>
                <TablaDatos
                  onResponse={onResponse}
                ></TablaDatos>
              </Grid>
            </Grid>
          </form>
        </Paper>

        </Grid>)}

    </Grid>
  );
};

export default EditarPlantilla;
