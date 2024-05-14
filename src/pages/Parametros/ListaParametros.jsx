import AddParameter from "./components/AddParameter";
import { Dialog, Typography,IconButton } from "@mui/material";
import React, { useState, useEffect, useCallback } from "react";
import store from "../../store";
import { Provider } from "react-redux";
import { obtenerParametros } from "../../api/parametrosApi.jsx";
import { Grid, Paper, CircularProgress,Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import HeaderContent from "../HeaderContent";
import AddIcon from "@mui/icons-material/Add";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Home from "../Home/Home.jsx"
const columns = [
  { field: "id", headerName: "ID", flex: .4 },
  { field: "rango", headerName: "RANGO", flex: .7, editable: true },
  { field: "unidad", headerName: "UNIDAD", flex: .5, editable: true },
  { field: "descripcion", headerName: "DESCRIPCIÓN", flex: 2, editable: true},
  { field: "logicaFuncionamiento", headerName: "LÓGICA DE FUNCIONAMIENTO", flex: 2,   editable: false},
  { field: "tipoParameto", headerName: "TIPO DE PARÁMETRO", flex: 1, editable: true},
  { field: "grupo", headerName: "GRUPO", flex: 1, editable: true},  

];

function transformarDatos(parametros) {
  console.log(parametros);
  return parametros.map((parametro) => {
    let tipoCampoData = "";
    let unidadValor = "";
    let rango;
    let logicaFuncionamiento = "";
    console.log(logicaFuncionamiento, tipoCampoData, unidadValor);
    if (parametro.tipoCampo === "rango") {
      unidadValor = parametro.unidad;
      rango =
        parametro.valor_min +
        "" +
        parametro.unidad +
        "-" +
        parametro.valor_max +
        parametro.unidad;
    } else if (parametro.tipoCampo === "opciones") {
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
      id: parametro.idParametro,
      valor: parametro.valor,
      descripcion: parametro.descripcion || "",
      tipoParameto: parametro.tipoParametro || "",
      tipoCampo: parametro.tipoCampo || "",
      logicaFuncionamiento: logicaFuncionamiento || "",
      rango: rango,
    };
  });
}
function ListaParametros(props) {
  
  const {setSelectedComponent, onResponse } = props;
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
        setParametros(json.parametros || []);
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
          <HeaderContent titulo="Lista de parámetros"></HeaderContent>
          <Paper style={{ padding: 20 }}>
            <Grid container spacing={3}>
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
                        sx={{ maxHeight: "calc(100vh - 330px)", width: "100%" }}
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
            <Button sx={{mt:2}}
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

    </Provider>
  );
}
export default ListaParametros;
