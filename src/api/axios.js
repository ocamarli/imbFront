import { ENV } from "../utils";

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


export async function obtenerCodigos(token) {
  try {
    const response = await getData(
      ENV.obtenerCodigos(),
      token
    );

    if (response.status === 200) {
      return await response.json();
    } else {
      return {
        text:"",
        status: false,
        msg: "No pudo obtener información de los códigos",
      };
    }
  } catch (error) {
    return { text: "", status: false, msg: error.message};
  }
}


export async function postData(url = "", data = {}, token = undefined) {
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
export async function getData(url = "", token = undefined) {
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
