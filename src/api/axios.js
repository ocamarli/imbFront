import { ENV } from "../utils";
export async function authenticate(data) {
  try {
    const response = await postData(ENV.login(), data);
    if (response.status === 200) {
      return await response.json();
    } else {
      return { status: false, msg: "Could not retrieve user data" };
    }
  } catch (error) {
    return { status: false, msg: error.message };
  }
}
export async function setRegister(data, token) {
  try {
    const response = await postData(ENV.setRegister(), data, token);
    console.log(response.status)
    if (response.status === 200) {
      return await response.json();
    } else {
      return { status: false, msg: "Could not retrieve user data" };
    }
  } catch (error) {
    return { status: false, msg: error.message };
  }
}
export async function setFileTemplate(data, token) {
  try {
    const response = await postData(ENV.setFileTemplate(), data, token);
    console.log("data")
    console.log(data)
    if (response.status === 200) {
      return await response.json();
    } else {
      return { status: false, msg: "Could not retrieve file data" };
    }
  } catch (error) {
    return { status: false, msg: error.message };
  }
}
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
      return { status: false, msg: "No se pudo guardar la receta." };
    }
  } catch (error) {
    return { status: false, msg: error.message };
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
      return { status: false, msg: "No se pudo guardar gae." };
    }
  } catch (error) {
    return { status: false, msg: error.message };
  }
}
export async function setRecipe(data, token) {
  try {
    const response = await postData(
     ENV.setRecipe(),
      data,
      token
    );
    console.log(data)
    if (response.status === 200) {
      return await response.json();
    } else {
      return { status: false, msg: "Could not set recipe" };
    }
  } catch (error) {
    return { status: false, msg: error.message };
  }
}
export async function setParametersTemplate(data, token) {
  try {
    const response = await postData(
     ENV.setTemplates(),
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
export async function obtenerPlantillas(token) {
  try {
    const response = await getData(
      ENV.obtenerPlantillas(),
      token
    );

    if (response.status === 200) {
      return await response.json();
    } else {
      return {
        parameters: [],
        status: false,
        msg: "No se pudo obtener información de las plantillas.",
      };
    }
  } catch (error) {
    return { parameters: [], status: false, msg: error.message};
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
export async function getParameters(token) {
  try {
    const response = await getData(
      ENV.getParameters(),
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
export async function getRecipes(token) {
  try {
    const response = await getData(
     ENV.getRecipes(),
      token
    );

    if (response.status === 200) {
      return await response.json();
    } else {
      return {
        recipes: [],
        status: false,
        msg: "Could not retrieve recipes",
      };
    }
  } catch (error) {
    return { recipes: [], status: false, msg: error.message};
  }
}
export async function obtenerRecetas(token) {
  try {
    const response = await getData(
     ENV.obtenerRecetas(),
      token
    );

    if (response.status === 200) {
      return await response.json();
    } else {
      return {
        recetas: [],
        status: false,
        msg: "No se pudo obtener la información de las recetas",
      };
    }
  } catch (error) {
    return { recipes: [], status: false, msg: error.message};
  }
}
export async function getRecipe(id_recipe,token) {
  try {
    const response = await getData(
     ENV.getRecipe(id_recipe),
     {id_recipe},
      token
    );

    if (response.status === 200) {
      return await response.json();
    } else {
      return {
        recipe: "",
        status: false,
        msg: "Could not retrieve recipe",
      };
    }
  } catch (error) {
    return { recipes: "", status: false, msg: error.message};
  }
}
export async function getParametersTemplate(id_template,token) {
  try {
    const response = await postData(
    ENV.getFullTemplates(),
      {id_template},
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
export async function copiarPlantilla(data,token) {
  try {
    const response = await postData(
    ENV.copiarPlantilla(),
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
export async function getParameterRecipe(data,token) {
  try {
    const response = await postData(
    ENV.getParameterRecipe(),
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
export async function getTemplates(token) {
  try {
    const response = await getData(
      ENV.getTemplates(),
      token
    );

    if (response.status === 200) {
      return await response.json();
    } else {
      return {
        templates: [],
        status: false,
        msg: "Could not retrieve templates",
      };
    }
  } catch (error) {
    return { templates: [], status: false, msg: error.message};
  }
}
export async function getFileTemplate(id_template,token) {
  try {
    const response = await postData(
      ENV.getFileTemplate(),
      {id_template},
      token
    );

    if (response.status === 200) {
      return await response.json();
    } else {
      return {
        text:"",
        status: false,
        msg: "Could not retrieve templates",
      };
    }
  } catch (error) {
    return { text: "", status: false, msg: error.message};
  }
}


async function postData(url = "", data = {}, token = undefined) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors",
    headers: new Headers({
      "Content-Type": "application/json",
      "Content-Length": JSON.stringify(data).length,
      "Access-Control-Allow-Origin": "*",
      Authorization: token !== undefined ? "Bearer " + token : "0",
    }),
    
    body: JSON.stringify(data), // body data type must match "Content-Type" header
    
  });
  console.log(JSON.stringify(data))
  return response;
}
async function getData(url = "", token = undefined) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: "GET", // *GET, POST, PUT, DELETE, etc.
    mode: "cors",
    headers: new Headers({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      Authorization: token !== undefined ? "Bearer " + token : "0",
    }),


  });

  return response;
}
