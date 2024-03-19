import React, { useState, useEffect, useCallback } from "react";
import { Button, Grid, Paper } from "@mui/material";
import Typography from "@mui/material/Typography";
import HeaderContent from "../HeaderContent";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/ModeEdit";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import LockIcon from "@mui/icons-material/Lock";
import AddIcon from "@mui/icons-material/Add";
import AgregarPlantilla from "./AgregarPlantilla";
import { DataGrid } from "@mui/x-data-grid";
import { obtenerPlantillas } from "../../api/axios";
import ModalClonarPlantilla from "./Componentes/ModalClonarPlantila.jsx";
import EditarPlantilla from "./EditarPlantilla.jsx";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Home from "../Home/Home.jsx"
function transformarDatos(plantillas) {
  console.log(plantillas);
  return plantillas.map((plantilla, index) => {
    return {
      id: index + 1 || "",
      nombrePlantilla: plantilla.nombrePlantilla || "",
      firmware: plantilla.firmware || "",
      hardware: plantilla.hardware || "",
      creadoPor: plantilla.creadoPor || "",
      _id: plantilla._id || "",
    };
  });
}
const ListaPlantillas = (props) => {
  const { setSelectedComponent, auth, onResponse } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("activas"); // Estado para controlar la pestaña activa
  const [plantillas, setPlantillas] = useState([]);
  const [modalActiva, setModalActiva] = useState(false);
  const [plantillaAClonar, setPlantillaAClonar] = useState(false);
  const [respuesta, setRespuesta] = useState({
    status: true,
    msg: "Operación exitosa",
  });
  const manejarAbrirModal = (nombrePlantilla) => {};

  const manejarCerrarModal = () => {
    setModalActiva(false);
  };

  const fetchPlantillas = useCallback(async () => {
    try {
      setIsLoading(true);
      const tkn = JSON.parse(sessionStorage.getItem("ACCSSTKN"))?.access_token;
      if (tkn !== undefined) {
        const json = await obtenerPlantillas(tkn);
        console.log(json);
        setPlantillas(json.plantillas || []);
        setRespuesta(json);
        onResponse(json);
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      onResponse({ status: false, msg: error });
      console.error(error);
    }
  }, [setIsLoading, setPlantillas, onResponse]);
  useEffect(() => {
    fetchPlantillas();
  }, [fetchPlantillas]);
  const manejarEditar = (id) => {
    setSelectedComponent(
      <EditarPlantilla
        idPlantilla={id}
        setSelectedComponent={setSelectedComponent}
        onResponse={onResponse}
        auth={auth}
      ></EditarPlantilla>
    );
    console.log("Editar plantilla con ID:", id);
  };

  const manejarBloquear = (id) => {
    manejarAbrirModal();
  };

  const manejarClonar = (nombrePlantilla) => {
    console.log(nombrePlantilla);
    setPlantillaAClonar(nombrePlantilla);
    setModalActiva(true);
  };

  const manejarBorrar = (id) => {
    console.log("Eliminar plantilla con ID:", id);
  };
  const manejarAgregarPlantilla = () => {
    setSelectedComponent(
      <AgregarPlantilla
        setSelectedComponent={setSelectedComponent}
        auth={auth}
      ></AgregarPlantilla>
    );
  };

  const manejarTabChange = (tab) => {
    setActiveTab(tab);
  };

  const columns = [
    { field: "id", headerName: "ID" },
    { field: "nombrePlantilla", headerName: "Nombre" },
    { field: "firmware", headerName: "Firmware" },
    { field: "hardware", headerName: "Hardware" },
    { field: "creadoPor", headerName: "Creado por" },

    {
      field: "clone",
      headerName: "Clonar",

      renderCell: (params) => (
        <IconButton onClick={() => manejarClonar(params.row.nombre_plantilla)}>
          <FileCopyIcon />
        </IconButton>
      ),
    },
    {
      field: "edit",
      headerName: "Editar",

      renderCell: (params) => (
        <IconButton onClick={() => manejarEditar(params.row._id)}>
          <EditIcon />
        </IconButton>
      ),
    },
    {
      field: "block",
      headerName: "Congelar",

      renderCell: (params) => (
        <IconButton onClick={() => manejarBloquear(params.row.id)}>
          <LockIcon />
        </IconButton>
      ),
    },
    {
      field: "delete",
      headerName: "Eliminar",

      renderCell: (params) => (
        <IconButton onClick={() => manejarBorrar(params.row.id)}>
          <DeleteIcon />
        </IconButton>
      ),
    },
  ];

  return (
    <Grid container padding={2}>
      {!isLoading ? (
        <Grid item xs={12}>
          <HeaderContent titulo="Lista de plantillas"></HeaderContent>
          <Paper style={{ padding: 20 }}>
            <Grid container spacing={3}>
              <Grid
                item
                xs={8}
                sx={{ display: "flex", justifyContent: "left" }}
              >
                <Button
                  variant={"contained"}
                  onClick={() => manejarTabChange("activas")}
                  style={{
                    backgroundColor:
                      activeTab === "activas" ? "green" : "#cccccc",
                    color: "white",
                    cursor: "pointer",
                  }}
                >
                  Plantillas Activas
                </Button>
                <Button
                  variant={"contained"}
                  onClick={() => manejarTabChange("obsoletas")}
                  style={{
                    backgroundColor:
                      activeTab === "obsoletas" ? "orange" : "#cccccc",
                    color: "white",
                    cursor: "pointer",
                  }}
                >
                  Plantillas Obsoletas
                </Button>
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
                  onClick={manejarAgregarPlantilla}
                >
                  <AddIcon />
                </IconButton>
              </Grid>

              <Grid item xs={12}>
                <div style={{ width: "100%" }}>
                  <DataGrid
                    /*rows={activeTab === "activas" ? dataActivas : dataObsoletas}*/
                    rows={transformarDatos(plantillas)}
                    columns={columns}
                    pageSize={50}
                    rowsPerPageOptions={[5, 10, 20]}
                  />
                </div>
              </Grid>
              <ModalClonarPlantilla
                plantillaAClonar={plantillaAClonar}
                activo={modalActiva}
                respuesta={respuesta}
                autoCierre={false}
                onClose={manejarCerrarModal}
              ></ModalClonarPlantilla>
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

export default ListaPlantillas;
