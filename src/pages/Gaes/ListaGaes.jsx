import React, { useState, useEffect, useCallback } from "react";
import { Button, Grid, Paper } from "@mui/material";
import Typography from "@mui/material/Typography";
import HeaderContent from "../HeaderContent";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import AgregarGae from "./AgregarGae.jsx";
import { DataGrid } from "@mui/x-data-grid";
import { obtenerGaes } from "../../api/gaesApi.jsx";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Home from "../Home/Home.jsx"
import EditarGae from "./EditarGae.jsx";
import { DeleteOutline as DeleteIcon, Edit as EditIcon } from "@mui/icons-material";
function transformarDatos(gaes) {
  console.log(gaes);
  return gaes.map((gae,index) => {
    return {
      id: index+1 || "",
      nombre: gae.nombre || "",
      descripcion: gae.descripcion || "",
    };
  });
}
const ListaGaes = (props) => {
  const { setSelectedComponent, auth, onResponse } = props;
  const [isLoading, setIsLoading] = useState(false);

  const [gaes, setGaes] = useState([]);
  const handleEditar = (idFirmware) => {
    setSelectedComponent(
      <EditarGae
        idFirmware={idFirmware}
        setSelectedComponent={setSelectedComponent}
        auth={auth}
      ></EditarGae>
    );
    console.log(`Editar firmware con ID ${idFirmware}`);
  };
  
  const handleEliminar = (id) => {
    // Aquí puedes realizar la lógica para eliminar el firmware con el ID proporcionado
    console.log(`Eliminar firmware con ID ${id}`);
  };
  const fetchGaes = useCallback(async () => {
    try {

      setIsLoading(true);
      const tkn = JSON.parse(sessionStorage.getItem("ACCSSTKN"))?.access_token;
      console.log(tkn);
      if (tkn !== undefined) {
        const json = await obtenerGaes(tkn);
        console.log(json);
        setGaes(json.gaes || []);
        onResponse(json);
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      onResponse({ status: false, msg: error });
      console.error(error);
    }
  }, [setIsLoading, setGaes, onResponse]);
  useEffect(() => {
    fetchGaes();
  }, [fetchGaes]);


  const manejarAgregarPlantilla = () => {
    setSelectedComponent(<AgregarGae setSelectedComponent={setSelectedComponent} auth={auth}></AgregarGae>);
  };



  const columns = [
    { field: "id", headerName: "ID" },
    { field: "nombre", headerName: "Nombre" },
    { field: "descripcion", headerName: "Descripción"},
    {
      field: "editar",
      headerName: "Editar",
      sortable: false,
      width: 90,
      renderCell: (params) => (
        <IconButton onClick={() => handleEditar(params.row.id)}>
          <EditIcon />
        </IconButton>
      ),
    },
    {
      field: "eliminar",
      headerName: "Eliminar",
      sortable: false,
      width: 110,
      renderCell: (params) => (
        <IconButton onClick={() => handleEliminar(params.row.id)}>
          <DeleteIcon />
        </IconButton>
      ),
    },

  ];

  return (
    <Grid container padding={2}>
      {!isLoading ? (
        <Grid item xs={12}>
          <HeaderContent titulo="Lista de GAEs"></HeaderContent>
          <Paper style={{ padding: 20 }}>
            <Grid container spacing={3}>
              <Grid
                item
                xs={8}
                sx={{ display: "flex", justifyContent: "left" }}
              >
              </Grid>

              <Grid
                item
                xs={4}
                sx={{
                  display: "flex",
                  justifyContent: "right",
                  alignItems: "center",
                }}
              >
                <Typography variant="h6">Agregar código GAE</Typography>
                <IconButton
                  variant={"contained"}
                  sx={{
                    borderRadius: "50%",
                    backgroundColor: "green",
                    color: "white",
                    marginLeft: "10px",
                  }}
                  onClick={manejarAgregarPlantilla}
                >
                  <AddIcon />
                </IconButton>
              </Grid>

              <Grid item xs={12}>
               
                  <DataGrid
                    /*rows={activeTab === "activas" ? dataActivas : dataObsoletas}*/
                    sx={{ maxHeight: "calc(100vh - 330px)", width: "100%" }}
                    rows={transformarDatos(gaes)}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5, 10, 20]}
                  />
               
              </Grid>

            </Grid>
            <Button sx={{mt:5}}
      variant="contained"
      color="success" 
      onClick={() => setSelectedComponent(<Home></Home>)}
      startIcon={<ArrowBackIcon />} 
    >
      Salir
    </Button>
          </Paper>
        </Grid>
      ) : (
        <></>
      )}
    </Grid>
  );
};

export default ListaGaes;
