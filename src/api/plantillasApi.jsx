import { postData,getData } from "./axios";
import { ENV } from "../utils";
// Función para actualizar un plantilla
export async function actualizarPlantilla(data, token) {
  try {
    const response = await postData(ENV.actualizarPlantilla(), data, token);
    if (response.status === 200) {
      return await response.json();
    } else {
      return { status: false, msg: "Error al actualizar plantilla" };
    }
  } catch (error) {
    return { status: false, msg: error.message };
  }
}

// Función para obtener todos los GAEs
export async function obtenerPlantillas(token, estatus = null) {
  try {
    let url = ENV.obtenerPlantillas();
    if (estatus !== null) {
      url += `?estatus=${estatus}`;
    }

    const response = await getData(url, token);

    if (response.status === 200) {
      return await response.json();
    } else {
      return {
        firmwares: [],
        status: false,
        msg: "No se pudo obtener la información de las plantillas.",
      };
    }
  } catch (error) {
    return { firmwares: [], status: false, msg: error.message };
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
        return { status: false, msg: "No se pudo guardar la plantilla." };
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
  export async function clonarPlantilla(data,token) {
    try {
      const response = await postData(
      ENV.clonarPlantilla(),
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