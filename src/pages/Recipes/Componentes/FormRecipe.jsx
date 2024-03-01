import React, { useState, useEffect, useCallback } from "react";

import { Button, Grid, Paper, Modal } from "@mui/material";
import Typography from "@mui/material/Typography";
import ParameterForm from "./ParameterForm";

import { getParametersTemplate } from "../../../api/axios";
const FormRecipe = (props) => {
  const { recipe, open, handleClose } = props;
  const [parameters, setParameters] = useState([]);

  const fetchParameters = useCallback(async () => {
    try {
      const tkn = JSON.parse(sessionStorage.getItem("ACCSSTKN"))?.access_token;
      if (tkn !== undefined) {
        const json = await getParametersTemplate(recipe.id_template, tkn);

        setParameters(JSON.parse(json.template).parameters);
        console.log(JSON.parse(json.template).parameters);
        console.log(JSON.parse(json.template))
      } else {
        setParameters([]);
        //onResponse({status:false, msg: "Unauthorized Access"})
      }

    } catch (error) {
      //onResponse({ status: false, msg: error });
      console.error(error);
    }
  }, [recipe]);
  useEffect(() => {
    fetchParameters();

  }, [fetchParameters]);

  return (
    <Modal open={open} onClose={handleClose} className="ap-modal">
      <Paper
        variant={"outlined"}
        spacing={2}
        sx={{
          padding: 3,
          width: "calc(95vw)",
          height: "calc(95vh)",
        }}
      >
        <Grid container>
          <Grid item xs={12} spacing={2}>
            <Paper style={{ padding: 10 }}>
              <Typography variant="h5" sx={{ fontWeight: 500 }}>
                Recipe: {recipe.name}
              </Typography>
            </Paper>
          </Grid>

          {parameters.map((parameter) => (
            <ParameterForm
              key={parameter.name}
              recipe={recipe}
              parameter={parameter}
            />
          ))}

          <Grid item xs={12}>
            <Grid container sx={{ display:"flex", marginTop:"3em", justifyContent: "flex-end" }}>
              <Grid item>
                <Button variant="outlined" type="submit" onClick={handleClose}>
                  Accept
                </Button>
              </Grid>
              <Grid item>
                <Button variant="outlined" onClick={handleClose}>
                  Close
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Modal>
  );
};

export default FormRecipe;
