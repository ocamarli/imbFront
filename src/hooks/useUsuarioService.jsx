// hooks/useSoftwareService.js
import { useState, useCallback } from 'react';

import { crearUsuario,obtenerUsuarios,actualizarUsuario,obtenerUsuario } from '../api/usuariosApi';
export const useUsuarioService = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [usuario, setUsuario] = useState(null);  
  const [isLoading, setIsLoading] = useState(false);
  const [estaActivo, setEstaActivo] = useState(false);
  const [respuestaModal, setRespuestaModal] = useState(false);
  const [idUsuarioSeleccionado, setIdUsuarioSeleccionado] = useState("");
  const [autorizaciones,setAutorizaciones]=useState()
  const [estaActivoModalOk, setEstaActivoModalOk] = useState(false);
  const [respuestaModalOk, setRespuestaModalOk] = useState({
    msg: "¡Usuario deshabilitado!",
    status: true,
  });
  const [estaActivoModalConfirmacion, setEstaActivoModalConfirmacion] =
    useState(false);
  const [respuestaModalConfirmacion, setRespuestaModalConfirmacion] = useState({
    msg: "¡Confirma para deshabilitar usuario!",
    status: false,
  });

  const fetchUsuario = useCallback(async (idUsuario) => {
    try {
      setIsLoading(true);
      const tkn = JSON.parse(sessionStorage.getItem("ACCSSTKN"))?.access_token;
      if (tkn) {
        const json = await obtenerUsuario(tkn,idUsuario);
  
        console.log(json.usuario);
        setUsuario(json.usuario || []);
        setAutorizaciones(json.usuario.permisos || null);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  }, []);
  const fetchUsuarios = useCallback(async () => {
    try {
      setIsLoading(true);
      const tkn = JSON.parse(sessionStorage.getItem("ACCSSTKN"))?.access_token;
      if (tkn) {
        const json = await obtenerUsuarios(tkn);
        const usuariosActivos =
          json.usuarios?.filter((usuario) => usuario.estatus !== false) || [];
        console.log(json.usuarios);
        setUsuarios(usuariosActivos || []);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  }, []);
  const handleEditarUsuario = async (data) => {
    try {
      const tkn = JSON.parse(sessionStorage.getItem("ACCSSTKN"))?.access_token;
      const response = await actualizarUsuario(data,tkn)
      
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

  const handleCrearUsuario = async (data) => {
    try {
      const tkn = JSON.parse(sessionStorage.getItem("ACCSSTKN"))?.access_token;
      if (tkn) {
        const response = await crearUsuario(data, tkn);
        setRespuestaModalOk({ msg: response.msg, status: true });
        setEstaActivoModalOk(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const deshabilitarUsuario = async (idUsuario) => {
    try {
      const tkn = JSON.parse(sessionStorage.getItem("ACCSSTKN"))?.access_token;
      const data = { idUsuario: idUsuario, estatus: false };
      const response = await actualizarUsuario(data, tkn);
      if (response.status) {
        console.log(response);
        if (response.status) {
          setRespuestaModalOk({ msg: "¡Usuario deshabilitado exitosamente!", status: true });
          setEstaActivoModalOk(true);
          fetchUsuarios();
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
      console.log("idUsuarioSeleccionado", idUsuarioSeleccionado);

      deshabilitarUsuario(idUsuarioSeleccionado);
    }
    setEstaActivoModalConfirmacion(false); // Restablecer el estado a false cuando se cierra el modal

  };

  const handleDeshabilitarUsuario = async (idUsuario) => {
    console.log("handleDesUsu")
    setIdUsuarioSeleccionado(idUsuario);
    setEstaActivoModalConfirmacion(true);
  };

  return {
    usuarios,
    usuario,    
    isLoading,
    idUsuarioSeleccionado,
    estaActivo,
    respuestaModal,
    estaActivoModalOk,
    respuestaModalOk,
    estaActivoModalConfirmacion,
    respuestaModalConfirmacion,
    autorizaciones,
    setAutorizaciones,
    setRespuestaModalConfirmacion,
    cerrarModalOk,
    cerrarModalConfirmacion,
    setEstaActivoModalConfirmacion,
    setIdUsuarioSeleccionado,
    fetchUsuarios,
    fetchUsuario,
    handleCrearUsuario,
    handleDeshabilitarUsuario,
    handleEditarUsuario,
    setEstaActivo,
    
  };
};
