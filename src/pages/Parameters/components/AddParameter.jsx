import React, { useState } from "react";
import "../ParametersCss.css";
import {
  TextField,
  Button,
  IconButton,
  FormControl,
  FormLabel,
  Grid,
  Paper,
  Dialog,
  Modal,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import AddOptions from "./AddOptions";
import ItemOptions from "./ItemOptions";
import Typography from "@mui/material/Typography";
import { crearParametro } from "../../../api/axios";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useForm } from "react-hook-form";
import { FormHelperText } from "@mui/material";
const AddParameter = ({ open, handleClose }) => {
  const [tipoCampo, setTipoCampo] = useState("");
  const [openOptions, setOpenOptions] = useState(false); // Define el estado "open" en el componente padre
  const [options, setOptions] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const onSubmit = (data) => {
    console.log("onsub");
    console.log(data);
    fetchSetParameter(data);
  };

  const handleClickOpenOptions = () => {
    setOpenOptions(true);
  };

  const handleCloseOptions = async (data) => {
    await setOpenOptions(false);
    await setOptions([...options, data]);
    console.log(data);
    console.log(options);
  };

  const removeOption = (value) => {
    setOptions((prevOptions) =>
      prevOptions.filter((option) => options.value !== value)
    );
  };

  const fetchSetParameter = async (data) => {
    let newData = "";

    if (data.tipoCampo === "opciones") {
      newData = { ...data, opciones: options };
    }
    if (data.tipoCampo === "rango") {
      newData = { ...data };
    } else {
      console.log("options");
    }
    console.log("newData", newData);

    const response = await crearParametro(
      newData,
      JSON.parse(sessionStorage.getItem("ACCSSTKN")).access_token
    );
    if (response.ok) {
      const json = await response.json();
      console.log("yes", json);
    } else {
      console.log("Error");
    }
    handleClose();
  };

  return (
    <Modal open={open} onClose={handleClose} className="ap-modal">
      <Paper
        elevation={3}
        spacing={5}
        sx={{
          minWidth: "calc(25vw)",
          padding: 3,
          height: "fit-content",
          maxWidth: "calc(25vw)",
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container direction="column">
            <Typography sx={{ fontSize: 24 }}>Agregar parametro</Typography>

            <Grid container direction="column" spacing={2}>
              <Grid item xs={12}>
                <TextField
                  {...register("idParametro", { required: true })}
                  fullWidth
                  label="ID parametro"
                  variant="standard"
                  error={errors.idParametro ? true : false}
                  helperText={
                    errors.idParametro ? "Este campo es requerido" : ""
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  {...register("descripcion", { required: true })}
                  fullWidth
                  label="Descripción"
                  variant="standard"
                  error={errors.descripcion ? true : false}
                  helperText={
                    errors.descripcion ? "Este campo es requerido" : ""
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl variant="standard" sx={{ width: "100%" }}>
                  <InputLabel>Tipo parametro</InputLabel>
                  <Select
                    {...register("tipo_parametro", { required: true })}
                    onChange={(e) => {
                      setValue("tipo_parametro", e.target.value);
                    }}
                    error={errors.tipo_parametro ? true : false}
                  >
                    <MenuItem value="">
                      <em>Tipo parametro</em>
                    </MenuItem>
                    <MenuItem value={"General"}>General</MenuItem>
                    <MenuItem value={"General(fijo)"}>General(fijo)</MenuItem>
                    <MenuItem value={"Programación"}>Programación</MenuItem>
                    <MenuItem value={"Programación(fijo)"}>
                      Programación(fijo)
                    </MenuItem>
                  </Select>
                  {errors.tipo_parametro && (
                    <FormHelperText error={true}>
                      Este campo es requerido.
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl variant="standard" sx={{ width: "100%" }}>
                  <InputLabel>Grupo</InputLabel>
                  <Select
                    {...register("grupo", { required: true })}
                    onChange={(e) => {
                      setValue("grupo", e.target.value);
                    }}
                    error={errors.grupo ? true : false}
                  >
                    <MenuItem value="">
                      <em>Grupo</em>
                    </MenuItem>
                    <MenuItem value={"Temperatura"}>Temperatura</MenuItem>
                    <MenuItem value={"Deshielo"}>Deshielo</MenuItem>
                    <MenuItem value={"Display"}>Display</MenuItem>
                    <MenuItem value={"Equipo"}>Equipo</MenuItem>
                    <MenuItem value={"Fabricante"}>Fabricante</MenuItem>
                    <MenuItem value={"Cliente"}>Cliente</MenuItem>
                    <MenuItem value={"Consumo"}>Consumo</MenuItem>
                    <MenuItem value={"Alarmas"}>Alarmas</MenuItem>
                    <MenuItem value={"Otros Tiempo"}>Otros tiempos</MenuItem>
                    <MenuItem value={"Temperatura programa"}>
                      Temperatura programa
                    </MenuItem>
                    <MenuItem value={"Deshielo programa"}>
                      Deshielo programa
                    </MenuItem>
                    <MenuItem value={"Alarma programa"}>
                      Alarma programa
                    </MenuItem>
                  </Select>
                  {errors.grupo && (
                    <FormHelperText error={true}>
                      Este campo es requerido.
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <FormControl variant="standard" sx={{ width: "100%" }}>
                  <InputLabel>Tipo de campo</InputLabel>
                  <Select
                    {...register("tipoCampo", { required: true })}
                    onChange={(e) => {
                      setValue("tipoCampo", e.target.value);
                      setTipoCampo(e.target.value);
                      console.log("tyyyp");
                    }}
                    label="Tipo de campo"
                    error={errors.tipoCampo ? true : false}
                  >
                    <MenuItem value="">
                      <em>Tipo de campo</em>
                    </MenuItem>
                    <MenuItem value={"rango"}>Rango</MenuItem>
                    <MenuItem value={"opciones"}>Opciones</MenuItem>
                  </Select>
                  {errors.tipoCampo && (
                    <FormHelperText error={true}>
                      Este campo es requerido.
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              {tipoCampo === "rango" ? (
                <Grid item xs={12} name="gridRango">
                  <Paper variant="outlined" style={{ padding: 15 }}>
                    <Grid container direction="column">
                      <Grid item>
                        <FormLabel style={{ marginBottom: 5 }}>Rango</FormLabel>
                      </Grid>
                      <Grid item xs={12}>
                        <FormControl variant="standard" sx={{ width: "100%" }}>
                          <InputLabel>Unidad</InputLabel>
                          <Select
                            {...register("unidad", { required: true })}
                            onChange={(e) => {
                              setValue("unidad", e.target.value);
                              console.log("sijala");
                            }}
                            error={errors.unidad ? true : false}
                          >
                            <MenuItem value="">
                              <em>Unidad</em>
                            </MenuItem>
                            <MenuItem value={"h"}>Horas</MenuItem>
                            <MenuItem value={"min"}>Minutos</MenuItem>
                            <MenuItem value={"seg"}>Segundos</MenuItem>
                            <MenuItem value={"°C"}>Centigrados</MenuItem>
                          </Select>
                          {errors.unidad && (
                            <FormHelperText error={true}>
                              Este campo es requerido.
                            </FormHelperText>
                          )}
                        </FormControl>
                      </Grid>
                      <Grid item>
                        <TextField
                          {...register("valor_min", { required: true })}
                          label="Valor mínimo"
                          variant="standard"
                          error={errors.valor_min ? true : false}
                          helperText={
                            errors.valor_min ? "Este campo es requerido" : ""
                          }
                        />
                      </Grid>
                      <Grid item>
                        <TextField
                          {...register("valor_max", { required: true })}
                          label="Valor máximo"
                          variant="standard"
                          error={errors.valor_max ? true : false}
                          helperText={
                            errors.valor_max ? "Este campo es requerido" : ""
                          }
                        />
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>
              ) : tipoCampo === "opciones" ? (
                <Grid item xs={12} name="gridOptions">
                  <Paper variant="outlined" style={{ padding: 15 }}>
                    <FormLabel>
                      Agregar opción:
                      <IconButton
                        aria-label="Agregar parametro"
                        onClick={handleClickOpenOptions}
                      >
                        <AddCircleIcon />
                      </IconButton>
                    </FormLabel>
                    <Grid
                      item
                      xs={12}
                      sx={{
                        overflowY: "scroll",
                        maxHeight: "250px",
                        height: "fit-content",
                      }}
                    >
                      {options.map((item, index) => (
                        <ItemOptions
                          key={index}
                          value={item.valor}
                          name={item.nombre}
                          removeOption={removeOption}
                        ></ItemOptions>
                      ))}
                    </Grid>
                  </Paper>
                </Grid>
              ) : null}
              <Grid item xs={12}>
                <Dialog open={openOptions} onClose={handleCloseOptions}>
                  <AddOptions
                    open={openOptions}
                    handleClose={handleCloseOptions}
                  ></AddOptions>
                </Dialog>
              </Grid>

              <Grid item xs={12}>
                <Grid container sx={{ justifyContent: "flex-end" }} spacing={2}>
                  <Grid item>
                    <Button variant="outlined" type="submit">
                      Accept
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button variant="outlined" onClick={handleClose}>
                      Close
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Modal>
  );
};

export default AddParameter;
