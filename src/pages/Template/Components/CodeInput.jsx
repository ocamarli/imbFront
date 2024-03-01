import React, { useState, useRef, useEffect, useCallback } from "react";
import { Button, Box, Grid, Divider } from "@mui/material";
import CodeEditor from "@uiw/react-textarea-code-editor";
import { useTheme } from "@mui/material";
import { getFileTemplate, setFileTemplate } from "../../../api/axios";
function CodeInput(props) {
  const { id_template, setMatches, onClose } = props;

  const [fileText, setFileText] = useState("");
  const theme = useTheme();
  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const id_templateRef = useRef(id_template);
  useEffect(() => {
    get_fetchFileTemplate(id_templateRef.current);
  }, []);

  const handleUpdate = () => {
    setFetchFileTemplate({ text: fileText, id_template: id_template });
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
  const get_fetchFileTemplate = async (data) => {
    try {
      
      if (
        JSON.parse(sessionStorage.getItem("ACCSSTKN")).access_token !==
        undefined
      ) {
        const response = await getFileTemplate(
          data,
          JSON.parse(sessionStorage.getItem("ACCSSTKN")).access_token
        );
        console.log("response", response);
        setFileText(response.code);
        
      }
    } catch (error) {
      
      console.log("error");
      setFileText("");
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target.result;
      setFileText(content);
    };
    reader.readAsText(file);
  };

  useEffect(() => {
    const regex = /\{(.+?)\}/g; // Agregamos la flag "g" para encontrar todas las coincidencias
    const matches = fileText.match(regex);
    if (matches) {
      const foundValues = matches.map((match) =>
        match.substring(1, match.length - 1)
      ); // Removemos los caracteres "{ }"

      setMatches(foundValues);
      console.log(foundValues);
    } else {

      setMatches([]);
    }
  }, [fileText, setMatches]);

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
            value={fileText}
            onChange={(event) => setFileText(event.target.value)}
            style={{ display: "none" }}
          />
          <Box
            style={{
              display: "flex",
              justifyContent: "space-between",
              height: "justifyContent",
            }}
          >
            <Button variant="outlined" onClick={handleButtonClick}>
              Upload base code
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
          value={fileText}
          language="c"
          placeholder="code."
          onChange={(evn) => setFileText(evn.target.value)}
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
        <Button sx={{marginTop:"3em"}} variant="outlined" type="submit" onClick={handleUpdate}>
          SAVE/CLOSE
        </Button>
      </Grid>
    </Grid>
  );
}

export default CodeInput;
