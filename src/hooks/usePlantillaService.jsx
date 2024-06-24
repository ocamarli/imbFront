import { useState, useCallback } from "react";
import { crearPlantilla, obtenerPlantillas, actualizarPlantilla, obtenerPlantilla,actualizarParametroPlantilla, clonarPlantilla as clonarPlantillaAPI } from "../api/plantillasApi";

export const usePlantillaService = () => {
  const [plantillas, setPlantillas] = useState([]);
  const [plantilla, setPlantilla] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [idPlantillaSeleccionado, setIdPlantillaSeleccionado] = useState("");
  const [estaActivoModalOk, setEstaActivoModalOk] = useState(false);
  const [respuestaModalOk, setRespuestaModalOk] = useState({ msg: "¡plantilla deshabilitado!", status: true });
  const [estaActivoModalConfirmacionHabilitar, setEstaActivoModalConfirmacionHabilitar] = useState(false);
  const [respuestaModalConfirmacionHabilitar, setRespuestaModalConfirmacionHabilitar] = useState({
    msg: "¡Confirma para habilitar plantilla!",
    status: false,
  });
  const [estaActivoModalConfirmacionDeshabilitar, setEstaActivoModalConfirmacionDeshabilitar] = useState(false);
  const [respuestaModalConfirmacionDeshabilitar, setRespuestaModalConfirmacionDeshabilitar] = useState({
    msg: "¡Confirma para deshabilitar plantilla!",
    status: false,
  });
  const [activeTab, setActiveTab] = useState(1);
  const [plantillaAClonar, setPlantillaAClonar] = useState(false);
  const [estaActivoModalClonar, setEstaActivoModalClonar] = useState(false);  

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    fetchPlantillas(Boolean(newValue));
  };

  const fetchPlantillas = useCallback(async (estatus) => {
    try {
      setIsLoading(true);
      const tkn = JSON.parse(sessionStorage.getItem("ACCSSTKN"))?.access_token;
      if (tkn) {
        const json = await obtenerPlantillas(tkn, estatus);
        setPlantillas(json.plantillas || []);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  }, []);

  const fetchPlantilla = useCallback(async (idPlantilla) => {
    try {
      setIsLoading(true);
      const tkn = JSON.parse(sessionStorage.getItem("ACCSSTKN"))?.access_token;
      if (tkn) {
        const json = await obtenerPlantilla(tkn, idPlantilla);
        setPlantilla(json.plantilla || []);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  }, []);

  const handleCrearPlantilla = async (data,parametros,auth) => {
    try {
      setIsLoading(true);
      const tkn = JSON.parse(sessionStorage.getItem("ACCSSTKN"))?.access_token;
      if (tkn) {

        const listaParametrosGenerales = [];
        const listaParametrosProgramacion = [];
        // Filtrar parámetros y modificarlos según su tipo
        parametros.filter((param) => {
          let valor = ""
          if(param.esValorFijo === true ){
            valor=param.valorFijo
          }
          if (param.tipoParametro === "general") {
            // Modificar el parámetro y agregarlo a la lista de generales

            listaParametrosGenerales.push({
              idParametroInterno: param.idParametroInterno,
              valor: valor,
              estado: false,
            });
            return false; // No incluir este parámetro en la lista final
          } else if (param.tipoParametro === "programacion") {
            // Modificar el parámetro y agregarlo a la lista de programación

            listaParametrosProgramacion.push({
              idParametroInterno: param.idParametroInterno,
              valor:valor,
              estado: false,
            });
            return false; // No incluir este parámetro en la lista final
          }
          return true; // Mantener los parámetros que no son generales ni de programación
        });
    
        console.log("P");
        console.log(parametros);
        console.log("PG");
        console.log(listaParametrosGenerales);
        console.log("PP");
        console.log(listaParametrosProgramacion);
        const newData = {
          ...data,
          creadoPor: auth.correo,
          numeroProgramaciones: 1,
          parametrosGenerales: listaParametrosGenerales,
          programaciones: [
            { noProgramacion: "1", parametros: listaParametrosProgramacion },
            { noProgramacion: "2", parametros: listaParametrosProgramacion },
            { noProgramacion: "3", parametros: listaParametrosProgramacion },
            { noProgramacion: "4", parametros: listaParametrosProgramacion },
            { noProgramacion: "5", parametros: listaParametrosProgramacion },
            { noProgramacion: "6", parametros: listaParametrosProgramacion },
          ],
          estatus:true
        };
        console.log(newData);
    
        const response = await crearPlantilla(
          newData,
          JSON.parse(sessionStorage.getItem("ACCSSTKN")).access_token
        );

          console.log(response.idPlantilla);
          console.log("aqui selectedcomponetn EditarPlantilla")
          setRespuestaModalOk({ msg: response.msg, status: response.status });
          setEstaActivoModalOk(true);
      }
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };
  const fetchActualizarParametroPlantilla = useCallback(
    async (idPlantilla, idParametro, valor, noProgramacion) => {
      try {
        const tkn = JSON.parse(sessionStorage.getItem("ACCSSTKN"))?.access_token;
        if (tkn !== undefined) {
          console.log("actualizarParametro");
          console.log(idPlantilla);
          const data = {
            idPlantilla: idPlantilla,
            idParametro: idParametro,
            valor: valor,
            noProgramacion: noProgramacion,
          };

          const response = await actualizarParametroPlantilla(data, tkn);
          if(!response)
            {
              setEstaActivoModalOk(true)
            }
          console.log("actualizarParametro");
        } else {
          console.warn("No token found");
        }
      } catch (error) {
        console.error(error);
      }
    },
    []
  );

  const handleEditarPlantilla = async (data) => {
    try {
      const tkn = JSON.parse(sessionStorage.getItem("ACCSSTKN"))?.access_token;
      const response = await actualizarPlantilla(data, tkn);
      setRespuestaModalOk({ msg: response.msg, status: response.status });
      setEstaActivoModalOk(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleClonarPlantilla = async (idPlantilla) => {
    try {
      const plantillaSelecionada = plantillas.find(
        (plantilla) => plantilla.idPlantilla === idPlantilla
      );
      setPlantillaAClonar(plantillaSelecionada);
      setEstaActivoModalClonar(true);
    } catch (error) {
      console.error(error);
    }
  };

  const clonarPlantillaService = async (data) => {
    try {
        console.log("siiiiiiiiii")
      const response = await clonarPlantillaAPI(
        data,
        JSON.parse(sessionStorage.getItem("ACCSSTKN")).access_token
      );
      console.log(response)
    
        setRespuestaModalOk({ msg: response.msg, status: response.status });
        setEstaActivoModalOk(true);        
        setEstaActivoModalClonar(false);
        console.log("sipasa")
        return (response)  
    } catch (error) {
      console.error(error);
    }
  };

  const deshabilitarPlantilla = async (idPlantilla) => {
    try {
      const tkn = JSON.parse(sessionStorage.getItem("ACCSSTKN"))?.access_token;
      const data = { idPlantilla:idPlantilla, estatus: false };
      const response = await actualizarPlantilla(data, tkn);
      console.log("response",response)

        setRespuestaModalOk({ msg: "¡Plantilla deshabilitada exitosamente!", status: true });
        setEstaActivoModalOk(true);
        fetchPlantillas(true);
      
    } catch (error) {
      console.error(error);
    }
  };

  const habilitarPlantilla = async (idPlantilla) => {
    try {
      const tkn = JSON.parse(sessionStorage.getItem("ACCSSTKN"))?.access_token;
      const data = { idPlantilla:idPlantilla, estatus: true };
      const response = await actualizarPlantilla(data, tkn);
      if (response.status) {
        setRespuestaModalOk({ msg: "¡Plantilla habilitado exitosamente!", status: true });
        setEstaActivoModalOk(true);
        fetchPlantillas(false);
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
      habilitarPlantilla(idPlantillaSeleccionado);
    }
    setEstaActivoModalConfirmacionHabilitar(false);
  };

  const cerrarModalConfirmacionDeshabilitar = (respuestaSeleccionada) => {
    if (respuestaSeleccionada) {
      deshabilitarPlantilla(idPlantillaSeleccionado);
    }
    setEstaActivoModalConfirmacionDeshabilitar(false);
  };

  const handleDeshabilitarPlantilla = (idPlantilla) => {
    setIdPlantillaSeleccionado(idPlantilla);
    setEstaActivoModalConfirmacionDeshabilitar(true);
  };

  const handleHabilitarPlantilla = (idPlantilla) => {
    setIdPlantillaSeleccionado(idPlantilla);
    setEstaActivoModalConfirmacionHabilitar(true);
  };
  const handleCongelarPlantilla = (idPlantilla) => {
    console.log(idPlantilla);
  };

  return {
    activeTab,
    plantillas,
    plantilla,
    isLoading,
    idPlantillaSeleccionado,
    estaActivoModalOk,
    setEstaActivoModalOk,
    setRespuestaModalOk,
    respuestaModalOk,
    handleTabChange,
    fetchPlantillas,
    fetchPlantilla,
    handleCrearPlantilla,
    handleEditarPlantilla,
    handleDeshabilitarPlantilla,
    handleHabilitarPlantilla,
    handleClonarPlantilla,
    handleCongelarPlantilla,
    cerrarModalOk,
    cerrarModalConfirmacionHabilitar,
    estaActivoModalConfirmacionHabilitar,
    respuestaModalConfirmacionHabilitar,
    cerrarModalConfirmacionDeshabilitar,
    estaActivoModalConfirmacionDeshabilitar,
    respuestaModalConfirmacionDeshabilitar,
    setRespuestaModalConfirmacionHabilitar,
    setRespuestaModalConfirmacionDeshabilitar,
    plantillaAClonar,
    estaActivoModalClonar,
    setEstaActivoModalClonar,
    clonarPlantilla: clonarPlantillaService,
    fetchActualizarParametroPlantilla,
  };
};