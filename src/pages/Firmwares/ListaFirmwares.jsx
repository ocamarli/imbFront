import React, { useEffect} from "react";
import { Button, Grid, Paper } from "@mui/material";
import Typography from "@mui/material/Typography";
import HeaderContent from "../HeaderContent";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import AgregarFirmware from "./AgregarFirmware.jsx";
import { DataGrid } from "@mui/x-data-grid";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Home from "../Home/Home.jsx"
import EditarFirmware from "./EditarFirmware.jsx";
import { DeleteOutline as DeleteIcon, Edit as EditIcon } from "@mui/icons-material";
import ModalGenerico from "../../components/ModalGenerico";
import { useFirmwareService } from "../../hooks/useFirmwareService.jsx";
function transformarDatos(firmwares) {
  console.log(firmwares);
  return firmwares.map((firmware,index) => {
    return {
      id: index+1 || "",
      idFirmware:firmware.idFirmware || "",
      idFirmwareInterno:firmware.idFirmwareInterno || "",
      nombre: firmware.nombre || "",
      descripcion: firmware.descripcion || "",
    };
  });
}
const ListaFirmwares = (props) => {
  const { setSelectedComponent, auth, onResponse } = props;
  const { firmwares, isLoading, fetchFirmwares, handleDeshabilitarFirmware, cerrarModalOk, cerrarModalConfirmacion,
     estaActivoModalOk,respuestaModalOk,estaActivoModalConfirmacion,respuestaModalConfirmacion } = useFirmwareService(onResponse); 
  const handleEditarFirmware = (idFirmware) => {
    setSelectedComponent(
      <EditarFirmware
        idFirmware={idFirmware}
        setSelectedComponent={setSelectedComponent}
        auth={auth}
      ></EditarFirmware>
    );
    console.log(`Editarfirmware con ID ${idFirmware}`);
  };

  useEffect(() => {
    fetchFirmwares();
  }, [fetchFirmwares]);

  const manejarAgregarFirmware = () => {
    setSelectedComponent(<AgregarFirmware setSelectedComponent={setSelectedComponent} auth={auth}></AgregarFirmware>);
  };

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "idFirmwareInterno", headerName: "ID Firmware", width: 90 },
    { field: "nombre", headerName: "Nombre", width: 350 },
    { field: "descripcion", headerName: "Descripcion", width: 150 },
    {
      field: "editar",
      headerName: "Editar",
      sortable: false,
      width: 90,
      renderCell: (params) => (
        <IconButton onClick={() => handleEditarFirmware(params.row.id)}>
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
        <IconButton onClick={() => handleDeshabilitarFirmware(params.row.idFirmware)}>
          <DeleteIcon />
        </IconButton>
      ),
    },
  ];

  return (
    <Grid container padding={2}>
      {!isLoading ? (
        <Grid item xs={12}>
          <ModalGenerico
            tipoModal={"correcto"}          
            open={estaActivoModalOk}
            onClose={cerrarModalOk}
            title="Correcto"
            message={respuestaModalOk.msg}
            autoCierre={true}
      />      
      {/* Modal Confirmación */}

      <ModalGenerico

            open={estaActivoModalConfirmacion}
            onClose={cerrarModalConfirmacion}
            title="Confirmación"
            message={respuestaModalConfirmacion.msg}
            actions={[
              { label: "Confirmar", handler: () => { cerrarModalConfirmacion(true); }, color: "primary" },
              { label: "Cancelar", handler: () => { cerrarModalConfirmacion(false); }, color: "error" },
            ]}
      />          
          <HeaderContent titulo="Lista de Firmwares"></HeaderContent>
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
                  onClick={manejarAgregarFirmware}
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
