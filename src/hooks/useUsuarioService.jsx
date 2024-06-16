// hooks/useSoftwareService.js
import { useState, useCallback } from 'react';

import { crearFirmware,obtenerFirmwares } from '../api/firmwaresApi';
export const useFirmwareService = () => {
  const [firmwares, setFirmwares] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [estaActivo, setEstaActivo] = useState(false);
  const [respuestaModal, setRespuestaModal] = useState(false);

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
