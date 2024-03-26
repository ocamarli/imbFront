import React, { useState, useEffect, useCallback } from "react";
import { Button, Grid, Paper } from "@mui/material";
import Typography from "@mui/material/Typography";
import HeaderContent from "../HeaderContent";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import { DataGrid } from "@mui/x-data-grid";
import { obtenerFirmwares } from "../../api/axios.js";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Home from "../Home/Home.jsx"
import AgregarFirmware from "./AgregarFirmware.jsx";

function transformarDatos(firmwares) {
  console.log(firmwares);
  return firmwares.map((firmware) => {
    return {
      id: firmware.idFirmware || "",
      nombre: firmware.nombre || "",
      codigo: firmware.codigo || "",
    };
  });
}
const ListaFirmwares = (props) => {
  const { setSelectedComponent, auth, onResponse } = props;
  const [isLoading, setIsLoading] = useState(false);

  const [firmwares, setFirmwares] = useState([]);

  const fetchFirmwares = useCallback(async () => {
    try {

      setIsLoading(true);
      const tkn = JSON.parse(sessionStorage.getItem("ACCSSTKN"))?.access_token;
      console.log(tkn);
      if (tkn !== undefined) {
        const json = await obtenerFirmwares(tkn);
        console.log(json);
        setFirmwares(json.firmwares || []);
        onResponse(json);
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      onResponse({ status: false, msg: error });
      console.error(error);
    }
  }, [setIsLoading, setFirmwares, onResponse]);
  useEffect(() => {
    fetchFirmwares();
  }, [fetchFirmwares]);


  const manejarAgregarPlantilla = () => {
    setSelectedComponent(<AgregarFirmware auth={auth}></AgregarFirmware>);
  };



  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "nombre", headerName: "Nombre", width: 150 },
    { field: "codigo", headerName: "Código", width: 150 },

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
                <div style={{ height: 400, width: "100%" }}>
                  <DataGrid
                    /*rows={activeTab === "activas" ? dataActivas : dataObsoletas}*/
                    rows={transformarDatos(firmwares)}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5, 10, 20]}
                  />
                </div>
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

export default ListaFirmwares;
