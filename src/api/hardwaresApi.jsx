import { postData,getData } from "./axios";
import { ENV } from "../utils";
export async function actualizarHardware(data, token) {
  try {
    const response = await postData(
     ENV.actualizarHardware(),
      data,
      token
    );
    console.log(data)
    if (response.status === 200) {
      return await response.json();
    } else {
      return { status: false, msg: "Erro al actualizar Hardware" };
    }
  } catch (error) {
    return { status: false, msg: error.message };
  }
} 
export async function obtenerHardware(token,idHardware) {
  try {
    console.log("ID2", idHardware);
    const response = await getData(
      ENV.obtenerHardware(idHardware),
      token
    );

    if (response.status === 200) {
      return await response.json();
    } else {
      return {
        hardware: [],
        status: false,
        msg: "No se pudo obtener la información del hardware",
      };
    }
  } catch (error) {
    return { hardware: [], status: false, msg: error.message};
  }
}
export async function obtenerHardwares(token) {
    try {
      const response = await getData(
        ENV.obtenerHardwares(),
        token
      );
  
      if (response.status === 200) {
        return await response.json();
      } else {
        return {
          hardwares: [],
          status: false,
          msg: "No se pudo obtener información de los hardwares.",
        };
      }
    } catch (error) {
      return { hardwares: [], status: false, msg: error.message};
    }
  }
  export async function crearHardware(data, token) {
    try {
      const response = await postData(
       ENV.crearHardware(),
        data,
        token
      );
      console.log(data)
      if (response.status === 200) {
        return await response.json();
      } else {
        return { status: false, msg: "No se pudo guardar hardware." };
      }
    } catch (error) {
      return { status: false, msg: error.message };
    }
  }