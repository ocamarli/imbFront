import { useForm, Controller } from "react-hook-form";
import React, { useEffect } from "react";
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

import HeaderContent from "../HeaderContent";

import Home from "../Home/Home.jsx";
import { usePlantillaService } from "../../hooks/usePlantillaService.jsx";
import { useParametroService } from "../../hooks/useParametroService.jsx";
import { useHardwareService } from "../../hooks/useHardwareService.jsx";
import { useFirmwareService } from "../../hooks/useFirmwareService.jsx";
import ModalGenerico from "../../components/ModalGenerico.jsx";
import LoadingComponent from "../LoadingComponent.jsx";
import ListaPlantillas from "./ListaPlatillas.jsx";
const AgregarPlantilla = ({ setSelectedComponent, onResponse, auth }) => {
  const {
    isLoading,
    handleCrearPlantilla,
    cerrarModalOk,
    estaActivoModalOk,
    respuestaModalOk,
  } = usePlantillaService();
  const { parametros, fetchParametros } = useParametroService(onResponse);
  const { hardwares, fetchHardwares } = useHardwareService(onResponse);
  const { firmwares, fetchFirmwares } = useFirmwareService(onResponse);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    fetchParametros();
    fetchHardwares(true);
    fetchFirmwares(true);
  }, [fetchParametros, fetchHardwares, fetchFirmwares]);

  const onSubmit = (data) => {
    console.log("onsub");
    console.log(data);
    if(handleCrearPlantilla(data, parametros, auth)){
      console.log(true)
      setSelectedComponent(<ListaPlantillas 
        setSelectedComponent={setSelectedComponent}
        onResponse={onResponse}
        auth={auth}></ListaPlantillas>)

    }
    else{
      console.log(false)
    }
    
  };

  useEffect(() => {
    console.log("Firmwares:", firmwares);
    console.log("Hardwares:", hardwares);
  }, [firmwares, hardwares]);
  const renderModals = () => (
    <>
      <ModalGenerico
        tipoModal={respuestaModalOk.status}
        open={estaActivoModalOk}
        onClose={cerrarModalOk}
        title={respuestaModalOk.status ? "Correcto" : "Advertencia"}
        message={respuestaModalOk.msg}
        autoCierre={true}
      />
    </>
  );
  if (isLoading) {
    return <LoadingComponent />;
  }
  return (
    <Grid container padding={2} justifyContent={"center"}>
      <Grid item xs={12}>
        {renderModals()}
        <HeaderContent titulo={"Agregar plantilla"}></HeaderContent>
        <Paper style={{ padding: 20 }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <Typography>Id de plantilla</Typography>
                <TextField
                  {...register("idPlantillaInterno", { required: true })}
                  size="small"
                  fullWidth
                  placeholder="Id plantilla"
                  variant="outlined"
                  error={errors.idPlantillaInterno ? true : false}
                  helperText={
                    errors.idPlantillaInterno ? "Este campo es requerido" : ""
                  }
                />
              </Grid>
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
                  <Controller
                    name="firmware"
                    control={control}
                    defaultValue=""
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        size="small"
                        error={errors.firmware ? true : false}
                        displayEmpty
                        renderValue={(selected) => {
                          if (!selected) {
                            return <em>Selecciona una firmware</em>;
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
                    )}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <Typography>Hardware</Typography>
                <FormControl variant="outlined" sx={{ width: "100%" }}>
                  <Controller
                    name="hardware"
                    control={control}
                    defaultValue=""
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        size="small"
                        error={errors.hardware ? true : false}
                        displayEmpty
                        renderValue={(selected) => {
                          if (!selected) {
                            return <em>Selecciona una hardware</em>;
                          }
                          return selected;
                        }}
                      >
                        <MenuItem disabled value="">
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
                    )}
                  />
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
                <Grid
                  container
                  sx={{ justifyContent: "space-around" }}
                  spacing={2}
                >

                  <Grid item xs={6}>
                    <Button
                      variant="contained"
                      type="submit"
                      sx={{ height: "50px" }}
                      fullWidth
                    >
                      Guardar cambios y continuar
                    </Button>
                  </Grid>
                  <Grid item xs={6}>
                    <Button
                      color="error"
                      variant="contained"
                      sx={{ height: "50px" }}
                      fullWidth
                      onClick={() => setSelectedComponent(<Home />)}
                    >
                      Salir
                    </Button>
                  </Grid>                  
                </Grid>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default AgregarPlantilla;
