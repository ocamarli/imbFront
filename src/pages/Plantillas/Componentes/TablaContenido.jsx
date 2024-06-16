import {
  TextField,
  FormControl,
  Grid,
  CircularProgress,
  Select,
  MenuItem,
  Typography,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useState, useEffect, useCallback, useRef } from "react";
import ModalGenerico from "../../../components/ModalGenerico";
import { obtenerPlantilla } from "../../../api/plantillasApi";
import { actualizarParametroPlantilla } from "../../../api/plantillasApi";
const TablaContenido = (props) => {
  const { idPlantilla, checkboxSeleccionados } = props;

  const [plantilla, setPlantilla] = useState(null);
  
  const [respuestaModal, setRespuestaModal] = useState({
    status:false,
    msg:"valor no válido",
  });
  const [estaActivo, setEstaActivo] = useState(false);
  const handleOnChange = (e) => {
    const inputValue = e.target.value;
  
    // Validar si el valor ingresado cumple con el patrón
    if (/^-?[0-9]*(\.[0-9]+)?$/.test(inputValue) || inputValue === "") {
      // Si el valor cumple con el patrón o está vacío, no hacemos nada
    } else {
      // Si el valor no cumple con el patrón, eliminamos el último carácter ingresado
      e.target.value = inputValue.slice(0, -1);
    }
  };
  
  const handleOnBlur = (e, parametro) => {
    const nuevoValor = e.target.value;
    const idParametro = parametro.row.id;
    const valorActual = parametro.row.valor;    
    const noProgramacion = parametro.row.noProgramacion;
    const valorMin = parametro.row.valor_min;
    const valorMax = parametro.row.valor_max;
    const tipoCampo = parametro.row.tipoCampo;
    const tipoParametro = parametro.row.tipoParametro;

    if (tipoCampo == "rango")
    {
      if (/^-?[0-9]*(\.[0-9]+)?$/.test(nuevoValor) || nuevoValor === "") {
        // Si cumple con el patrón o está vacío, actualizar el valor en el estado
        if (nuevoValor>=valorMin && nuevoValor <=  valorMax)
        {
          console.log("ok")
        }
        else{
          console.log("error")
          parametro.row.valor=valorActual;
          setEstaActivo(true);
          e.preventDefault();
          
        }
        
      } else {
        // Si no cumple con el patrón, restaurar el valor actual
        parametro.row.valor = valorActual;
      }
     
    }
  console.log("id:",idParametro)
  console.log("valor",valorActual)
  //fetchActualizarParametroPlantilla(idPlantilla, idParametro, valor, noProgramacion);
  };
  const cerrarModal = () => {
    setEstaActivo(false); // Restablecer el estado a false cuando se cierra el modal
  };
  const handleSelectChange = (e, idParametro, noProgramacion) => {
    const valor = e.target.value;
    console.log("handleSelectChange");
    console.log("valor", valor);
    console.log("idParametro", idParametro);
    // Llamar a la función actualizarParametroPlantilla() aquí
    fetchActualizarParametroPlantilla(idPlantilla, idParametro, valor, 0);
  };

  const fetchObtenerPlantilla = useCallback(async () => {
    try {
      const tkn = JSON.parse(sessionStorage.getItem("ACCSSTKN"))?.access_token;
      console.log(tkn);
      if (tkn !== undefined) {
        console.log("obtenerPlantilla");
        console.log(idPlantilla);
        const json = await obtenerPlantilla(tkn, idPlantilla);
        console.log(json);
        setPlantilla(json.plantilla || null);
      } else {
        setPlantilla(null);
      }
    } catch (error) {
      console.error(error);
    }
  }, [idPlantilla, setPlantilla]);

  const fetchActualizarParametroPlantilla = useCallback(
    async (idPlantilla, idParametro, valor, noProgramacion) => {
      try {
        const tkn = JSON.parse(
          sessionStorage.getItem("ACCSSTKN")
        )?.access_token;;
        if (tkn !== undefined) {
          console.log("actualizarParametro");
          console.log(idPlantilla);
          const data = {
            "idPlantilla": idPlantilla,
            "idParametro": idParametro,
            "valor": valor,
            "noProgramacion": noProgramacion
          };
          
          const json = await actualizarParametroPlantilla(
            data,
            tkn
          );
          console.log(json);
        } else {

        }
      } catch (error) {
        console.error(error);
      }
    }
  );

  useEffect(() => {
    fetchObtenerPlantilla();
  }, [fetchObtenerPlantilla]);
  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    {
      field: "valor",
      headerName: "VALOR",
      flex: 1,
      editable: false,
      renderCell: (parametro) => {
        if (parametro.row.tipoCampo === "opciones") {
          return (
            <FormControl variant="outlined" size="small" fullWidth>
              <Select
                id={"select-param-"+ parametro.row.id}
                key={"select-param-"+ parametro.row.id}
                name={"select-param"}
                onChange={(e) =>
                  handleSelectChange(
                    e,
                    parametro.row.id,
                    parametro.row.noProgramacion
                  )
                }
                size="small"
                defaultValue={parametro.row.valor}// Asegúrate de dejar este defaultValue vacío
                displayEmpty // Esta propiedad garantiza que el elemento seleccionado muestre el placeholder cuando esté vacío
                renderValue={(selected) => {
                  if (!selected) {
                    return <em>Selecciona una opción</em>;
                  }
                  return selected;
                }}
              >
                <MenuItem disabled value="">
                  <em>Selecciona una opción</em>
                </MenuItem>
                {parametro.row.opciones.map((opcion) => (
                  <MenuItem key={opcion.valor} value={opcion.valor}>
                    {opcion.nombre}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          );
        } else {
          return (
   
            <FormControl variant="outlined" size="small" fullWidth>
              

              <TextField
                type="text"
                id={"search-input-" + parametro.row.id}
                onBlur={(e) =>
                  handleOnBlur(e, parametro)
                }
                onChange={(e)=>{handleOnChange(e) }}
                defaultValue={parametro.row.valor}

                  pattern= "-?[0-9]*(\.[0-9]+)?"

                
              />
            </FormControl>
          );
        }
      },
    },
    {
      field: "rango",
      headerName: "RANGO",
      flex: 1,
    },
    {
      field: "descripcion",
      headerName: "DESCRIPCIÓN",
      flex: 2,
    },
  ];
  function transformarDatos(parametros, noProgramacion) {
    console.log(parametros);
    console.log("NoPRo"+parseInt(noProgramacion));
    return parametros.map((parametro) => {
      let tipoCampoData = "";
      let unidadValor = "";
      let rango;
      let logicaFuncionamiento = "";
      console.log(logicaFuncionamiento, tipoCampoData, unidadValor);
      if (parametro.tipoCampo === "rango") {
        unidadValor = parametro.unidad;
        rango =
          parametro.valor_min +
          "" +
          parametro.unidad +
          "-" +
          parametro.valor_max +
          parametro.unidad;
      } else if (parametro.tipoCampo === "opciones") {
        unidadValor = "N.A";
        rango = parametro.opciones
          .map((opcion, index) => `${index} ,`)
          .join("");

        logicaFuncionamiento = parametro.opciones
          .map((opcion, index) => opcion.valor + "-" + opcion.nombre)
          .join(",");
        rango = "(" + rango.slice(0, -1);
        rango = rango + ")";
      } else {
        tipoCampoData = "Tipo de campo no reconocido";
      }

      return {
        id: parametro.idParametro,
        valor: parametro.valor,
        descripcion: parametro.descripcion || "",
        tipoCampo: parametro.tipoCampo || "",
        tipoParametro: parametro.tipoParametro || "",
        unidad: parametro.unidad || "",
        valor_min: parametro.valor_min || "",
        valor_max: parametro.valor_max || "",
        opciones: parametro.opciones || [],
        rango: rango || "",
        noProgramacion: noProgramacion || "",
      };
    });
  }
  return (
    <Grid container>
      {plantilla == null ? ( // Agrega el loader condicionalmente
        <Grid item xs={12} align="center">
          <CircularProgress size={50} />
        </Grid>
      ) : (
        <Grid container>
          <Grid item xs={12}>
            {plantilla.parametrosGenerales.length > 0 && (
              <Grid item xs={12}>
                <Typography variant="body1" fontWeight={600}>
                  Parámetros Generales
                </Typography>
                <DataGrid
                  rows={transformarDatos(plantilla.parametrosGenerales,null)}
                  columns={columns}
                  pageSize={5}
                  rowHeight={30}
                />
              </Grid>
            )}
          </Grid>
          <Grid item xs={12}>
            <Grid container>
              {plantilla.programaciones
                .filter((programacion) =>
                  checkboxSeleccionados.includes(programacion.noProgramacion)
                )
                .map((programacion) => (
                  <Grid
                    item
                    key={parseInt(programacion.noProgramacion)}
                    xs={12}
                    spacing={1}
                  >
                    <Typography variant="body1" fontWeight={600}>
                      Parámetros de programación {programacion.noProgramacion}
                    </Typography>
                    <DataGrid
                      key={parseInt(programacion.noProgramacion)}
                      rows={transformarDatos(
                        programacion.parametros,
                        parseInt(programacion.noProgramacion)
                      )}
                      columns={columns}
                      pageSize={5}
                      rowHeight={30}
                    />
                  </Grid>
                ))}
            </Grid>
          </Grid>
        </Grid>
      )}
             <ModalGenerico activo={estaActivo} respuesta={respuestaModal} autoCierre={true} onClose={cerrarModal}/>
    </Grid>
  );
};

export default TablaContenido;
