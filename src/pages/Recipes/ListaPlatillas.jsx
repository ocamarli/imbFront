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
function transformarDatos(plantillas) {
  console.log(plantillas);
  return plantillas.map((plantilla) => {
    return {
      id: plantilla.id_plantilla || "",
      nombre_plantilla: plantilla.nombre_plantilla || "",
      familia: plantilla.familia || "",
      hardware: plantilla.hardware || "",
    };
  });
}
const ListaPlantillas = (props) => {
  const { setSelectedComponent, auth, onResponse } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("activas"); // Estado para controlar la pestaña activa
  const [plantillas, setPlantillas] = useState([]);
  const [modalActiva, setModalActiva] = useState(false);
  const [respuesta, setRespuesta] = useState({
    status: true,
    msg: "Operación exitosa",
  });
  const manejarAbrirModal = () => {
    setModalActiva(true);
  };

  const manejarCerrarModal = () => {
    setModalActiva(false);
  };

  const fetchPlantillas = useCallback(async () => {
    try {

      setIsLoading(true);
      const tkn = JSON.parse(sessionStorage.getItem("ACCSSTKN"))?.access_token;
      console.log(tkn);
      if (tkn !== undefined) {
        const json = await obtenerPlantillas(tkn);
        console.log(json);
        setPlantillas(json.plantillas || []);
        setRespuesta(json)
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
    console.log("Editar plantilla con ID:", id);
  };

  const manejarBloquear = (id) => {
    manejarAbrirModal()
  };

  const manejarClonar = (id) => {
    manejarAbrirModal()
  };

  const manejarBorrar = (id) => {
    console.log("Eliminar plantilla con ID:", id);
  };
  const manejarAgregarPlantilla = () => {
    setSelectedComponent(<AgregarPlantilla auth={auth}></AgregarPlantilla>);
  };

  const manejarTabChange = (tab) => {
    setActiveTab(tab);
  };

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "familia", headerName: "Familia", width: 150 },
    { field: "hardware", headerName: "Hardware", width: 150 },
    { field: "nombre_plantilla", headerName: "Nombre", width: 150 },
    {
      field: "clone",
      headerName: "Clonar",
      width: 100,
      renderCell: (params) => (
        <IconButton onClick={() => manejarClonar(params.row.id)}>
          <FileCopyIcon />
        </IconButton>
      ),
    },
    {
      field: "edit",
      headerName: "Editar",
      width: 100,
      renderCell: (params) => (
        <IconButton onClick={() => manejarEditar(params.row.id)}>
          <EditIcon />
        </IconButton>
      ),
    },
    {
      field: "block",
      headerName: "Bloquear",
      width: 100,
      renderCell: (params) => (
        <IconButton onClick={() => manejarBloquear(params.row.id)}>
          <LockIcon />
        </IconButton>
      ),
    },
    {
      field: "delete",
      headerName: "Eliminar",
      width: 100,
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
                <div style={{ height: 400, width: "100%" }}>
                  <DataGrid
                    /*rows={activeTab === "activas" ? dataActivas : dataObsoletas}*/
                    rows={transformarDatos(plantillas)}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5, 10, 20]}
                  />
                </div>
              </Grid>
              <ModalClonarPlantilla
            activo={modalActiva}
            respuesta={respuesta}
            autoCierre={false}
            onClose={manejarCerrarModal}
          ></ModalClonarPlantilla>
            </Grid>
          </Paper>
        </Grid>
      ) : (
        <></>
      )}
    </Grid>
  );
};

export default ListaPlantillas;
