import { postData,getData } from "./axios";
import { ENV } from "../utils";
export async function obtenerPlantillas(token) {
    try {
      const response = await getData(
        ENV.obtenerPlantillas(),
        token
      );
  
      if (response.status === 200) {
        return await response.json();
      } else {
        return {
          parameters: [],
          status: false,
          msg: "No se pudo obtener información de las plantillas.",
        };
      }
    } catch (error) {
      return { parameters: [], status: false, msg: error.message};
    }
  }
  export async function obtenerPlantilla(token,idPlantilla) {
    try {
      const response = await getData(
        ENV.obtenerPlantilla(idPlantilla),
        token
      );
  
      if (response.status === 200) {
        return await response.json();
      } else {
        return {
          parameters: [],
          status: false,
          msg: "No se pudo obtener información de las plantillas."
        };
      }
    } catch (error) {
      return { parameters: [], status: false, msg: error.message};
    }
  }
  export async function crearPlantilla(data, token) {
    try {
      const response = await postData(
       ENV.crearPlantilla(),
        data,
        token
      );
      console.log(data)
      if (response.status === 200) {
        return await response.json();
      } else {
        return { status: false, msg: "No se pudo guardar la receta." };
      }
    } catch (error) {
      return { status: false, msg: error.message };
    }
  }
  export async function actualizarParametroPlantilla(data,token) {
    try {
      const response = await postData(
      ENV.actualizarParametroPlantilla(),
        {data},
        token
      );
  
      if (response.status === 200) {
        return await response.json();
      } else {
        return {
          parameters: [],
          status: false,
          msg: "Could not retrieve parameters",
        };
      }
    } catch (error) {
      return { parameters: [], status: false, msg: error.message};
    }
  }
  export async function copiarPlantilla(data,token) {
    try {
      const response = await postData(
      ENV.copiarPlantilla(),
        data,
        token
      );
  
      if (response.status === 200) {
        return await response.json();
      } else {
        return {
          status: false,
          msg: "No se puede realizar la copia de la plantilla",
        };
      }
    } catch (error) {
      return {  status: false, msg: error.message};
    }
  }