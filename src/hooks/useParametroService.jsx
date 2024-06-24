import { useState, useCallback } from "react";
import { crearParametro, obtenerParametros, actualizarParametro, obtenerParametro } from "../api/parametrosApi";

export const useParametroService = () => {
  const [parametros, setParametros] = useState([]);
  const [parametro, setParametro] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [idParametroSeleccionado, setIdParametroSeleccionado] = useState("");
  const [estaActivoModalOk, setEstaActivoModalOk] = useState(false);
  const [respuestaModalOk, setRespuestaModalOk] = useState({ msg: "¡parametro deshabilitado!", status: true });
  const [estaActivoModalConfirmacionHabilitar, setEstaActivoModalConfirmacionHabilitar] = useState(false);
  const [respuestaModalConfirmacionHabilitar, setRespuestaModalConfirmacionHabilitar] = useState({
    msg: "¡Confirma para habilitar parametro!",
    status: false,
  });
  const [estaActivoModalConfirmacionDeshabilitar, setEstaActivoModalConfirmacionDeshabilitar] = useState(false);
  const [respuestaModalConfirmacionDeshabilitar, setRespuestaModalConfirmacionDeshabilitar] = useState({
    msg: "¡Confirma para deshabilitar parametro!",
    status: false,
  });
  const [activeTab, setActiveTab] = useState(1);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    fetchParametros(Boolean(newValue));
  };

  const fetchParametros = useCallback(async (estatus) => {
    try {
      setIsLoading(true);
      const tkn = JSON.parse(sessionStorage.getItem("ACCSSTKN"))?.access_token;
      if (tkn) {
        const json = await obtenerParametros(tkn, estatus);
        setParametros(json.parametros || []);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  }, []);

  const fetchParametro = useCallback(async (idParametro) => {
    try {
      setIsLoading(true);
      const tkn = JSON.parse(sessionStorage.getItem("ACCSSTKN"))?.access_token;
      if (tkn) {
        const json = await obtenerParametro(tkn, idParametro);
        setParametro(json.parametro || []);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  }, []);

  const handleCrearParametro = async (data) => {
    try {
      setIsLoading(true);
      const tkn = JSON.parse(sessionStorage.getItem("ACCSSTKN"))?.access_token;
      if (tkn) {
        const response = await crearParametro(data, tkn);
        setRespuestaModalOk({ msg: response.msg, status: response.status });
        setEstaActivoModalOk(true);
      }
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  const handleEditarParametro = async (data) => {
    try {
      const tkn = JSON.parse(sessionStorage.getItem("ACCSSTKN"))?.access_token;
      const response = await actualizarParametro(data, tkn);
      setRespuestaModalOk({ msg: response.msg, status: response.status });
      setEstaActivoModalOk(true);
    } catch (error) {
      console.error(error);
    }
  };

  const deshabilitarParametro = async (idParametro) => {
    try {
      const tkn = JSON.parse(sessionStorage.getItem("ACCSSTKN"))?.access_token;
      const data = { idParametro, estatus: false };
      const response = await actualizarParametro(data, tkn);
      if (response.status) {
        setRespuestaModalOk({ msg: "¡parametro deshabilitado exitosamente!", status: true });
        setEstaActivoModalOk(true);
        fetchParametros(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const habilitarParametro = async (idParametro) => {
    try {
      const tkn = JSON.parse(sessionStorage.getItem("ACCSSTKN"))?.access_token;
      const data = { idParametro, estatus: true };
      const response = await actualizarParametro(data, tkn);
      if (response.status) {
        setRespuestaModalOk({ msg: "¡parametro habilitado exitosamente!", status: true });
        setEstaActivoModalOk(true);
        fetchParametros(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const cerrarModalOk = () => {
    setEstaActivoModalOk(false);
  };

  const cerrarModalConfirmacionHabilitar = (respuestaSeleccionada) => {
    if (respuestaSeleccionada) {
      habilitarParametro(idParametroSeleccionado);
    }
    setEstaActivoModalConfirmacionHabilitar(false);
  };

  const cerrarModalConfirmacionDeshabilitar = (respuestaSeleccionada) => {
    if (respuestaSeleccionada) {
      deshabilitarParametro(idParametroSeleccionado);
    }
    setEstaActivoModalConfirmacionDeshabilitar(false);
  };

  const handleDeshabilitarParametro = (idParametro) => {
    setIdParametroSeleccionado(idParametro);
    setEstaActivoModalConfirmacionDeshabilitar(true);
  };

  const handleHabilitarParametro = (idParametro) => {
    setIdParametroSeleccionado(idParametro);
    setEstaActivoModalConfirmacionHabilitar(true);
  };

  return {
    activeTab,
    parametros,
    parametro,
    isLoading,
    idParametroSeleccionado,
    estaActivoModalOk,
    respuestaModalOk,
    handleTabChange,
    fetchParametros,
    fetchParametro,
    handleCrearParametro,
    handleEditarParametro,
    handleDeshabilitarParametro,
    handleHabilitarParametro,
    cerrarModalOk,
    cerrarModalConfirmacionHabilitar,
    estaActivoModalConfirmacionHabilitar,
    respuestaModalConfirmacionHabilitar,
    cerrarModalConfirmacionDeshabilitar,
    estaActivoModalConfirmacionDeshabilitar,
    respuestaModalConfirmacionDeshabilitar,
    setRespuestaModalConfirmacionHabilitar,
    setRespuestaModalConfirmacionDeshabilitar    
  };
};