import {
  TextField,
  FormControl,
  Grid,
  CircularProgress,
  Select,
  MenuItem,
  Typography,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useState, useEffect, useCallback } from "react";
import { obtenerGaes } from "../../../api/axios";
import { obtenerPlantilla } from "../../../api/axios";
const TablaContenido = (props) => {
  const { idPlantilla} = props;
  const [gaes, setGaes] = useState([]);

  const [plantilla, setPlantilla] = useState(null);

  const fetchObtenerPlantilla = useCallback(async () => {
    try {
      const tkn = JSON.parse(sessionStorage.getItem("ACCSSTKN"))?.access_token;
      console.log(tkn);
      if (tkn !== undefined) {
        console.log("obtenerPlantilla");
        console.log(idPlantilla);
        const json = await obtenerPlantilla(tkn, idPlantilla);
        console.log(json);
        setPlantilla(json.plantilla || null);
      } else {
        setPlantilla(null);

      }
    } catch (error) {
      console.error(error);
    }
  }, [idPlantilla,setPlantilla]);

  const fetchGaes = useCallback(async () => {
    try {
      const tkn = JSON.parse(sessionStorage.getItem("ACCSSTKN"))?.access_token;
      if (tkn !== undefined) {
        const json = await obtenerGaes(tkn);
        console.log(json);
        setGaes(json.gaes || []);
      } else {
        setGaes([]);
      }
    } catch (error) {
      console.error(error);
    }
  }, [setGaes]);

  useEffect(() => {
    console.log(idPlantilla);

    fetchGaes();
  }, [idPlantilla,fetchGaes]);
  useEffect(() => {
    fetchObtenerPlantilla();
  }, [fetchObtenerPlantilla]);
  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    {
      field: "valor",
      headerName: "Valor",
      flex: 1,
      editable: true,
      renderCell: (params) => {
        if (params.row.tipo_campo === "opciones") {
          return (
            <FormControl variant="outlined" size="small" fullWidth>
              <Select
                value={""}
                onChange={(e) => console.log(e.target.value, params.id)}
              >
                {gaes.map((gae) => (
                  <MenuItem key={gae.id} value={gae.valor}>
                    {gae.valor}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          );
        } else {
          return (
            <TextField
              value={params.value}
              onChange={(e) => console.log(e.target.value)}
              fullWidth
            />
          );
        }
      },
    },
    {
      field: "rango",
      headerName: "Rango",
      flex: 1,
    },
    {
      field: "descripcion",
      headerName: "Descripción",
      flex: 2,
    },
  ];
  function transformarDatos(parametros) {
    console.log(parametros);
    return parametros.map((parametro) => {
      let tipoCampoData = "";
      let unidadValor = "";
      let rango;
      let logicaFuncionamiento = "";
      console.log(logicaFuncionamiento, tipoCampoData, unidadValor);
      if (parametro.tipo_campo === "rango") {
        unidadValor = parametro.unidad;
        rango =
          parametro.valor_min +
          "" +
          parametro.unidad +
          "-" +
          parametro.valor_max +
          parametro.unidad;
      } else if (parametro.tipo_campo === "opciones") {
        unidadValor = "N.A";
        rango = parametro.opciones
          .map((opcion, index) => `${index + 1} ,`)
          .join("");

        logicaFuncionamiento = parametro.opciones
          .map((opcion, index) => opcion.valor + "-" + opcion.nombre)
          .join(",");
        rango = "(" + rango.slice(0, -1);
        rango = rango + ")";
      } else {
        tipoCampoData = "Tipo de campo no reconocido";
      }

      return {
        id: parametro.id_parametro,
        valor: parametro.valor,
        descripcion: parametro.descripcion || "",
        tipo_parameto: parametro.tipo_parametro || "",
        tipo_campo: parametro.tipo_campo || "",
        rango: rango,
      };
    });
  }
  return (
    <Grid container spacing={1}>
      {plantilla == null ? ( // Agrega el loader condicionalmente
        <Grid item xs={12} align="center">
          <CircularProgress size={50} />
        </Grid>
      ) : (
        <Grid container spacing={1}>
          <Grid item xs={12}>
            {plantilla.parametrosGenerales.length > 0 && (
              <Grid xs={12} spacing={1}>
                <Typography variant="subtitle1" fontWeight={300}>Parametros Generales</Typography>
                <DataGrid
                  rows={transformarDatos(plantilla.parametrosGenerales)}
                  columns={columns}
                  initialState={{
                    pagination: {
                      paginationModel: {
                        pageSize: 10,
                      },
                    },
                  }}
                  pageSizeOptions={[10]}
                  checkGridSelection
                  disableRowSelectionOnClick
                  rowHeight={30}
                />
              </Grid>
            )}
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={0}>
              {plantilla.programaciones.map((programacion, index) => (
                <Grid key={index} xs={12} spacing={1}>
                  <Typography variant="subtitle1" fontWeight={300}>
                    Parámetros de programación {index + 1}
                  </Typography>
                  <DataGrid
                    rows={transformarDatos(programacion.parametros)}
                    columns={columns}
                    initialState={{
                      pagination: {
                        paginationModel: {
                          pageSize: 10,
                        },
                      },
                    }}
                    pageSizeOptions={[10]}
                    checkGridSelection
                    disableRowSelectionOnClick
                    rowHeight={30}
                  />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      )}
    </Grid>
  );
};

export default TablaContenido;
