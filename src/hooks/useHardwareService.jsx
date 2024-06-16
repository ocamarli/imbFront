// hooks/useSoftwareService.js
import { useState, useCallback } from 'react';

import { crearHardware,obtenerHardwares,actualizarHardware } from '../api/hardwaresApi';
export const useHardwareService = () => {
  const [hardwares, setHardwares] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [estaActivo, setEstaActivo] = useState(false);
  const [respuestaModal, setRespuestaModal] = useState(false);
  const [idHardwareSeleccionado, setIdHardwareSeleccionado] = useState("");
  const [estaActivoModalOk, setEstaActivoModalOk] = useState(false);
  const [respuestaModalOk, setRespuestaModalOk] = useState({
    msg: "¡Hardware deshabilitado!",
    status: true,
  });
  const [estaActivoModalConfirmacion, setEstaActivoModalConfirmacion] =
    useState(false);
  const [respuestaModalConfirmacion, setRespuestaModalConfirmacion] = useState({
    msg: "¡Confirma para deshabilitar Hardware!",
    status: false,
  });


  const fetchHardwares = useCallback(async () => {
    try {
      setIsLoading(true);
      const tkn = JSON.parse(sessionStorage.getItem("ACCSSTKN"))?.access_token;
      if (tkn) {
        const json = await obtenerHardwares(tkn);
        setHardwares(json.Hardwares || []);
        
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      
      console.error(error);
    }
  }, []);

  const handleCreateHardware = async (data) => {
    try {
      const tkn = JSON.parse(sessionStorage.getItem("ACCSSTKN"))?.access_token;
      if (tkn) {
        const response = await crearHardware(data, tkn);
        setEstaActivo(true);
        setRespuestaModal(response);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleEliminarHardware = async (data) => {
    try {
         console.log("sdasd")
    } catch (error) {
      console.error(error);
    }
  };

  const deshabilitarHardware = async (idHardware) => {
    try {
      const tkn = JSON.parse(sessionStorage.getItem("ACCSSTKN"))?.access_token;
      const data = { idHardware: idHardware, estatus: false };
      const response = await actualizarHardware(data, tkn);
      if (response.status) {
        console.log(response);
        if (response.status) {
          setRespuestaModalOk({ msg: "¡Hardware deshabilitado exitosamente!", status: true });
          setEstaActivoModalOk(true);
          fetchHardwares();
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
      console.log("idHardwareSeleccionado", idHardwareSeleccionado);

      deshabilitarHardware(idHardwareSeleccionado);
    }
    setEstaActivoModalConfirmacion(false); // Restablecer el estado a false cuando se cierra el modal

  };

  const handleDeshabilitarHardware = async (idHardware) => {
    setIdHardwareSeleccionado(idHardware);
    setEstaActivoModalConfirmacion(true);
  };

  return {
    hardwares,
    isLoading,
    estaActivo,
    respuestaModal,
    fetchHardwares,
    handleCreateHardware,
    handleEliminarHardware,
    setEstaActivo
  };
};
