import { useForm } from "react-hook-form";
import React, { useState, useEffect, useMemo } from "react";
import { useTheme } from "@mui/material/styles";
import {
  TextField, FormControlLabel, Radio, RadioGroup, FormLabel, FormControl,
  Grid, Button, Paper, Select, MenuItem, Typography, InputLabel} from "@mui/material";
import HeaderContent from "../HeaderContent";
import LockIcon from "@mui/icons-material/Lock";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import TablaContenido from "./Componentes/TablaContenido";
import Home from "../Home/Home.jsx";
import ArrowBackIcon from "@mui/icons-material/ArrowBack.js";
import GrupoCheckbox from "../../components/GrupoCheckbox.jsx";
import { usePlantillaService } from "../../hooks/usePlantillaService.jsx";
import LoadingComponent from "../LoadingComponent.jsx";

const EditarPlantilla = ({ idPlantilla, setSelectedComponent, auth ,onResponse}) => {
  const { isLoading, plantilla, fetchPlantilla } = usePlantillaService(onResponse);
  
  const totalDeProgramas = useMemo(() => ["1", "2", "3", "4", "5", "6"], []);

  const [checkboxSeleccionados, setCheckboxSeleccionados] = useState([]);
  const theme = useTheme();
  const [bloqueado, setBloqueado] = useState(false);
  const [programaSeleccionado, setProgramaSeleccionado] = useState(totalDeProgramas[0]);

  const handleChange = (event) => {
    setProgramaSeleccionado(event.target.value);
  };
  const alternarBloqueo = () => {
    setBloqueado(!bloqueado);
  };

  const onSubmit = (data) => {
    console.log("onsub");
    console.log(data);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    fetchPlantilla(idPlantilla);
  }, [fetchPlantilla,idPlantilla]);
  if (isLoading || plantilla == null ) {
    console.log("plantilla-----",plantilla)
    return <LoadingComponent />;
  }
  else{
  return (
    
    <Grid container padding={1}>
        {console.log("plantilla_______",plantilla)}

        <Grid>
          <HeaderContent
            titulo={plantilla?.nombrePlantilla}
          ></HeaderContent>
          <Paper style={{ padding: 10 }}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={1}>
                <Grid item xs={6}>
                  <Typography>Nombre de plantilla</Typography>
                  <TextField
                    {...register("nombrePlantilla", { required: true })}
                    size="small"
                    fullWidth
                    placeholder={plantilla?.nombrePlantilla || ""}
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
                              {plantilla?.firmware}
                            </em>
                          );
                        }
                        return selected;
                      }}
                    >
                      <MenuItem disabled value="">
                        <em>Selecciona una firmware</em>
                      </MenuItem>
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
                              {plantilla?.hardware}
                            </em>
                          );
                        }
                        return selected;
                      }}
                    >
                      <MenuItem disabled value={plantilla?.hardware}>
                        <em>Selecciona una hardware</em>
                      </MenuItem>
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
                <Grid item xs={12}>
                  <InputLabel>Creado por</InputLabel>
                  <InputLabel>{plantilla.creadoPor}</InputLabel>
                </Grid>
                <Grid item xs={12}>
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
                    helperText={
                      errors.congelar ? "Este campo es requerido" : ""
                    }
                  >
                    {bloqueado ? "Congelado" : "Congelar"}
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <GrupoCheckbox
                    setCheckboxSeleccionado={setCheckboxSeleccionados}
                  ></GrupoCheckbox>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body1" fontWeight={600}>
                    Inicio seleccionado
                  </Typography>

                  <FormControl component="fieldset">
                    <FormLabel component="legend">
                      Selecciona un programa
                    </FormLabel>
                    <RadioGroup
                      row
                      value={programaSeleccionado}
                      onChange={handleChange}
                    >
                      <Grid container>
                        {totalDeProgramas.map((programa) => (
                          <Grid item key={programa}>
                            <FormControlLabel
                              value={programa}
                              control={<Radio />}
                              label={programa}
                            />
                          </Grid>
                        ))}
                      </Grid>
                    </RadioGroup>
                  </FormControl>
                </Grid>
                <Grid item xs={6}></Grid>

                <Grid item xs={12}>
                  <TablaContenido
                    idPlantilla={idPlantilla}
                    setSelectedComponent={setSelectedComponent}
                    auth={auth}
                    checkboxSeleccionados={checkboxSeleccionados}
                    onResponse={onResponse}
                  ></TablaContenido>
                </Grid>
              </Grid>
            </form>
            <Button
        sx={{ mt: 5 }}
        variant="contained"
        color="success"
        onClick={() => setSelectedComponent(<Home></Home>)}
        startIcon={<ArrowBackIcon />}
      >
        Salir
      </Button>
          </Paper>
        </Grid>
      
    </Grid>
  );
}
};
export default EditarPlantilla;
