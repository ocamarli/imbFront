import { useState, useCallback, useMemo } from "react";
import { obtenerCodigos,

  crearPlantilla, 
  obtenerPlantillas, 
  actualizarPlantilla, 
  obtenerPlantilla,actualizarParametroPlantilla, clonarPlantilla as clonarPlantillaAPI, verificarParametros } from "../api/plantillasApi";

export const usePlantillaService = () => {
  const [matches, setMatches] = useState([]);  
  const [abrirImprimirPlantilla, setAbrirImprimirPlantilla] = useState(false);
  const [tipoCodigo, setTipoCodigo] = useState("codigoProgramaciones");
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
  const [checkboxSeleccionados, setCheckboxSeleccionados] = useState([]);
  
  const totalDeProgramas = useMemo(() => ["1", "2", "3", "4", "5", "6"], []);
  const [programaSeleccionado, setProgramaSeleccionado] = useState(totalDeProgramas[0]);
  const [estaCongelado, setEstaCongelado] = useState(false);
  const [codigo, setCodigo] = useState("");
  const [codigos, setCodigos] = useState("");
  const [abrirEditarCodigo, setAbrirEditarCodigo] = useState(false);
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
  const fetchCodigos =  useCallback(async (data) => {
    try {
      const tkn = JSON.parse(sessionStorage.getItem("ACCSSTKN"))?.access_token;
      if (tkn !== undefined)
      {
        const respuesta = await obtenerCodigos(tkn);
        console.log(respuesta.codigos)
        setCodigos(respuesta.codigos)
      }
    } catch (error) { 
      console.log("error");
      setCodigo("");
    }
  },[]);
  const fetchPlantilla = useCallback(async (idPlantilla) => {
    try {
      setIsLoading(true);
      const tkn = JSON.parse(sessionStorage.getItem("ACCSSTKN"))?.access_token;
      if (tkn) {
        const json = await obtenerPlantilla(tkn, idPlantilla);
        setPlantilla(json.plantilla || []);
        setCheckboxSeleccionados(json.plantilla.programasHabilitados || [])
        setProgramaSeleccionado(json.plantilla.programaSeleccionado || "")
        setEstaCongelado(json.plantilla.estaCongelado)
        console.log("progr",json.plantilla.programasHabilitados)
        console.log("selec",json.plantilla.programaSeleccionado)
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
          let estatus = false
          if(param.esValorFijo === true ){
            valor=param.valorFijo
            estatus = true
          }

          if (param.tipoParametro === "general") {
            // Modificar el parámetro y agregarlo a la lista de generales

            listaParametrosGenerales.push({
              idParametroInterno: param.idParametroInterno,
              valor: valor,
              estatus: estatus,
            });
            return false; // No incluir este parámetro en la lista final
          } else if (param.tipoParametro === "programacion") {
            // Modificar el parámetro y agregarlo a la lista de programación

            listaParametrosProgramacion.push({
              idParametroInterno: param.idParametroInterno,
              valor:valor,
              estatus: estatus,
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
          programasHabilitados: ["1"],
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
    async (idPlantilla, idParametro, valor, noProgramacion,estatus) => {
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
            estatus:estatus
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
  const handleImprimirPlantilla = async (idPlantilla) => {
    try {
      
      console.log("imprimirPlantilla")
      setAbrirImprimirPlantilla(true)
      setIdPlantillaSeleccionado(idPlantilla)
      //const response = await actualizarPlantilla(data, tkn);
      //setRespuestaModalOk({ msg: response.msg, status: response.status });
      //setEstaActivoModalOk(true);
    } catch (error) {
      console.error(error);
    }
  };
  const handleEditarCodigo = async (data) => {
    try {
      
      console.log("editarCodigo")
      setAbrirEditarCodigo(true)
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
  const handleCongelarPlantilla = async (idPlantilla,estatus) => {
    console.log("idPlantilla",idPlantilla);
    console.log("estatus",estatus);
    const tkn = JSON.parse(sessionStorage.getItem("ACCSSTKN"))?.access_token;
    const response = await verificarParametros(tkn,idPlantilla)
    if(response.status)
      {
        await handleEditarPlantilla({"idPlantilla":idPlantilla,"estaCongelado":estatus})
        fetchPlantilla(idPlantilla)
      }
      else{
        setRespuestaModalOk({ msg: response.msg, status: response.status});
        setEstaActivoModalOk(true)
      }


  };
  const actualizarProgramasHabilitados = async (idPlantilla) => {
    console.log("idPlantilla",idPlantilla);
    const tkn = JSON.parse(sessionStorage.getItem("ACCSSTKN"))?.access_token;
    const response = await verificarParametros(tkn,idPlantilla)
    console.log("Congelar",response)
  };

  const setFileTemplate = useCallback(async (data) => {
    try {
      
      if (
        JSON.parse(sessionStorage.getItem("ACCSSTKN")).access_token !==
        undefined
      ) {
        const response = await setFileTemplate(
          data,
          JSON.parse(sessionStorage.getItem("ACCSSTKN")).access_token
        );
        console.log(response);
      }
    } catch (error) {
      
      console.log("error");
    }
  },[]);


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
    checkboxSeleccionados,
    setCheckboxSeleccionados,
    programaSeleccionado,
    setProgramaSeleccionado,
    totalDeProgramas,
    estaCongelado,
    setEstaCongelado,
    fetchCodigos,
    codigo,
    setCodigo,
    setFileTemplate,
    tipoCodigo,
    handleImprimirPlantilla,
    abrirEditarCodigo,
    setAbrirEditarCodigo,
    matches,
    setMatches,
    setAbrirImprimirPlantilla,
    abrirImprimirPlantilla,
    codigos,
    setTipoCodigo,
    actualizarProgramasHabilitados,
    handleEditarCodigo
  };
};