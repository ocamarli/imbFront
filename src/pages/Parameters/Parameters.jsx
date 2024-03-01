import AddParameter from "./components/AddParameter";
import { Dialog, Typography,IconButton } from "@mui/material";
import React, { useState, useEffect, useCallback } from "react";
import store from "../../store";
import { Provider } from "react-redux";
import { obtenerParametros } from "../../api/axios";
import { Grid, Paper, CircularProgress } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import HeaderContent from "../HeaderContent";
import AddIcon from "@mui/icons-material/Add";
const columns = [
  { field: "id", headerName: "ID", flex: .4 },
  {
    field: "rango",
    headerName: "Rango",
    flex: .7,
    editable: true,
  },
  {
    field: "unidad",
    headerName: "Unidad",
    flex: .5,
    editable: true,
  },
  {
    field: "descripcion",
    headerName: "Descripción",
    flex: 2,
    editable: true,
  },
  {
    field: "logicaFuncionamiento",
    headerName: "Lógica de funcionamiento",
    flex: 2,
    editable: false, // Asumiendo que los datos generados no son editables
  },
  {
    field: "tipo_parameto",
    headerName: "Tipo de parámetro",
    flex: 1,
    editable: true,
  },
  {
    field: "grupo",
    headerName: "Grupo",
    flex: 1,
    editable: true,
  },  

];

function transformarDatos(parametros) {
  console.log(parametros);
  return parametros.map(parametro => {
    let tipoCampoData;
    let unidadValor
    let rango
    let logicaFuncionamiento
    if (parametro.tipo_campo === "rango") {
      unidadValor = parametro.unidad
      rango = parametro.valor_min + parametro.unidad + " - " + parametro.valor_max + parametro.unidad;
    } else if (parametro.tipo_campo === "opciones") {
      unidadValor = "N.A"
      rango =  parametro.opciones.map((opcion, index) => `${index + 1} |`).join(" ");
      rango = "| " + rango
      logicaFuncionamiento =  parametro.opciones.map((opcion, index) => `${opcion.valor}-${opcion.nombre}`).join(", ");
    } else {
      tipoCampoData = "Tipo de campo no reconocido";
      console.log(tipoCampoData)
    }

    return {
      id: parametro.id_parametro,
      descripcion: parametro.descripcion || "",
      tipo_parameto: parametro.tipo_parametro || "",
      rango:  rango,
      unidad: unidadValor,
      grupo: parametro.grupo || "",
      logicaFuncionamiento: logicaFuncionamiento
    };
  });
}
function Parameters(props) {
  
  const { onResponse } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false); // Define el estado "open" en el componente padre
  const [parametros, setParametros] = useState([]);

  const handleClickOpen = () => {
    setOpen(true);
  };

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

  const handleClose = useCallback(async () => {
    await fetchparametros();
    setOpen(false);
  }, [fetchparametros]);

  useEffect(() => {
    fetchparametros();
  }, [fetchparametros]);

  return (
    <Provider store={store}>
      <Grid container padding={2}>
        <Grid item xs={12}>
          <Dialog open={open} onClose={handleClose}>
            <AddParameter open={open} handleClose={handleClose}></AddParameter>
          </Dialog>
        </Grid>
        <Grid item xs={12}>
          <HeaderContent></HeaderContent>
          <Paper style={{ padding: 10 }}>
            <Grid container spacing={2}>
              <Grid
                item
                xs={12}
                sx={{
                  display: "flex",
                  justifyContent: "right",
                  alignItems: "center",
                }}
              >
                <Typography variant="h6">Agregar parametro nuevo</Typography>
                <IconButton
                  variant={"contained"}
                  sx={{
                    borderRadius: "50%",
                    backgroundColor: "green",
                    color: "white",
                    marginLeft: "10px",
                  }}
                  onClick={handleClickOpen}
                >
                  <AddIcon />
                </IconButton>
              </Grid>
              <Grid item xs={12}>
                <Grid
                  container
                  spacing={1}
                  direction="row"
                  justifyContent="flex-start"
                >
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
          </Paper>
        </Grid>
      </Grid>
    </Provider>
  );
}
export default Parameters;
