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

import { obtenerPlantilla } from "../../../api/axios";
import { actualizarParametroPlantilla } from "../../../api/axios";
const TablaContenido = (props) => {
  const { idPlantilla,checkboxSeleccionados } = props;


  const [plantilla, setPlantilla] = useState(null);
  const handleSelectChange = (e, id_plantilla, id_parametro) => {
    const valor = e.target.value;
    // Llamar a la función actualizarParametroPlantilla() aquí
    fetchActualizarParametroPlantilla(id_plantilla, id_parametro, valor);
  };
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
  }, [idPlantilla, setPlantilla]);
  const fetchActualizarParametroPlantilla = useCallback(async (id_plantilla, id_parametro, valor) => {
    try {
      const tkn = JSON.parse(sessionStorage.getItem("ACCSSTKN"))?.access_token;
      console.log(tkn);
      if (tkn !== undefined) {
        console.log("actualizarParametro");
        console.log(idPlantilla);
        const json = await actualizarParametroPlantilla(tkn, idPlantilla);
        console.log(json);
        setPlantilla(json.plantilla || null);
      } else {
        setPlantilla(null);
      }
    } catch (error) {
      console.error(error);
    }
  }, [idPlantilla, setPlantilla]);


  useEffect(() => {
    fetchObtenerPlantilla();
  }, [fetchObtenerPlantilla]);
  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    {
      field: "valor",
      headerName: "VALOR",
      flex: 1,
      editable: true,
      renderCell: (params) => {
        if (params.row.tipo_campo === "opciones") {
          return (
            <FormControl variant="outlined" size="small" fullWidth>
              <Select
                value={""}
                onChange={(e) =>
                  handleSelectChange(e, params.row.id_plantilla, params.row.id_parametro)
                }
              >
                      {params.row.opciones.map((opcion) => (
                        <MenuItem key={opcion.valor} value={opcion.valor}>
                          {opcion.nombre}
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
      headerName: "RANGO",
      flex: 1,
    },
    {
      field: "descripcion",
      headerName: "DESCRIPCIÓN",
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
        tipoParametro: parametro.tipoParametro || "",
        unidad:parametro.unidad ||"",
        valor_min:parametro.valor_min || "",
        valor_max:parametro.valor_max || "",
        opciones:parametro.opciones || [],
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
                <Typography variant="body1" fontWeight={600}>
                  Parámetros Generales
                </Typography>
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
              {plantilla.programaciones
                .filter((programacion) =>
                  checkboxSeleccionados.includes(programacion.noProgramacion)
                )
                .map((programacion, index) => (
                  <Grid key={index} xs={12} spacing={1}>
                    <Typography variant="body1" fontWeight={600}>
                      Parámetros de programación {programacion.noProgramacion}
                    </Typography>
                    <DataGrid
                      key={index}
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
