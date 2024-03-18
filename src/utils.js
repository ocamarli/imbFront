
const api = {
  baseuri: "http://127.0.0.1:5000/api/v1/",
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
    obtenerParametros:"parametro/obtenerParametros",
    obtenerUsuarios:"usuario/obtenerUsuarios",
    obtenerPlantillas:"plantilla/obtenerPlantillas",
    obtenerPlantilla:"plantilla/obtenerPlantilla",
    obtenerRecetas:"receta/obtenerRecetas",
    crearPlantilla:"plantilla/crearPlantilla",
    actualizarParametroPlantilla:"plantilla/actualizarParametro",
    obtenerGaes:"gae/obtenerGaes",
    crearGae:"gae/crearGae",
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
    obtenerPlantillas:()=>api.baseuri+api.endpoints.obtenerPlantillas,
    obtenerPlantilla:(idPlantilla)=>api.baseuri+api.endpoints.obtenerPlantilla+"/"+idPlantilla,
    obtenerRecetas:()=>api.baseuri+api.endpoints.obtenerRecetas,
    crearPlantilla:()=>api.baseuri+api.endpoints.crearPlantilla,
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