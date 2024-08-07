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
          /\{(noProgramacion|\d+)\}/g,
          (match, idParametroInterno) => {
            console.log("match", match);
            if (match === "{noProgramacion}") {
              return "_" + noProgramacion;
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

    console.log("Resultados", resultadosCodigoProgramaciones);

    // Generar y descargar un archivo para cada resultado
    resultadosCodigoProgramaciones.forEach(({ noProgramacion, resultado }) => {
      const blob = new Blob([resultado], { type: "text/plain;charset=utf-8" });
      saveAs(blob, `receta${noProgramacion}.txt`);
    });
  }, [plantilla, codigos]);

  const convertTextGeneral = useCallback(() => {
    if (!plantilla) {
      console.log("No hay plantilla disponible");
      return;
    }

    const resultadosCodigoGeneral = plantilla.programasHabilitados.map(
      (noProgramacion) => {
        const parametrosProgramacion = obtenerParametrosProgramacion(
          plantilla,
          noProgramacion
        );
        const parametrosCombinados = [
          ...plantilla.parametrosGenerales,
          ...parametrosProgramacion,
        ];

        const resultado = codigos[0]?.valor.replace(
          /\{(\d+)\}/g,
          (match, idParametroInterno) => {
            console.log("match", match);

            const objetoEncontrado = parametrosCombinados.find(
              (obj) => obj.idParametroInterno === idParametroInterno
            );
            return objetoEncontrado ? objetoEncontrado.valor : match;
          }
        );

        return {
          resultado,
        };
      }
    );

    console.log("Resultados", resultadosCodigoGeneral);

    // Generar y descargar un archivo para cada resultado
    resultadosCodigoGeneral.forEach(({ resultado }) => {
      const blob = new Blob([resultado], { type: "text/plain;charset=utf-8" });
      saveAs(blob, `configuracionGeneralDelEquipo.txt`);
    });
  }, [plantilla, codigos]);

  useEffect(() => {
    if (plantilla && codigos && open) {
      convertTextProgramacion();
      convertTextGeneral();
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
