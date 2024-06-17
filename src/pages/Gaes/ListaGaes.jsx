import React, { useEffect} from "react";
import { Button, Grid, Paper, Typography, IconButton } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Add as AddIcon, ArrowBack as ArrowBackIcon, DeleteOutline as DeleteIcon, Edit as EditIcon } from "@mui/icons-material";
import HeaderContent from "../HeaderContent";
import AgregarGae from "./AgregarGae";
import EditarGae from "./EditarGae";
import ModalGenerico from "../../components/ModalGenerico";
import { useGaeService } from "../../hooks/useGaeServices";
import Home from "../Home/Home";
function transformarDatos(gaes) {
  return gaes.map((gae,index) => {
    return {
      id: index+1 || "",
      idGaeInterno:gae.idGaeInterno,
      idGae:gae.idGae || "",
      nombre: gae.nombre || "",
      codigo: gae.codigo || "",
    };
  });
}
const ListaGaes = (props) => {
  const { setSelectedComponent, auth, onResponse } = props;
  const { gaes, isLoading, fetchGaes, handleDeshabilitarGae, cerrarModalOk, cerrarModalConfirmacion,
       estaActivoModalOk,respuestaModalOk,estaActivoModalConfirmacion,respuestaModalConfirmacion } = useGaeService(onResponse);  

  const handleEditarGae = (idGae) => {
    setSelectedComponent(
      <EditarGae
        idGae={idGae}
        setSelectedComponent={setSelectedComponent}
        auth={auth}
      ></EditarGae>
    );
  };

  useEffect(() => {
    fetchGaes();
  }, [fetchGaes]);
  const manejarAgregarPlantilla = () => {
    setSelectedComponent(<AgregarGae setSelectedComponent={setSelectedComponent} auth={auth}></AgregarGae>);
  };

  const columns = [
    { field: "id", headerName: "ID" },
    { field: "idGaeInterno", headerName:"ID GAE"},
    { field: "nombre", headerName: "Nombre" },
    { field: "codigo", headerName: "Código"},
    {
      field: "editar",
      headerName: "Editar",
      sortable: false,
      width: 90,
      renderCell: (params) => (
        <IconButton onClick={() => handleEditarGae(params.row.idGae)}>
          <EditIcon />
        </IconButton>
      ),
    },
    {
      field: "eliminar",
      headerName: "Deshabilitar",
      sortable: false,
      width: 110,
      renderCell: (params) => (
        <IconButton onClick={() => handleDeshabilitarGae(params.row.idGae)}>
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
                  onClick={()=>{manejarAgregarPlantilla()}}
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
