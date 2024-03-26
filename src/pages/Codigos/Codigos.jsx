import React, { useState } from "react";
import { Typography, Grid, Button,Paper } from "@mui/material";
import InputCodigo from "./InputCodigo";
import ListaParametrosCodigo from "./ListaParametrosCodigo";
import HeaderContent from "../HeaderContent";

function Codigos({ open, handleClose }) {
  const [matches, setMatches] = useState([]);
  const [activeTab, setActiveTab] = useState("general"); // Estado para la pestaña activa

  const manejarTabChange = (tab) => {
    setActiveTab(tab); // Cambiar el estado de la pestaña activa al hacer clic en un botón
  };

  return (
    <Grid container padding={2} spacing={2}>
         <Grid item xs={12}> <HeaderContent titulo="Codigos base"></HeaderContent></Grid>         
      <Grid item xs={12}>
        {/* Botones de tabs */}
        <Button
          variant="contained"
          onClick={() => manejarTabChange("general")}
          style={{
            backgroundColor: activeTab === "general" ? "green" : "#cccccc",
            color: "white",
            cursor: "pointer",
          }}
        >
          Código general
        </Button>
        <Button
          variant="contained"
          onClick={() => manejarTabChange("programaciones")}
          style={{
            backgroundColor: activeTab === "programaciones" ? "green" : "#cccccc",
            color: "white",
            cursor: "pointer",
          }}
        >
          Código de programaciones
        </Button>
      </Grid>
      <Grid item xs={12}>
        {/* Contenido de la pestaña activa */}
        {activeTab === "general" && (
          <Paper
            elevation={3}
            sx={{
              padding: 3,
              width: "95vw",
              height: "95vh",
            }}
          >
            {/* Componentes para la pestaña "Plantillas general" */}
            <Typography sx={{ fontSize: "1.4em" }}>Config file.h</Typography>
            <ListaParametrosCodigo matches={matches} style={{ maxHeight: "500px" }} />
            <InputCodigo tipoCodigo={"codigoGeneral"} setMatches={setMatches} onClose={handleClose} />
          </Paper>
        )}
        {activeTab === "programaciones" && (
          <Paper
            elevation={3}
            sx={{
              padding: 3,
              width: "95vw",
              height: "95vh",
            }}
          >
            {/* Componentes para la pestaña "Plantillas programaciones" */}
            <Typography sx={{ fontSize: "1.4em" }}>Config file.h</Typography>
            <ListaParametrosCodigo matches={matches} style={{ maxHeight: "500px" }} />
            <InputCodigo tipoCodigo={"codigoProgramaciones"} setMatches={setMatches} onClose={handleClose} />
          </Paper>
        )}
      </Grid>
    </Grid>
  );
}

export default Codigos;