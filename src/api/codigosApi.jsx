import { postData, getData } from "./axios";
import { ENV } from "../endpoints";

export async function actualizarCodigo(data, token) {
  try {
    const response = await postData(ENV.actualizarFirmware(), data, token);
    if (response.status === 200) {
      return await response.json();
    } else {
      return { status: false, msg: "Error al actualizar firmware" };
    }
  } catch (error) {
    return { status: false, msg: error.message };
  }
}
