import { useForm } from "react-hook-form";
import React, { useEffect,useState } from "react";
import { useTheme } from "@mui/material/styles";
import {
  TextField, FormControlLabel, Radio, RadioGroup, FormLabel, FormControl,
  Grid, Button, Paper, Select, MenuItem, Typography, InputLabel,Dialog,
  Divider
} from "@mui/material";
import HeaderContent from "../HeaderContent";
import LockIcon from "@mui/icons-material/Lock";
import {Add as AddIcon} from "@mui/icons-material";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import TablaContenido from "./Componentes/TablaContenido";
import Home from "../Home/Home.jsx";
import ArrowBackIcon from "@mui/icons-material/ArrowBack.js";
import GrupoCheckbox from "./Componentes/GrupoCheckbox.jsx";
import { usePlantillaService } from "../../hooks/usePlantillaService.jsx";
import { useFirmwareService } from "../../hooks/useFirmwareService.jsx";
import { useHardwareService } from "../../hooks/useHardwareService.jsx";
import { useGaeService } from "../../hooks/useGaeServices.jsx";
import LoadingComponent from "../LoadingComponent.jsx";
import ModalGenerico from "../../components/ModalGenerico.jsx";
import { handleOnChangeInputIds } from "../../utils.js";
import ModalAgregarNota from "./Componentes/ModalAgregarNota.jsx";
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
    handleActualizarEstatusCongelado,
     estaCongelado,
     abrirAgregarNota,
     setAbrirAgregarNota,
     handleAbrirAgregarNota,
     setEstaActivoModalOk,
     setRespuestaModalOk,
     ultimaNota,
     setUltimaNota
  } = usePlantillaService(onResponse);

  const { hardwares, fetchHardwares } = useHardwareService(onResponse);
  const { firmwares, fetchFirmwares } = useFirmwareService(onResponse);
  const { gaes, fetchGaes } = useGaeService(onResponse);
  const [hardware, setHardware] = useState(plantilla?.hardmware || "");
  const [firmware, setFirmware] = useState(plantilla?.firmmware || "");
  const [gae, setGae] = useState(plantilla?.gae || "");
  
  
  const theme = useTheme();

  const handleChange = (event) => {
    setProgramaSeleccionado(event.target.value);
    handleActualizarInicioSeleccionado({ "idPlantilla": idPlantilla, "programaSeleccionado": event.target.value })
  };
  const handleActualizar = (idPlantilla) =>{
    handleActualizarEstatusCongelado(idPlantilla, !estaCongelado)

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
  const handleOnChangeGae= (valor) => {
    setGae(valor)
  };  
  const handleOnChangeHardware = (valor) => {
    setHardware(valor)
  };  
  const handleOnChangeFirmware = (valor) => {
    setFirmware(valor)
  };
  useEffect(() => {
    fetchPlantilla(idPlantilla);
    fetchHardwares(true);
    fetchFirmwares(true);
    fetchGaes(true);
  }, [fetchPlantilla,fetchHardwares,fetchFirmwares,fetchGaes,idPlantilla]);

  const renderModal = () => (
    <>
    <ModalGenerico
      tipoModal={respuestaModalOk.status}
      open={estaActivoModalOk}
      onClose={cerrarModalOk}
      title={respuestaModalOk.status ? "Correcto" : "Advertencia"}
      message={respuestaModalOk.msg}
      autoCierre={true}
    />
    <Dialog open={abrirAgregarNota} onClose={cerrarModalOk}>
    <ModalAgregarNota
    idPlantilla={idPlantilla}
    setSelectedComponent={setSelectedComponent}
    auth={auth}
    activo={abrirAgregarNota}
    autoCierre={false}
    onClose={()=>setAbrirAgregarNota(false)}
    onResponse={onResponse}
    setEstaActivoModalOk={setEstaActivoModalOk}
    setRespuestaModalOk={setRespuestaModalOk}
    setUltimaNota={setUltimaNota}
  />
  </Dialog>
  </>      
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
                <Typography>Id de plantilla</Typography>
                <TextField
                disabled
                onChange={handleOnChangeInputIds}
                  size="small"
                  fullWidth
                  placeholder="Id plantilla"
                  variant="outlined"
                  defaultValue={plantilla?.idPlantillaInterno || ""}
                  helperText={
                    errors.idPlantillaInterno ? "Este campo es requerido" : ""
                  }
                />
              </Grid>                
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
                      value={firmware}
                      displayEmpty
                      onChange={(e)=>handleOnChangeFirmware(e.target.value)}
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
                      value={hardware}
                      onChange={(e)=>handleOnChangeHardware(e.target.value)}
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
                      {hardwares.map((hardware, index) => (
                        <MenuItem
                          key={index}
                          value={hardware.idHardwareInterno}
                        >
                          {hardware.nombre}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <Typography>GAE</Typography>
                  <FormControl variant="outlined" sx={{ width: "100%" }}>
                    <Select
                      {...register("gae", { required: true })}
                      disabled={estaCongelado}
                      size="small"
                      error={errors.gae ? true : false}
                      value={gae}

                      onChange={(e)=>handleOnChangeGae(e.target.value)}
                      displayEmpty
                      renderValue={(selected) => {
                        if (!selected) {
                          return (
                            <em style={{ color: "rgba(0, 0, 0, 0.54)" }}>
                              {plantilla?.gae}
                            </em>
                          );
                        }
                        return selected;
                      }}
                    >
                      <MenuItem disabled value={plantilla?.gae}>
                        <em>Selecciona una gae</em>
                      </MenuItem>
                      {gaes.map((gae, index) => (
                        <MenuItem
                          key={index}
                          value={gae.idGaeInterno}
                        >
                          {gae.nombre}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <Typography>Última nota</Typography>
                  <TextField
                    disabled
                    value={ultimaNota}
                    size="small"
                    fullWidth
                    variant="outlined"
                  />
                </Grid>


                <Grid item xs={12}>
                  <Button
                    size="small"
                    disabled={estaCongelado}
                    onClick={() => handleAbrirAgregarNota(idPlantilla)}
                    variant="contained"
                    style={{
                      backgroundColor: estaCongelado
                        ? theme.palette.grey[400]
                        : theme.palette.primary.light,
                    }}
                    startIcon={<AddIcon />}
                  >
                    Agregar nota
                  </Button>
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
