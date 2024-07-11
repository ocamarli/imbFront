import { useForm } from "react-hook-form";
import React, { useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import {
  TextField, FormControlLabel, Radio, RadioGroup, FormLabel, FormControl,
  Grid, Button, Paper, Select, MenuItem, Typography, InputLabel,
  Divider,
} from "@mui/material";
import HeaderContent from "../HeaderContent";
import LockIcon from "@mui/icons-material/Lock";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import TablaContenido from "./Componentes/TablaContenido";
import Home from "../Home/Home.jsx";
import ArrowBackIcon from "@mui/icons-material/ArrowBack.js";
import GrupoCheckbox from "./Componentes/GrupoCheckbox.jsx";
import { usePlantillaService } from "../../hooks/usePlantillaService.jsx";
import { useFirmwareService } from "../../hooks/useFirmwareService.jsx";
import { useHardwareService } from "../../hooks/useHardwareService.jsx";
import LoadingComponent from "../LoadingComponent.jsx";
import ModalGenerico from "../../components/ModalGenerico.jsx";
import ListaPlantillas from "./ListaPlatillas.jsx";

const EditarPlantilla = ({ idPlantilla, setSelectedComponent, auth, onResponse }) => {
  const {
    handleActualizarInicioSeleccionado,
    cerrarModalOk,
    estaActivoModalOk,
    respuestaModalOk,
    programaSeleccionado,
    setProgramaSeleccionado,
    totalDeProgramas,
    checkboxSeleccionados,
    setCheckboxSeleccionados,
    isLoading,
    plantilla,
    fetchPlantilla,
    handleActualizarPlantilla,
    handleActualizarEstatusCongelado, estaCongelado
  } = usePlantillaService(onResponse);

  const { hardwares, fetchHardwares } = useHardwareService(onResponse);
  const { firmwares, fetchFirmwares } = useFirmwareService(onResponse);
  const theme = useTheme();

  const handleChange = (event) => {
    setProgramaSeleccionado(event.target.value);
    handleActualizarInicioSeleccionado({ "idPlantilla": idPlantilla, "programaSeleccionado": event.target.value })
  };
  const handleActualizar = (idPlantilla) =>{
    const response=handleActualizarEstatusCongelado(idPlantilla, !estaCongelado)
    if(response){
      setSelectedComponent(
      <ListaPlantillas
      setSelectedComponent={setSelectedComponent}
      auth={auth}
      onResponse={onResponse}></ListaPlantillas>)
  }
}

  const onSubmit = (data) => {
    console.log("...onsub...", data);
    handleActualizarPlantilla({"idPlantilla":idPlantilla,...data})
  };
  const handleOnCLickSalir = () => setSelectedComponent(<Home />);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    fetchPlantilla(idPlantilla);
    fetchHardwares(true);
    fetchFirmwares(true);
  }, [fetchPlantilla,fetchHardwares,fetchFirmwares,idPlantilla]);

  const renderModal = () => (
    <ModalGenerico
      tipoModal={respuestaModalOk.status}
      open={estaActivoModalOk}
      onClose={cerrarModalOk}
      title={respuestaModalOk.status ? "Correcto" : "Advertencia"}
      message={respuestaModalOk.msg}
      autoCierre={true}
    />
  );

  if (isLoading || plantilla == null) {
    return <LoadingComponent />;
  } else {
    return (
      <Grid container padding={1}>
        {renderModal()}
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
                    disabled={estaCongelado}
                    size="small"
                    fullWidth
                    defaultValue={plantilla?.nombrePlantilla || ""}
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
                      disabled={estaCongelado}
                      size="small"
                      error={errors.firmware ? true : false}
                      defaultValue={plantilla?.firmware || ""}
                      displayEmpty
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
                      {firmwares.map((firmware, index) => (
                        <MenuItem
                          key={index}
                          value={firmware.idFirmwareInterno}
                        >
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
                      disabled={estaCongelado}
                      size="small"
                      error={errors.hardware ? true : false}
                      defaultValue={plantilla?.hardware || ""}
                      displayEmpty
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
                      {hardwares.map((firmware, index) => (
                        <MenuItem
                          key={index}
                          value={firmware.idFirmwareInterno}
                        >
                          {firmware.nombre}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <Typography>Última nota</Typography>
                  <TextField
                    {...register("ultima_nota", { required: true })}
                    disabled={estaCongelado}
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
                <Grid item xs={6}>
                  <Button disabled={estaCongelado} variant="contained" type="submit" sx={{ height: "50px" }} fullWidth>
                    Actualizar
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button color="error" variant="contained" onClick={()=>{handleOnCLickSalir()}}sx={{ height: "50px" }} fullWidth>
                    Salir
                  </Button>
                </Grid>
                <Divider orientation="vertical" flexItem />

                <Grid item xs={12}>
                  <Button
                    size="small"
                    disabled={estaCongelado}
                    onClick={() => handleActualizar(idPlantilla)}
                    variant="contained"
                    style={{
                      backgroundColor: estaCongelado
                        ? theme.palette.grey[400]
                        : theme.palette.primary.light,
                    }}
                    startIcon={estaCongelado ? <LockIcon /> : <LockOpenIcon />}
                    error={errors.congelar ? true : false}
                    helperText={
                      errors.congelar ? "Este campo es requerido" : ""
                    }
                  >
                    {estaCongelado ? "Congelado" : "Congelar"}
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <GrupoCheckbox
                    setCheckboxSeleccionado={setCheckboxSeleccionados}
                    setCheckboxSeleccionados={setCheckboxSeleccionados}
                    checkboxSeleccionados={checkboxSeleccionados}
                    idPlantilla={idPlantilla}
                    onResponse={onResponse}
                    estaCongelado={estaCongelado}
                    setProgramaSeleccionado={setProgramaSeleccionado}
                    programaSeleccionado={programaSeleccionado}
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
                      disabled={estaCongelado}
                    >
                      <Grid container>
                        {totalDeProgramas.map((programa) => (
                          <Grid item key={programa}>
                            <FormControlLabel
                              value={programa}
                              control={<Radio />}
                              label={programa}
                              disabled={estaCongelado || !checkboxSeleccionados.includes(programa)}
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
                    estaCongelado={estaCongelado}
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
