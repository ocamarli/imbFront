// hooks/useSoftwareService.js
import { useState, useCallback } from 'react';

import { crearFirmware,obtenerFirmwares,actualizarFirmware } from '../api/firmwaresApi';
export const useFirmwareService = () => {
  const [firmwares, setFirmwares] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [estaActivo, setEstaActivo] = useState(false);
  const [respuestaModal, setRespuestaModal] = useState(false);
  const [idFirmwareSeleccionado, setIdFirmwareSeleccionado] = useState("");
  const [estaActivoModalOk, setEstaActivoModalOk] = useState(false);
  const [respuestaModalOk, setRespuestaModalOk] = useState({
    msg: "¡Firmware deshabilitado!",
    status: true,
  });
  const [estaActivoModalConfirmacion, setEstaActivoModalConfirmacion] =
    useState(false);
  const [respuestaModalConfirmacion, setRespuestaModalConfirmacion] = useState({
    msg: "¡Confirma para deshabilitar Firmware!",
    status: false,
  });


  const fetchFirmwares = useCallback(async () => {
    try {
      setIsLoading(true);
      const tkn = JSON.parse(sessionStorage.getItem("ACCSSTKN"))?.access_token;
      if (tkn) {
        const json = await obtenerFirmwares(tkn);
        setFirmwares(json.firmwares || []);
        
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      
      console.error(error);
    }
  }, []);

  const handleCreateFirmware = async (data) => {
    try {
      const tkn = JSON.parse(sessionStorage.getItem("ACCSSTKN"))?.access_token;
      if (tkn) {
        const response = await crearFirmware(data, tkn);
        setEstaActivo(true);
        setRespuestaModal(response);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleEliminarFirmware = async (data) => {
    try {
         console.log("sdasd")
    } catch (error) {
      console.error(error);
    }
  };

  const deshabilitarFirmware = async (idFirmware) => {
    try {
      const tkn = JSON.parse(sessionStorage.getItem("ACCSSTKN"))?.access_token;
      const data = { idFirmware: idFirmware, estatus: false };
      const response = await actualizarFirmware(data, tkn);
      if (response.status) {
        console.log(response);
        if (response.status) {
          setRespuestaModalOk({ msg: "¡Firmware deshabilitado exitosamente!", status: true });
          setEstaActivoModalOk(true);
          fetchFirmwares();
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const cerrarModalOk = () => {
    setEstaActivoModalOk(false);
  };
  const cerrarModalConfirmacion = (respuestaSeleccionada) => {
    console.log("respuestaSeleccionada", respuestaSeleccionada);
    if (respuestaSeleccionada) {
      console.log("idFirmwareSeleccionado", idFirmwareSeleccionado);

      deshabilitarFirmware(idFirmwareSeleccionado);
    }
    setEstaActivoModalConfirmacion(false); // Restablecer el estado a false cuando se cierra el modal

  };

  const handleDeshabilitarFirmware = async (idFirmware) => {
    setIdFirmwareSeleccionado(idFirmware);
    setEstaActivoModalConfirmacion(true);
  };

  return {
    firmwares,
    isLoading,
    estaActivo,
    respuestaModal,
    fetchFirmwares,
    handleCreateFirmware,
    handleEliminarFirmware,
    setEstaActivo
  };
};
