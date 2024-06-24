import React, { useEffect } from "react";
import { Button, Grid, Paper, IconButton, Typography,Tab,Tabs } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Add as AddIcon, ArrowBack as ArrowBackIcon, DeleteOutline as DeleteIcon, Edit as EditIcon, FileCopy as FileCopyIcon, Lock as LockIcon } from "@mui/icons-material";
import HeaderContent from "../HeaderContent";
import { usePlantillaService } from "../../hooks/usePlantillaService";
import AgregarPlantilla from "./AgregarPlantilla";
import EditarPlantilla from "./EditarPlantilla";
import ModalClonarPlantilla from "./Componentes/ModalClonarPlantila";
import ModalGenerico from "../../components/ModalGenerico";
import Home from "../Home/Home";
import LoadingComponent from "../LoadingComponent";
import UsuarioAutorizado from "../../components/UsuarioAutorizado";

function transformarDatos(plantillas) {
  console.log(plantillas);
  return plantillas.map((plantilla, index) => {
    return {
      id: index + 1 || "",
      nombrePlantilla: plantilla.nombrePlantilla || "",
      plantilla: plantilla.plantilla || "",
      hardware: plantilla.hardware || "",
      creadoPor: plantilla.creadoPor || "",
      idPlantilla: plantilla.idPlantilla || "",
    };
  });
}
const ListaPlantillas = ( { setSelectedComponent, auth, onResponse }) => {
  const {
    activeTab,
    handleTabChange,
    plantillas,
    isLoading,
    fetchPlantillas,
    handleDeshabilitarPlantilla,
    handleClonarPlantilla,
    handleCongelarPlantilla,
    cerrarModalOk,
    estaActivoModalOk,
    respuestaModalOk,
    setRespuestaModalOk,
    estaActivoModalConfirmacionHabilitar,
    respuestaModalConfirmacionHabilitar,
    cerrarModalConfirmacionHabilitar,
    estaActivoModalConfirmacionDeshabilitar,
    respuestaModalConfirmacionDeshabilitar,
    cerrarModalConfirmacionDeshabilitar,
    plantillaAClonar,
    estaActivoModalClonar,
    setEstaActivoModalClonar,
    setEstaActivoModalOk
  } = usePlantillaService(onResponse);  


  const manejarCerrarModal = () => {
    setEstaActivoModalClonar(false);
  };


  useEffect(() => {
    fetchPlantillas(true);
  }, [fetchPlantillas]);
  const handleEditarPlantilla = (idPlantilla) => {
    setSelectedComponent(
      <EditarPlantilla
        idPlantilla={idPlantilla}
        setSelectedComponent={setSelectedComponent}
        auth={auth}
        onResponse={onResponse}
      ></EditarPlantilla>
    );
    console.log("Editar plantilla con ID:", idPlantilla);
  };

  const handeleAgregarPlantilla = () => {
    setSelectedComponent(
      <AgregarPlantilla
        setSelectedComponent={setSelectedComponent}
        auth={auth}
      ></AgregarPlantilla>
    );
  };


  const columns = [
    { field: "id", headerName: "ID" },
    { field: "nombrePlantilla", headerName: "Nombre" },
    { field: "plantilla", headerName: "Firmware" },
    { field: "hardware", headerName: "Hardware" },
    { field: "creadoPor", headerName: "Creado por" },

    {
      field: "clonar",
      headerName: "Clonar",

      renderCell: (params) => (
        <IconButton onClick={() => handleClonarPlantilla(params.row.idPlantilla)}>
          <FileCopyIcon />
        </IconButton>
      ),
    },
    {
      field: "editar",
      headerName: "Editar",

      renderCell: (params) => (
        <IconButton onClick={() => handleEditarPlantilla(params.row.idPlantilla)}>
          <EditIcon />
        </IconButton>
      ),
    },
    {
      field: "congelar",
      headerName: "Congelar",

      renderCell: (params) => (
        <IconButton onClick={() => handleCongelarPlantilla(params.row.idPlantilla)}>
          <LockIcon />
        </IconButton>
      ),
    },
    {
      field: "eliminar",
      headerName: "Deshabilitar",

      renderCell: (params) => (
        <IconButton onClick={() => handleDeshabilitarPlantilla(params.row.idPlantilla)}>
          <DeleteIcon />
        </IconButton>
      ),
    },
  ];
  const renderModals = () => (
    <>
      <ModalGenerico
        tipoModal={respuestaModalOk.status}
        open={estaActivoModalOk}
        onClose={cerrarModalOk}
        title={respuestaModalOk.status ? "Correcto" : "Advertencia"}
        message={respuestaModalOk.msg}
        autoCierre={true}
      />
      <ModalGenerico
        open={estaActivoModalConfirmacionHabilitar}
        onClose={cerrarModalConfirmacionHabilitar}
        title="Confirmación"
        message={respuestaModalConfirmacionHabilitar.msg}
        actions={[
          { label: "Confirmar", handler: () => cerrarModalConfirmacionHabilitar(true), color: "primary" },
          { label: "Cancelar", handler: () => cerrarModalConfirmacionHabilitar(false), color: "error" },
        ]}
      />
      <ModalGenerico
        open={estaActivoModalConfirmacionDeshabilitar}
        onClose={cerrarModalConfirmacionDeshabilitar}
        title="Confirmación"
        message={respuestaModalConfirmacionDeshabilitar.msg}
        actions={[
          { label: "Confirmar", handler: () => cerrarModalConfirmacionDeshabilitar(true), color: "primary" },
          { label: "Cancelar", handler: () => cerrarModalConfirmacionDeshabilitar(false), color: "error" },
        ]}
      />
      <ModalClonarPlantilla
        plantillaAClonar={plantillaAClonar}
        setSelectedComponent={setSelectedComponent}
        auth={auth}
        activo={estaActivoModalClonar}
        autoCierre={false}
        onClose={manejarCerrarModal}
        onResponse={onResponse}
        setEstaActivoModalOk={setEstaActivoModalOk}
        setRespuestaModalOk={setRespuestaModalOk}
      />      
    </>
  );
  if (isLoading) {
    return <LoadingComponent />;
  }
  return (
    <Grid container padding={2}>
        <Grid item xs={12}>
          {renderModals()}
          <HeaderContent titulo="Lista de plantillas"></HeaderContent>
          <Paper style={{ padding: 20 }}>
            <Grid container spacing={3}>
              <Grid
                item
                xs={8}
                sx={{ display: "flex", justifyContent: "left" }}
              >
              <UsuarioAutorizado usuario={auth} permisosRequeridos={["superusuario"]}>
                <Tabs value={activeTab} onChange={handleTabChange}>
                  <Tab label="Activos" value={1} />
                  <Tab label="Deshabilitados" value={0} />
                </Tabs>
              </UsuarioAutorizado>                
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
                <Typography variant="h6">Agregar una plantilla</Typography>
                <IconButton
                  variant={"contained"}
                  sx={{
                    borderRadius: "50%",
                    backgroundColor: "green",
                    color: "white",
                    marginLeft: "10px",
                  }}
                  onClick={handeleAgregarPlantilla}
                >
                  <AddIcon />
                </IconButton>
              </Grid>

              <Grid item xs={12}>
                <DataGrid
                  /*rows={activeTab === "activas" ? dataActivas : dataObsoletas}*/
                  sx={{ maxHeight: "calc(100vh - 330px)", width: "100%" }}
                  rows={transformarDatos(plantillas)}
                  columns={columns}
                  pageSize={50}
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

    </Grid>
  );
};

export default ListaPlantillas;
