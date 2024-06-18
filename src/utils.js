const api = {
  baseuri: "http://127.0.0.1:5000/api/v1/",
  endpoints: {
    login: "login",
    user: "user",
    actualizarUsuario:"usuario/actualizarUsuario",
    actualizarEstatusUsuario:"usuario/actualizarEstatusUsuario",
    deshabilitarUsuario:"usuario/deshabilitarUsuario",
    crearParametro:"parametro/crearParametro",
    registerSet:"register/set",
    obtenerParametros:"parametro/obtenerParametros",
    obtenerUsuarios:"usuario/obtenerUsuarios",
    obtenerUsuario:"usuario/obtenerUsuario",
    actualizarParametroPlantilla:"plantilla/actualizarParametro",    
    obtenerPlantillas:"plantilla/obtenerPlantillas",
    obtenerPlantilla:"plantilla/obtenerPlantilla",
    crearPlantilla:"plantilla/crearPlantilla",    
    copiarPlantilla:"plantilla/copiarPlantilla",    
    obtenerRecetas:"receta/obtenerRecetas",
    obtenerFirmwares: "firmware/obtenerFirmwares",
    obtenerFirmware: "firmware/obtenerFirmware",
    crearFirmware:"firmware/crearFirmware",
    actualizarFirmware:"firmware/actualizarFirmware",
    obtenerHardwares:"hardware/obtenerHardwares",
    obtenerHardware:"hardware/obtenerHardware",
    crearHardware:"hardware/crearHardware",
    actualizarHardware:"hardware/actualizarHardware",
    obtenerGaes:"gae/obtenerGaes",
    obtenerGae:"gae/obtenerGae",
    crearGae:"gae/crearGae",
    actualizarGae:"gae/actualizarGae",
    obtenerCodigos:"codigo/obtenerCodigos",
    crearUsuario:"usuario/crearUsuario"
  },
};
/*
 baseuri: "https://imbvikkonapi.azurewebsites.net/api/v1/",
 "https://vikkonapi.azurewebsites.net/api/v1/"
function Encode2Url(obj) {
  var str = [];
  for(var p in obj)
     str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
  return str.join("&");
}
*/
export const ENV = {

    obtenerGaes:()=> api.baseuri+api.endpoints.obtenerGaes,
    obtenerGae:(idGae)=>api.baseuri+api.endpoints.obtenerGae+"/"+idGae,
    crearGae:()=> api.baseuri+api.endpoints.crearGae,
    actualizarGae:()=>api.baseuri+api.endpoints.actualizarGae,
    crearFirmware:()=> api.baseuri+api.endpoints.crearFirmware,
    actualizarUsuario:()=>api.baseuri+api.endpoints.actualizarUsuario,
    actualizarEstatusUsuario :() =>api.baseuri+api.endpoints.actualizarEstatusUsuario,
    obtenerUsuarios:()=>api.baseuri+api.endpoints.obtenerUsuarios,
    obtenerUsuario:(idUsuario)=>api.baseuri+api.endpoints.obtenerUsuario+"/"+idUsuario,
    actualizarParametroPlantilla:()=>api.baseuri+api.endpoints.actualizarParametroPlantilla,
    obtenerFirmwares:()=>api.baseuri+api.endpoints.obtenerFirmwares,
    obtenerFirmware:(idFirmware)=>api.baseuri+api.endpoints.obtenerFirmware+"/"+idFirmware,
    actualizarFirmware:()=>api.baseuri+api.endpoints.actualizarFirmware,
    obtenerHardwares:()=>api.baseuri+api.endpoints.obtenerHardwares,
    obtenerHardware:(idHardware)=>api.baseuri+api.endpoints.obtenerHardware+"/"+idHardware,
    crearHardware:()=> api.baseuri+api.endpoints.crearHardware,
    actualizarHardware:()=> api.baseuri+api.endpoints.actualizarHardware,
    obtenerPlantillas:()=>api.baseuri+api.endpoints.obtenerPlantillas,
    obtenerPlantilla:(idPlantilla)=>api.baseuri+api.endpoints.obtenerPlantilla+"/"+idPlantilla,
    crearPlantilla:()=>api.baseuri+api.endpoints.crearPlantilla,
    copiarPlantilla:()=>api.baseuri+api.endpoints.copiarPlantilla,    
    obtenerRecetas:()=>api.baseuri+api.endpoints.obtenerRecetas,
    login:()=> api.baseuri+api.endpoints.login,
    user:()=> api.baseuri+api.endpoints.user,
    obtenerParametros: () => api.baseuri + api.endpoints.obtenerParametros,
    crearParametro:() => api.baseuri + api.endpoints.crearParametro,
    crearUsuario:()=>api.baseuri+api.endpoints.crearUsuario,
    obtenerCodigos:()=>api.baseuri+api.endpoints.obtenerCodigos,
};