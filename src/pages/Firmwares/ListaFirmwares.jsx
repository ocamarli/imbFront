import React, { useState, useEffect, useCallback } from "react";
import { Button, Grid, Paper } from "@mui/material";
import Typography from "@mui/material/Typography";
import HeaderContent from "../HeaderContent";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import { DataGrid } from "@mui/x-data-grid";
import { obtenerFirmwares } from "../../api/firmwaresApi.jsx";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Home from "../Home/Home.jsx";
import AgregarFirmware from "./AgregarFirmware.jsx";
import EditarFirmware from "./EditarFirmware.jsx";
import { useFirmwareService } from "../../hooks/useFirmwareService.jsx";
import { DeleteOutline as DeleteIcon, Edit as EditIcon } from "@mui/icons-material";

function transformarDatos(firmwares) {
  console.log(firmwares);
  return firmwares.map((firmware,index) => {
    return {
      id: index+1 || "",
      nombre: firmware.nombre || "",
      codigo: firmware.codigo || "",
    };
  });
}
const ListaFirmwares = (props) => {
  const { setSelectedComponent, auth, onResponse } = props;
  const { firmwares, isLoading, fetchFirmwares, handleEliminarFirmware } = useFirmwareService(onResponse);  

const handleEditar = (idFirmware) => {
  setSelectedComponent(
    <EditarFirmware
      idFirmware={idFirmware}
      setSelectedComponent={setSelectedComponent}
      auth={auth}
    ></EditarFirmware>
  );
  console.log(`Editar firmware con ID ${idFirmware}`);
};


  useEffect(() => {
    fetchFirmwares();
  }, [fetchFirmwares]);

  const manejarAgregarPlantilla = () => {
    setSelectedComponent(<AgregarFirmware setSelectedComponent={setSelectedComponent} auth={auth}></AgregarFirmware>);
  };


  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "nombre", headerName: "Nombre", width: 150 },
    { field: "codigo", headerName: "Código", width: 150 },
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
        <IconButton onClick={() => handleEliminarFirmware(params.row.id)}>
          <DeleteIcon />
        </IconButton>
      ),
    },
  ];

  return (
    <Grid container padding={2}>
      {!isLoading ? (
        <Grid item xs={12}>
          <HeaderContent titulo="Lista de firmwares"></HeaderContent>
          <Paper style={{ padding: 20 }}>
            <Grid container spacing={3}>
              <Grid
                item
                xs={8}
                sx={{ display: "flex", justifyContent: "left" }}
              ></Grid>

              <Grid
                item
                xs={4}
                sx={{
                  display: "flex",
                  justifyContent: "right",
                  alignItems: "center",
                }}
              >
                <Typography variant="h6">Agregar firmware</Typography>
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
                  rows={transformarDatos(firmwares)}
                  columns={columns}
                  pageSize={5}
                  rowsPerPageOptions={[5, 10, 20]}
                />
              </Grid>
            </Grid>
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
      ) : (
        <></>
      )}
    </Grid>
  );
};

export default ListaFirmwares;
