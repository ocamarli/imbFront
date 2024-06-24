import { postData,getData } from "./axios";
import { ENV } from "../utils";
export async function crearParametro(data, token) {
    try {
      const response = await postData(
        ENV.crearParametro(),
        data,
        token
      );
      console.log(data)
      if (response.status === 200) {
        return await response.json();
      } else {
        return { status: false, msg: "Could not set parameters" };
      }
    } catch (error) {
      return { status: false, msg: error.message };
    }
  }
  export async function obtenerParametros(token) {
    try {
      const response = await getData(
        ENV.obtenerParametros(),
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
  // Función para obtener un parametro por su ID
export async function obtenerParametro(token, idParametro) {
  try {
    const response = await getData(ENV.obtenerParametro(idParametro), token);

    if (response.status === 200) {
      return await response.json();
    } else {
      return {
        parametro: [],
        status: false,
        msg: "No se pudo obtener la información de parametro",
      };
    }
  } catch (error) {
    return { parametro: [], status: false, msg: error.message };
  }
}
// Función para actualizar un parametro
export async function actualizarParametro(data, token) {
  try {
    const response = await postData(ENV.actualizarParametro(), data, token);
    if (response.status === 200) {
      return await response.json();
    } else {
      return { status: false, msg: "Error al actualizar parametro" };
    }
  } catch (error) {
    return { status: false, msg: error.message };
  }
}
