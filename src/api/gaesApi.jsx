import { postData,getData } from "./axios";
import { ENV } from "../utils";

export async function actualizarGae(data, token) {
  try {
    const response = await postData(
     ENV.actualizarGae(),
      data,
      token
    );
    console.log(data)
    if (response.status === 200) {
      return await response.json();
    } else {
      return { status: false, msg: "Error al actualizar GAE" };
    }
  } catch (error) {
    return { status: false, msg: error.message };
  }
} 

export async function obtenerGaes(token) {
    try {
      const response = await getData(
        ENV.obtenerGaes(),
        token
      );
  
      if (response.status === 200) {
        return await response.json();
      } else {
        return {
          gaes: [],
          status: false,
          msg: "No se pudo obtener la información de los gaes.",
        };
      }
    } catch (error) {
      return { gaes: [], status: false, msg: error.message};
    }
  }
  export async function obtenerGae(token,idGae) {
    try {
      console.log("ID2", idGae);
      const response = await getData(
        ENV.obtenerGae(idGae),
        token
      );
  
      if (response.status === 200) {
        return await response.json();
      } else {
        return {
          gae: [],
          status: false,
          msg: "No se pudo obtener la información de GAE",
        };
      }
    } catch (error) {
      return { gaes: [], status: false, msg: error.message};
    }
  }
  export async function crearGae(data, token) {
    try {
      const response = await postData(
       ENV.crearGae(),
        data,
        token
      );
      console.log(data)
      if (response.status === 200) {
        return await response.json();
      } else {
        return { status: false, msg: "Error al guardar GAE." };
      }
    } catch (error) {
      return { status: false, msg: error.message };
    }
  }