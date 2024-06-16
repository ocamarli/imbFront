// hooks/useSoftwareService.js
import { useState, useCallback } from "react";
import { crearGae, obtenerGaes, actualizarGae , obtenerGae} from "../api/gaesApi";
export const useGaeService = () => {
  const [gaes, setGaes] = useState([]);
  const [gae, setGae] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [estaActivo, setEstaActivo] = useState(false);
  const [respuestaModal, setRespuestaModal] = useState(false);
  const [idGaeSeleccionado, setIdGaeSeleccionado] = useState("");
  const [estaActivoModalOk, setEstaActivoModalOk] = useState(false);
  const [respuestaModalOk, setRespuestaModalOk] = useState({
    msg: "¡GAE deshabilitado!",
    status: true,
  });
  const [estaActivoModalConfirmacion, setEstaActivoModalConfirmacion] =
    useState(false);
  const [respuestaModalConfirmacion, setRespuestaModalConfirmacion] = useState({
    msg: "¡Confirma para deshabilitar GAE!",
    status: false,
  });

  const fetchGaes = useCallback(async () => {
    try {
      setIsLoading(true);
      const tkn = JSON.parse(sessionStorage.getItem("ACCSSTKN"))?.access_token;
      if (tkn) {
        const json = await obtenerGaes(tkn);
        const gaesActivos =
          json.gaes?.filter((gae) => gae.estatus !== false) || [];
        console.log(json.gaes);
        setGaes(gaesActivos || []);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  }, []);
const fetchGae = useCallback(async (idGae) => {
  try {
    setIsLoading(true);
    const tkn = JSON.parse(sessionStorage.getItem("ACCSSTKN"))?.access_token;
    if (tkn) {
      const json = await obtenerGae(tkn,idGae);

      console.log(json.gae);
      setGae(json.gae || []);
    }
    setIsLoading(false);
  } catch (error) {
    setIsLoading(false);
    console.error(error);
  }
}, []);
  const handleCreateGae = async (data) => {
    try {
      const tkn = JSON.parse(sessionStorage.getItem("ACCSSTKN"))?.access_token;
      if (tkn) {
        const response = await crearGae(data, tkn);
        setEstaActivo(true);
        setRespuestaModal(response);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleEditarGae = async (data) => {
    try {
      const tkn = JSON.parse(sessionStorage.getItem("ACCSSTKN"))?.access_token;
      const response = await actualizarGae(data,tkn)
      
      if (response.status) {
        console.log(response);
        if (response.status) {
          setRespuestaModalOk({ msg: response.msg, status: true });
          setEstaActivoModalOk(true);
        }
      }
      console.log(response);

      setRespuestaModal(response);;
    } catch (error) {
      console.error(error);
    }
  };

  const deshabilitarGae = async (idGae) => {
    try {
      const tkn = JSON.parse(sessionStorage.getItem("ACCSSTKN"))?.access_token;
      const data = { idGae: idGae, estatus: false };
      const response = await actualizarGae(data, tkn);
      if (response.status) {
        console.log(response);
        if (response.status) {
          setRespuestaModalOk({ msg: "¡GAE deshabilitado exitosamente!", status: true });
          setEstaActivoModalOk(true);
          fetchGaes();
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
      console.log("idGaeSeleccionado", idGaeSeleccionado);

      deshabilitarGae(idGaeSeleccionado);
    }
    setEstaActivoModalConfirmacion(false); // Restablecer el estado a false cuando se cierra el modal

  };

  const handleDeshabilitarGae = async (idGae) => {
    setIdGaeSeleccionado(idGae);
    setEstaActivoModalConfirmacion(true);
  };

  return {
    gaes,
    gae,    
    isLoading,
    idGaeSeleccionado,
    estaActivo,
    respuestaModal,
    estaActivoModalOk,
    respuestaModalOk,
    estaActivoModalConfirmacion,
    respuestaModalConfirmacion,
    cerrarModalOk,
    cerrarModalConfirmacion,
    setEstaActivoModalConfirmacion,
    setIdGaeSeleccionado,
    fetchGaes,
    fetchGae,
    handleCreateGae,
    handleDeshabilitarGae,
    handleEditarGae,
    setEstaActivo,
    
  };
};
