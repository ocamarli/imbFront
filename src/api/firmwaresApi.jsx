import { postData,getData } from "./axios";
import { ENV } from "../utils";
export async function actualizarFirmware(data, token) {
  try {
    const response = await postData(
     ENV.actualizarFirmware(),
      data,
      token
    );
    console.log(data)
    if (response.status === 200) {
      return await response.json();
    } else {
      return { status: false, msg: "Erro al actualizar firmware" };
    }
  } catch (error) {
    return { status: false, msg: error.message };
  }
} 
export async function crearFirmware(data, token) {
    try {
      const response = await postData(
       ENV.crearFirmware(),
        data,
        token
      );
      console.log(data)
      if (response.status === 200) {
        return await response.json();
      } else {
        return { status: false, msg: "No se pudo guardar firmware." };
      }
    } catch (error) {
      return { status: false, msg: error.message };
    }
  }
  export async function obtenerFirmwares(token) {
    try {
      const response = await getData(
        ENV.obtenerFirmwares(),
        token
      );
  
      if (response.status === 200) {
        return await response.json();
      } else {
        return {
          firmwares: [],
          status: false,
          msg: "No se pudo obtener información de los firmwares.",
        };
      }
    } catch (error) {
      return { firmwares: [], status: false, msg: error.message};
    }
  }
