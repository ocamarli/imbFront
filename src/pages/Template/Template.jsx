import { Button, Dialog } from "@mui/material";
import React, { useCallback, useState } from "react";
import store from "../../store";
import { Provider } from "react-redux";
import CardTemplate from "./Components/CardTemplate";
import AddTemplate from "./Components/AddTemplate";
import { getTemplates } from "../../api/axios";
import { useEffect } from "react";
import Typography from "@mui/material/Typography";
import { Grid, Paper, CircularProgress } from "@mui/material";

function Parameters(props) {
  const { onResponse } = props;
  const [open, setOpen] = useState(false); // Define el estado "open" en el componente padre
  const [isLoading, setIsLoading] = useState(false);
  const [templates, setTemplates] = useState([]);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = (props) => {
    setOpen(false);
    fetchTemplates();
  };

  const fetchTemplates = useCallback(async () => {
    try {
      setIsLoading(true);
      const tkn = JSON.parse(sessionStorage.getItem("ACCSSTKN"))?.access_token;
      if (tkn !== undefined) {
        const json = await getTemplates(tkn);
        setTemplates(json.templates);
        onResponse({ status: json.status, msg: json.msg });
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      onResponse({ status: false, msg: "Error" });
    }
  }, [onResponse]);

  useEffect(() => {
    fetchTemplates();
  }, [fetchTemplates]);

  return (
    <Provider store={store}>
      <Grid container padding={2}>
        <Grid item xs={12}>
          <Dialog open={open} onClose={handleClose}>
            <AddTemplate open={open} handleClose={handleClose}></AddTemplate>
          </Dialog>
        </Grid>
        <Grid item xs={12}>
          <Paper style={{ padding: 20 }}>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <Button variant="outlined" onClick={handleClickOpen}>
                  Add new template
                </Button>
                <br />
                <br />
                <Typography variant="h6">List of templates</Typography>
                {isLoading && ( // Agrega el loader condicionalmente
                  <Grid item xs={12} align="center">
                    <CircularProgress size={50} />
                  </Grid>
                )}
                <Grid container spacing={2}>
                  {templates.map((template, index) => (
                    <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
                      <CardTemplate template={template} />
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Provider>
  );
}
export default Parameters;
