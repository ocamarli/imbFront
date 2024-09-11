import React, { useCallback, useEffect } from "react";
import { Modal, Paper } from "@mui/material";
import { saveAs } from "file-saver";
import { usePlantillaService } from "../../hooks/usePlantillaService";
import LoadingComponent from "../LoadingComponent";

function obtenerParametrosProgramacion(plantilla, noProgramacion) {
  const programacion = plantilla.programaciones.find(
    (prog) => prog.noProgramacion === noProgramacion
  );
  return programacion ? programacion.parametros : [];
}

function ImprimirPlantilla(props) {
  const { idPlantilla, open, handleClose, onResponse } = props;

  const {
    isLoading,
    plantilla,
    fetchPlantilla,
    fetchCodigos,
    codigos,
  } = usePlantillaService(onResponse);

  useEffect(() => {
    fetchCodigos();
    fetchPlantilla(idPlantilla);
  }, [fetchCodigos, fetchPlantilla, idPlantilla]);

  const convertTextProgramacion = useCallback(() => {
    if (!plantilla) {
      console.log("No hay plantilla disponible");
      return;
    }

    const resultadosCodigoProgramaciones = plantilla.programasHabilitados.map(
      (noProgramacion) => {
        const parametrosProgramacion = obtenerParametrosProgramacion(
          plantilla,
          noProgramacion
        );
        const parametrosCombinados = [
          ...plantilla.parametrosGenerales,
          ...parametrosProgramacion,
        ];

        const resultado = codigos[1]?.valor.replace(
          /\{(noProgramacion|idGae|\d+)\}/g,
          (match, idParametroInterno) => {
            console.log("match", match);
            if (match === "{noProgramacion}") {
              return "" + noProgramacion + "";
            }
            if (match === "{idGae}") {
              return "" + plantilla.gae + "";
            }
            const objetoEncontrado = parametrosCombinados.find(
              (obj) => obj.idParametroInterno === idParametroInterno
            );
            return objetoEncontrado ? objetoEncontrado.valor : match;
          }
        );

        return {
          noProgramacion,
          resultado,
        };
      }
    );

    console.log("Resultados de Programaciones", resultadosCodigoProgramaciones);

    // Generar y descargar un archivo para cada resultado de programación
    resultadosCodigoProgramaciones.forEach(({ noProgramacion, resultado }) => {
      const blob = new Blob([resultado], { type: "text/plain;charset=utf-8" });
      saveAs(blob, `receta${noProgramacion}.txt`);
    });
  }, [plantilla, codigos]);

  const convertTextGeneral = useCallback(() => {
    console.log("plantilla", plantilla);
    if (!plantilla) {
      console.log("No hay plantilla disponible");
      return;
    }

    const parametrosCombinados = [
      ...plantilla.parametrosGenerales,
      ...plantilla.programasHabilitados.flatMap((noProgramacion) =>
        obtenerParametrosProgramacion(plantilla, noProgramacion)
      ),
    ];

    const resultado = codigos[0]?.valor.replace(
      /\{(inicioSeleccionado|idPlantilla|\d+)\}/g,
      (match, idParametroInterno) => {
        console.log("match", match);

        if (match === "{idPlantilla}") {
          return parseInt(plantilla.idPlantillaInterno).toString(16).toUpperCase();
        }
        if (match === "{inicioSeleccionado}") {
          return plantilla.programaSeleccionado;
        }
        const objetoEncontrado = parametrosCombinados.find(
          (obj) => obj.idParametroInterno === idParametroInterno
        );
        return objetoEncontrado ? objetoEncontrado.valor : match;
      }
    );

    console.log("Resultado General", resultado);

    // Generar y descargar el archivo de configuración general
    const blob = new Blob([resultado], { type: "text/plain;charset=utf-8" });
    saveAs(blob, `configuracionGeneralDelEquipo.txt`);
  }, [plantilla, codigos]);

  useEffect(() => {
    if (plantilla && codigos && open) {
      convertTextProgramacion(); // Descargar archivos para cada programación
      convertTextGeneral(); // Descargar archivo general solo una vez
      handleClose();
    }
  }, [plantilla, codigos, open, convertTextGeneral, convertTextProgramacion, handleClose]);

  if (isLoading || !codigos) {
    return (
      <Modal open={open} onClose={handleClose} className="ap-modal">
        <Paper
          elevation={3}
          spacing={0}
          sx={{
            height: "30%",
            width: "30%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: 2,
          }}
        >
          <h2>Generando archivos</h2>
          <LoadingComponent />
        </Paper>
      </Modal>
    );
  }

  return (
    <Modal open={open} onClose={handleClose} className="ap-modal">
      <Paper
        elevation={3}
        spacing={5}
        sx={{
          padding: 3,
          height: "30%",
          width: "30%",
        }}
      ></Paper>
    </Modal>
  );
}

export default ImprimirPlantilla;
