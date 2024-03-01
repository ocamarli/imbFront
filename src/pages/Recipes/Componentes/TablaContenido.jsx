import {TextField,  FormControl,  Grid, CircularProgress,  Select,  MenuItem} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useState, useEffect, useCallback } from "react";
import { obtenerParametros } from "../../../api/axios";
const TablaContenido = (props) => {
  const [parametros, setParametros] = useState([]);

  const { onResponse} = props;
  const [isLoading, setIsLoading] = useState(false);
  const fetchparametros = useCallback(async () => {
    try {
      setIsLoading(true);
      const tkn = JSON.parse(sessionStorage.getItem("ACCSSTKN"))?.access_token;
      console.log(tkn);
      if (tkn !== undefined) {
        const json = await obtenerParametros(tkn);
        console.log(json);
        setParametros(json.parameters || []);
        onResponse(json);
        setIsLoading(false);
      } else {
        setParametros([]);
        onResponse({ status: false, msg: "Unauthorized Access" });
      }
    } catch (error) {
      setIsLoading(false);
      onResponse({ status: false, msg: error });
      console.error(error);
    }
  }, [setIsLoading, setParametros, onResponse]);

  useEffect(() => {
    fetchparametros();
  }, [fetchparametros]);

  const columns = [
    { field: "id", headerName: "ID", flex: 0.4 },
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
                value={params.value}
                onChange={(e) => params.setValue(e.target.value)}
                fullWidth
              >
                <MenuItem value={"Familia 1"}>Familia 1</MenuItem>
                <MenuItem value={"Familia 1"}>Familia 2</MenuItem>
              </Select>
            </FormControl>
          );
        } else {
          return (
            <TextField
              value={params.value}
              onChange={(e) => params.setValue(e.target.value)}
              fullWidth
            />
          );
        }
      },
    },
    {
      field: "rango",
      headerName: "Rango",
      flex: 0.7,
      editable: true,
    },
    ,
    {
      field: "descripcion",
      headerName: "Descripción",
      flex: 2,
      editable: true,
    },
  ];
  function transformarDatos(parametros) {
    console.log(parametros);
    return parametros.map((parametro) => {
      let unidadValor;
      let rango;
      let logicaFuncionamiento;
      if (parametro.tipo_campo === "rango") {
        unidadValor = parametro.unidad;
        rango = `${parametro.valor_min}${parametro.unidad} - ${parametro.valor_max}${parametro.unidad}`;
      } else if (parametro.tipo_campo === "opciones") {
        unidadValor = "N.A";
        rango = parametro.opciones
          .map((opcion, index) => `${index + 1} |`)
          .join(" ");
        rango = "| " + `${rango}`;
        logicaFuncionamiento = parametro.opciones
          .map((opcion, index) => `${opcion.valor}-${opcion.nombre}`)
          .join(", ");
      } else {
        tipoCampoData = "Tipo de campo no reconocido";
      }
  
      return {
        id: parametro.id_parametro,
        descripcion: parametro.descripcion || "",
        tipo_parameto: parametro.tipo_parametro || "",
        tipo_campo: parametro.tipo_campo || "",
        rango: rango,
        unidad: unidadValor,
        grupo: parametro.grupo || "",
        logicaFuncionamiento: logicaFuncionamiento,
      };
    });
  }
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Grid container spacing={1} direction="row" justifyContent="flex-start">
          {isLoading && ( // Agrega el loader condicionalmente
            <Grid item xs={12} align="center">
              <CircularProgress size={50} />
            </Grid>
          )}
          {parametros.length > 0 && (
            <Grid xs={12} spacing={1}>
              <DataGrid
                rows={transformarDatos(parametros)}
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
      </Grid>    </Grid>
  );
};

export default TablaContenido;