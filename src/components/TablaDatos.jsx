import React, { useEffect,useState, useCallback } from "react";
import { CircularProgress,  Grid } from "@mui/material";
import { obtenerParametros } from "../api/axios";
import { DataGrid } from "@mui/x-data-grid";
function transformarDatos(parametros) {
  console.log(parametros);
  return parametros.map((parametro) => {
    let tipoCampoData;
    let unidadValor;
    let rango;
    let logicaFuncionamiento;
    if (parametro.tipo_campo === "rango") {
      unidadValor = parametro.unidad;
      rango =
        parametro.valor_min +
        parametro.unidad +
        " - " +
        parametro.valor_max +
        parametro.unidad;
    } else if (parametro.tipo_campo === "opciones") {
      unidadValor = "N.A";
      rango = parametro.opciones
        .map((opcion, index) => `${index + 1} |`)
        .join(" ");
      rango = "| " + rango;
      logicaFuncionamiento = parametro.opciones
        .map((opcion, index) => `${opcion.valor}-${opcion.nombre}`)
        .join(", ");
    } else {
      tipoCampoData = "Tipo de campo no reconocido";
      console.log(tipoCampoData);
    }

    return {
      id: parametro.id_parametro,
      descripcion: parametro.descripcion || "",
      tipo_parameto: parametro.tipo_parametro || "",
      rango: rango,
      unidad: unidadValor,
      grupo: parametro.grupo || "",
      logicaFuncionamiento: logicaFuncionamiento,
    };
  });
}
const columns = [
  { field: "id", headerName: "ID", flex: 0.4 },
  {
    field: "rango",
    headerName: "Rango",
    flex: 0.7,
    editable: true,
  },

  {
    field: "descripcion",
    headerName: "Descripción",
    flex: 2,
    editable: true,
  },
];

const TablaDatos = (props) => {
  const { onResponse} = props;
  const [isLoading, setIsLoading] = useState(false);
  const [parametros, setParametros] = useState([]);
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
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
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
                  />
                </Grid>
              )}
            </Grid>
          </Grid>
      </Grid>
    </Grid>
  );
};

export default TablaDatos;
