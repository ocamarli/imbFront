import { postData,getData } from "./axios";
import { ENV } from "../utils";
export async function actualizarUsuario(data, token) {
    try {
      const response = await postData(
       ENV.actualizarUsuario(),
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
  export async function obtenerUsuarios(token) {
    try {
      const response = await getData(
        ENV.obtenerUsuarios(),
        token
      );
  
      if (response.status === 200) {
        return await response.json();
      } else {
        return {
          usuarios: [],
          status: false,
          msg: "No se pudo obtener la información de los usuarios",
        };
      }
    } catch (error) {
      return { usuarios: [], status: false, msg: error.message};
    }
  }
  export async function obtenerUsuario(token,idUsuario) {
    try {
      console.log("ID2", idUsuario);
      const response = await getData(
        ENV.obtenerUsuario(idUsuario),
        token
      );
  
      if (response.status === 200) {
        return await response.json();
      } else {
        return {
          usuarios: [],
          status: false,
          msg: "No se pudo obtener la información de los usuarios",
        };
      }
    } catch (error) {
      return { usuarios: [], status: false, msg: error.message};
    }
  }
  export async function actualizarEstatusUsuario(data,token) {
    try {

      const response = await postData(
        ENV.actualizarEstatusUsuario(),
        data,
        token
      );
  
      if (response.status === 200) {
        return await response.json();
      } else {
        return {
          usuarios: [],
          status: false,
          msg: "No se pudo actualizar al usuario",
        };
      }
    } catch (error) {
      return { usuarios: [], status: false, msg: error.message};
    }
  }
  export async function authenticate(data) {
    try {
      const response = await postData(ENV.login(), data);
      if (response.status === 200) {
        return await response.json();
      } else {
        return { status: false, msg: "No encontró información" };
      }
    } catch (error) {
      return { status: false, msg: error.message };
    }
  }
  export async function crearUsuario(data, token) {
    try {
      const response = await postData(ENV.crearUsuario(), data, token);
      console.log(response.status)
      if (response.status === 200) {
        return await response.json();
      } else {
        return { status: false, msg: "No encontró información" };
      }
    } catch (error) {
      return { status: false, msg: error.message };
    }
  }
  