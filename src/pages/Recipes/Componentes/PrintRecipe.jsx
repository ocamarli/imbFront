import React, { useEffect } from "react";
import { Button,  Grid, Divider, Modal, Paper } from "@mui/material";
import CodeEditor from "@uiw/react-textarea-code-editor";
import { useTheme } from "@mui/material";
import { saveAs } from 'file-saver';

function PrintRecipe(props) {
  const { fileText, open, handleClose } = props;
  const theme = useTheme();
  const handleDownloadFile = () => {
    const blob = new Blob(["Hello, world!"], {type: "text/plain;charset=utf-8"});
    saveAs(blob, "hello world.txt");
  };

  useEffect(() => {}, []);

  return (
    <Modal open={open} onClose={handleClose} className="ap-modal">
      <Paper
        elevation={3}
        spacing={5}
        sx={{
          minWidth: "calc(80vw)",
          padding: 3,
          height: "fit-content",
          maxWidth: "calc(90vw)",
        }}
      >
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid
            item
            xs={12}
            style={{
              overflowY: "scroll",
              maxHeight: "500px",
              fontSize: ".6em",
            }}
          >
            <CodeEditor
              data-color-mode={theme.palette.mode}
              value={fileText}
              language="c"
              placeholder="code."
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
          <Grid item xs={12} spacing={2}>
            <Grid container sx={{ justifyContent: "flex-end" }} spacing={2}>
              <Grid item>
                <Button variant="outlined" color="primary" type="submit" onClick={handleDownloadFile}>
                  Accept
                </Button>
              </Grid>
              <Grid item>
                <Button variant="contained" onClick={handleClose}>
                  Close
                </Button>
              </Grid>
            </Grid>
          </Grid>          
        </Grid>
      </Paper>
    </Modal>
  );
}

export default PrintRecipe;
