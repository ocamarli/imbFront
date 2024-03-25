const api = {
  baseuri: "https://imbvikkonapi.azurewebsites.net/api/v1/",
  endpoints: {
    login: "login",
    user: "user",
    crearParametro:"parametro/crearParametro",
    recipeSet:"recipe/set",
    recipesGet:"recipes/get",
    templatesSet:"templates/set",
    fullTemplatesGet:"fulltemplates/get",
    templatesGet:"templates/get",
    registerSet:"register/set",
    fileTemplateSet:"fileTemplate/set",
    fileTemplateGet:"fileTemplate/get",
    parameterRecipeUpdate:"recipe/parameter/update",
    parameterRecipeGet:"recipe/parameter/get",
    recipeGet:"recipe/",
    actualizarParametroPlantilla:"plantilla/actualizarParametro",
    obtenerParametros:"parametro/obtenerParametros",
    obtenerUsuarios:"usuario/obtenerUsuarios",
    obtenerPlantillas:"plantilla/obtenerPlantillas",
    obtenerPlantilla:"plantilla/obtenerPlantilla",
    obtenerRecetas:"receta/obtenerRecetas",
    obtenerFirmwares: "firmware/obtenerFirmwares",
    obtenerHardwares:"hardware/obtenerHardwares",
    crearPlantilla:"plantilla/crearPlantilla",
    obtenerGaes:"gae/obtenerGaes",
    crearGae:"gae/crearGae",
    crearFirware:"firmware/crearFirmware",
    crearHardware:"hardware/crearHardware",
    copiarPlantilla:"plantilla/copiarPlantilla"
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
    crearGae:()=> api.baseuri+api.endpoints.crearGae,
    obtenerUsuarios:()=>api.baseuri+api.endpoints.obtenerUsuarios,
    actualizarParametroPlantilla:()=>api.baseuri+api.endpoints.actualizarParametroPlantilla,
    obtenerFirmwares:()=>api.baseuri+api.endpoints.obtenerFirmwares,
    obtenerHardwares:()=>api.baseuri+api.endpoints.obtenerHardwares,
    obtenerPlantillas:()=>api.baseuri+api.endpoints.obtenerPlantillas,
    crearFirware:()=>api.baseuri+api.endpoints.crearFirware,
    crearHardware:()=>api.baseuri+api.endpoints.crearHardware,
    obtenerPlantilla:(idPlantilla)=>api.baseuri+api.endpoints.obtenerPlantilla+"/"+idPlantilla,
    obtenerRecetas:()=>api.baseuri+api.endpoints.obtenerRecetas,
    crearPlantilla:()=>api.baseuri+api.endpoints.crearPlantilla,
    copiarPlantilla:()=>api.baseuri+api.endpoints.copiarPlantilla,
    login:()=> api.baseuri+api.endpoints.login,
    user:()=> api.baseuri+api.endpoints.user,
    obtenerParametros: () => api.baseuri + api.endpoints.obtenerParametros,
    crearParametro:() => api.baseuri + api.endpoints.crearParametro,
    getRecipes:()=> api.baseuri+api.endpoints.recipesGet,
    setTemplates:()=> api.baseuri+api.endpoints.templatesSet,
    getParameters:()=>api.baseuri+api.endpoints.parametersGet,
    getFullTemplates:()=>api.baseuri+api.endpoints.fullTemplatesGet,
    getTemplates:()=>api.baseuri+api.endpoints.templatesGet,
    setRegister:()=>api.baseuri+api.endpoints.registerSet,
    setFileTemplate:()=>api.baseuri+api.endpoints.fileTemplateSet,
    getFileTemplate:()=>api.baseuri+api.endpoints.fileTemplateGet,
    updateParameterRecipe:()=>api.baseuri+api.endpoints.parameterRecipeUpdate,
    getParameterRecipe:()=>api.baseuri+api.endpoints.parameterRecipeGet,
    getRecipe:(id_recipe)=>api.baseuri+api.endpoints.recipeGet+id_recipe,
};