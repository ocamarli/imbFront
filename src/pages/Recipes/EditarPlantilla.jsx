import { useForm } from "react-hook-form";
import React, { useState, useEffect, useCallback } from "react";
import { useTheme } from "@mui/material/styles";
import {
  TextField, FormControlLabel, FormControl,
  Grid,Checkbox,Box,Button, Paper, Select, MenuItem, Typography, InputLabel, CircularProgress,
} from "@mui/material";
import HeaderContent from "../HeaderContent";
import LockIcon from "@mui/icons-material/Lock";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { obtenerPlantilla } from "../../api/axios";
import TablaContenido from "./Componentes/TablaContenido";
import Home from "../Home/Home.jsx"
import ArrowBackIcon from "@mui/icons-material/ArrowBack.js";
const EditarPlantilla = (props) => {
  const { idPlantilla, setSelectedComponent, auth } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [plantilla, setPlantilla] = useState(null);
  const [checkedItems, setCheckedItems] = useState({
    checkbox1: false,
    checkbox2: false,
    checkbox3: false,
    checkbox4: false,
    checkbox5: false,
    checkbox6: false,
  });
  const theme = useTheme();
  const [bloqueado, setBloqueado] = useState(false);
  const alternarBloqueo = () => {
    setBloqueado(!bloqueado);
  };

  const handleCheckboxChange = (event, checkboxName) => {
    setCheckedItems({
      ...checkedItems,
      [checkboxName]: event.target.checked,
    });
  };

  const onSubmit = (data) => {
    console.log("onsub");
    console.log(data);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },

  } = useForm({
    defaultValues: {
      nombrePlantilla: plantilla?.plantilla.nombrePlantilla || "",
      hardware: plantilla?.plantilla.hardware || "",
      firmware: plantilla?.plantilla.nombrePlantilla || ""
    }
  });
  const fetchObtenerPlantilla = useCallback(async () => {
    try {
      setIsLoading(true);
      const tkn = JSON.parse(sessionStorage.getItem("ACCSSTKN"))?.access_token;
      if (tkn !== undefined) {
        console.log("obtenerPlantilla");
        const json = await obtenerPlantilla(tkn, idPlantilla);
        console.log(json);
        setPlantilla(json || null);
        setIsLoading(false);
      } else {
        setPlantilla(null);

      }
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  }, [setIsLoading, setPlantilla, idPlantilla]);

  useEffect(() => {
    fetchObtenerPlantilla();
  }, [fetchObtenerPlantilla]);

  return (
    <Grid container padding={1}>
      {isLoading || plantilla == null ? ( // Agrega el loader condicionalmente
        <Grid item xs={12} align="center" mt="25%">
          <CircularProgress size={50} />
        </Grid>
      ) : (
        <Grid>
          <HeaderContent
            titulo={plantilla.plantilla.nombrePlantilla}
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
                    placeholder={plantilla?.plantilla.nombrePlantilla || ""}
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
                              {plantilla?.plantilla.firmware}
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
                              {plantilla?.plantilla.hardware}
                            </em>
                          );
                        }
                        return selected;
                      }}
                    >
                      <MenuItem disabled value={plantilla?.plantilla.hardware}>
                        <em>Selecciona una hardware</em>
                      </MenuItem>
                      <MenuItem value={"Hardware 1"}>Hardware 1</MenuItem>
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
                  <InputLabel>Creado por</InputLabel>
                  <InputLabel>{plantilla.plantilla.creadoPor}</InputLabel>
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
                <Grid item xs= {12} >
      <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        <Typography color='gray'>Programaciones</Typography>
        <br></br>
      <FormControlLabel
        control={<Checkbox checked={checkedItems.checkbox1} onChange={handleCheckboxChange} name="checkbox1" />}
        label="1"
      />
      <FormControlLabel
        control={<Checkbox checked={checkedItems.checkbox2} onChange={handleCheckboxChange} name="checkbox2" />}
        label="2"
      />
      <FormControlLabel
        control={<Checkbox checked={checkedItems.checkbox3} onChange={handleCheckboxChange} name="checkbox3" />}
        label="3"
      />
      <FormControlLabel
        control={<Checkbox checked={checkedItems.checkbox4} onChange={handleCheckboxChange} name="checkbox4" />}
        label="4"
      />
      <FormControlLabel
        control={<Checkbox checked={checkedItems.checkbox5} onChange={handleCheckboxChange} name="checkbox5" />}
        label="5"
      />
      <FormControlLabel
        control={<Checkbox checked={checkedItems.checkbox6} onChange={handleCheckboxChange} name="checkbox6" />}
        label="6"
      />
    </Box>
 </Grid>                
                <Grid item xs={6}></Grid>

                <Grid item xs={12}>
                  <TablaContenido idPlantilla={idPlantilla} setSelectedComponent={setSelectedComponent} auth={auth}></TablaContenido>        
                </Grid>

              </Grid>
            </form>
          </Paper>
        </Grid>
      )}
                <Button sx={{mt:5}}
      variant="contained"
      color="success" 
      onClick={() => setSelectedComponent(<Home></Home>)}
      startIcon={<ArrowBackIcon />} 
    >
      Salir
    </Button>
    </Grid>
  );
};
export default EditarPlantilla;
