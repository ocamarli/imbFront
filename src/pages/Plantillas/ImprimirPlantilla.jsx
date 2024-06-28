import React, { useEffect } from "react";
import { Button, Grid, Divider, Modal, Paper } from "@mui/material";
import CodeEditor from "@uiw/react-textarea-code-editor";
import { useTheme } from "@mui/material";
import { saveAs } from 'file-saver';
import { usePlantillaService } from "../../hooks/usePlantillaService";
import LoadingComponent from "../LoadingComponent";

function obtenerParametrosProgramacion(plantilla, noProgramacion) {
  const programacion = plantilla.programaciones.find(prog => prog.noProgramacion === noProgramacion);
  return programacion ? programacion.parametros : [];
}

function ImprimirPlantilla(props) {
  const { idPlantilla, open, handleClose, onResponse } = props;
  const theme = useTheme();

  const {

    isLoading,
    plantilla,
    fetchPlantilla,
    fetchCodigos,
    codigos,
    setAbrirImprimirPlantilla
  } = usePlantillaService(onResponse);

  useEffect(() => {
    fetchCodigos();
    fetchPlantilla(idPlantilla);
  }, [fetchCodigos, fetchPlantilla, idPlantilla]);
  const handleCrearArchivo=()=>{
    convertTextProgramacion()
    convertTextGeneral()
  }
  const convertTextProgramacion = () => {
    if (!plantilla) {
      console.log("No hay plantilla disponible");
      return;
    }
    const resultadosCodigoProgramaciones = plantilla.programasHabilitados.map(noProgramacion => {
      const parametrosProgramacion = obtenerParametrosProgramacion(plantilla, noProgramacion);
      const parametrosCombinados = [...plantilla.parametrosGenerales, ...parametrosProgramacion];

      const resultado = codigos[1]?.valor.replace(/\{(noProgramacion|\d+)\}/g, (match, idParametroInterno) => {
        console.log("match",match)
        if(match==="{noProgramacion}")
          {
            return "_"+noProgramacion
          }
        const objetoEncontrado = parametrosCombinados.find(
          (obj) => obj.idParametroInterno === idParametroInterno
        );
        return objetoEncontrado ? objetoEncontrado.valor : match;
      });

      return {
        noProgramacion,
        resultado
      };
    });

    console.log("Resultados", resultadosCodigoProgramaciones);

    // Generar y descargar un archivo para cada resultado
    resultadosCodigoProgramaciones.forEach(({ noProgramacion, resultado }) => {
      const blob = new Blob([resultado], { type: "text/plain;charset=utf-8" });
      saveAs(blob, `receta${noProgramacion}.txt`);
    });

  };
  const convertTextGeneral = () => {
    if (!plantilla) {
      console.log("No hay plantilla disponible");
      return;
    }
    const resultadosCodigoGeneral = plantilla.programasHabilitados.map(noProgramacion => {
      const parametrosProgramacion = obtenerParametrosProgramacion(plantilla, noProgramacion);
      const parametrosCombinados = [...plantilla.parametrosGenerales, ...parametrosProgramacion];

      const resultado = codigos[0]?.valor.replace(/\{(\d+)\}/g, (match, idParametroInterno) => {
        console.log("match",match)

        const objetoEncontrado = parametrosCombinados.find(
          (obj) => obj.idParametroInterno === idParametroInterno
        );
        return objetoEncontrado ? objetoEncontrado.valor : match;
      });

      return {
        resultado
      };
    });

    console.log("Resultados", resultadosCodigoGeneral);

    // Generar y descargar un archivo para cada resultado
    resultadosCodigoGeneral.forEach(({ noProgramacion, resultado }) => {
      const blob = new Blob([resultado], { type: "text/plain;charset=utf-8" });
      saveAs(blob, `configuracionGeneralDelEquipo.txt`);
    });

  };

  if (isLoading || !codigos) {
    return (
      <Paper
        elevation={3}
        spacing={0}
        sx={{
          minWidth: "calc(90vw)",
          padding: 3,
          height: "fit-content",
          width: "calc(90vw)",
          maxWidth: "calc(90vw)",
        }}
      >
        <LoadingComponent />
      </Paper>
    );
  }

  return (
    <Modal open={open} onClose={handleClose} className="ap-modal">
      <Paper
        elevation={3}
        spacing={5}
        sx={{
          minWidth: "calc(80vw)",
          padding: 3,
          height: "fit-content",
          maxWidth: "calc(90vw)",
        }}
      >
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid
            item
            xs={12}
            style={{
              overflowY: "scroll",
              maxHeight: "500px",
              fontSize: ".6em",
            }}
          >
            <CodeEditor
              data-color-mode={theme.palette.mode}
              value={codigos[0]?.valor || ""}
              language="c"
              placeholder="code."
              padding={5}
              style={{
                minWith: "100%",
                fontSize: 12,
                fontFamily:
                  "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
                backgroundColor:
                  theme.palette.mode === "dark" ? "#121212" : "#f6f8fa",
              }}
            />
          </Grid>
          <Grid
            item
            xs={12}
            style={{
              overflowY: "scroll",
              maxHeight: "500px",
              fontSize: ".6em",
            }}
          >
            <CodeEditor
              data-color-mode={theme.palette.mode}
              value={codigos[1]?.valor || ""}
              language="c"
              placeholder="code."
              padding={5}
              style={{
                minWith: "100%",
                fontSize: 12,
                fontFamily:
                  "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
                backgroundColor:
                  theme.palette.mode === "dark" ? "#121212" : "#f6f8fa",
              }}
            />
          </Grid>
          <Grid item xs={12} spacing={2}>
            <Grid container sx={{ justifyContent: "flex-end" }} spacing={2}>
                <Grid item>
                <Button variant="outlined" color="primary" type="submit" onClick={handleCrearArchivo}>
                  Accept
                </Button>
              </Grid>
              <Grid item>
                <Button variant="contained" onClick={() => setAbrirImprimirPlantilla(false)}>
                  Close
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Modal>
  );
}

export default ImprimirPlantilla;
