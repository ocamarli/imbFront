import React, { useState, useRef, useEffect, useCallback } from "react";
import { Button, Box, Grid, Divider } from "@mui/material";
import CodeEditor from "@uiw/react-textarea-code-editor";
import { useTheme } from "@mui/material";
import { obtenerCodigos } from "../../api/axios";
import { setFileTemplate } from "../../api/axios";
function InputCodigo(props) {
  const { setMatches, onClose,tipoCodigo } = props;
  const [codigo, setCodigo] = useState("");
  const theme = useTheme();
  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleUpdate = () => {
    setFetchFileTemplate({ text: codigo, id_template: "id_template" });
    onClose();
  };

  const setFetchFileTemplate = useCallback(async (data) => {
    try {
      
      if (
        JSON.parse(sessionStorage.getItem("ACCSSTKN")).access_token !==
        undefined
      ) {
        const response = await setFileTemplate(
          data,
          JSON.parse(sessionStorage.getItem("ACCSSTKN")).access_token
        );
        console.log(response);
      }
    } catch (error) {
      
      console.log("error");
    }
  },[]);
  const fetchObtenerCodigos =  useCallback(async (data) => {
    try {
      const tkn = JSON.parse(sessionStorage.getItem("ACCSSTKN"))?.access_token;
      if (tkn !== undefined)
      {
        const respuesta = await obtenerCodigos(tkn);
        respuesta.codigos.forEach(codigo => {
          if (codigo.nombre === tipoCodigo) {
              setCodigo(codigo.valor);
              console.log(codigo.nombre);
          } else if (codigo.nombre === "codigoProgramaciones") {
              console.log(codigo.nombre);
          }
      });
      }
    } catch (error) { 
      console.log("error");
      setCodigo("");
    }
  },[tipoCodigo]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target.result;
      setCodigo(content);
    };
    reader.readAsText(file);
  };

  useEffect(() => {
    const regex = /\{(.+?)\}/g; // Agregamos la flag "g" para encontrar todas las coincidencias
    const matches = codigo.match(regex);
    if (matches) {
      const foundValues = matches.map((match) =>
        match.substring(1, match.length - 1)
      ); // Removemos los caracteres "{ }"

      setMatches(foundValues);
      console.log(foundValues);
    } else {

      setMatches([]);
    }
  }, [codigo, setMatches]);
  useEffect(() => {
    fetchObtenerCodigos();
  }, [fetchObtenerCodigos]);
  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <>
          <input
            type="file"
            onChange={handleFileChange}
            ref={fileInputRef}
            style={{ display: "none" }}
          />
          <textarea
            value={codigo}
            onChange={(event) => setCodigo(event.target.value)}
            style={{ display: "none" }}
          />
          <Box
            style={{
              display: "flex",
              justifyContent: "space-between",
              height: "justifyContent",
              
            }}
          mt={1}
          >
           
            <Button  variant="contained" onClick={handleButtonClick}>
              Subir Código base
            </Button>

          </Box>
        </>
      </Grid>
      <Grid item xs={12}>
        <Divider />
      </Grid>
      <Grid
        item
        xs={12}
        style={{ overflowY: "scroll", maxHeight: "500px", fontSize: ".6em" }}
      >
        <CodeEditor
          data-color-mode={theme.palette.mode}
          value={codigo}
          language="c"
          placeholder="code."
          onChange={(evn) => setCodigo(evn.target.value)}
          padding={5}
          style={{
            minWith: "100%",
            fontSize: 12,
            fontFamily:
              "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
            backgroundColor:
              theme.palette.mode === "dark" ? "#121212" : "#f6f8fa",
          }}
        />
      </Grid>
      <Grid
        item
        xs={12}
        sx={{display:"flex",justifyContent:"end"}}
      >
        <Button sx={{marginTop:"3em"}} variant="contained" type="submit" onClick={handleUpdate}>
          SALVAR
        </Button>
      </Grid>
    </Grid>
  );
}

export default InputCodigo;
