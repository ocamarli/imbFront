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
import AgregarGae from "./AgregarGae.jsx";
import { DataGrid } from "@mui/x-data-grid";
import { obtenerGaes } from "../../api/axios";
import ModalClonarPlantilla from "../Recipes/Componentes/ModalClonarPlantila.jsx";
function transformarDatos(gaes) {
  console.log(gaes);
  return gaes.map((gae) => {
    return {
      id: gae.id_gae || "",
      nombre: gae.nombre || "",
      codigo: gae.codigo || "",
    };
  });
}
const ListaGaes = (props) => {
  const { setSelectedComponent, auth, onResponse } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("activas"); // Estado para controlar la pestaña activa
  const [gaes, setGaes] = useState([]);
  const [modalActiva, setModalActiva] = useState(false);
  const [plantillaAClonar, setPlantillaAClonar] = useState(false);
  const [respuesta, setRespuesta] = useState({
    status: true,
    msg: "Operación exitosa",
  });
  const manejarAbrirModal = (nombrePlantilla) => {

  };

  const manejarCerrarModal = () => {
    setModalActiva(false);
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
        setRespuesta(json)
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
  const manejarEditar = (id) => {
    console.log("Editar plantilla con ID:", id);
  };

  const manejarBloquear = (id) => {
    manejarAbrirModal()
  };

  const manejarClonar = (nombrePlantilla) => {
    console.log(nombrePlantilla)
    setPlantillaAClonar(nombrePlantilla);
    setModalActiva(true);
  };

  const manejarBorrar = (id) => {
    console.log("Eliminar plantilla con ID:", id);
  };
  const manejarAgregarPlantilla = () => {
    setSelectedComponent(<AgregarGae auth={auth}></AgregarGae>);
  };

  const manejarTabChange = (tab) => {
    setActiveTab(tab);
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
          <HeaderContent titulo="Lista de gaes"></HeaderContent>
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
                <Typography variant="h6">Agregar código gae</Typography>
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
                    rows={transformarDatos(gaes)}
                    columns={columns}
                    pageSize={5}
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
          </Paper>
        </Grid>
      ) : (
        <></>
      )}
    </Grid>
  );
};

export default ListaGaes;
