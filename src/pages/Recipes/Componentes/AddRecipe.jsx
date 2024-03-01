import React from "react";
import { setRecipe } from "../../../api/axios";
import Typography from "@mui/material/Typography";
import "../../Template/TemplateCss.css";

import { TextField, Button, Grid, Paper, Modal } from "@mui/material";
import { useForm } from "react-hook-form";

function AddReceipes({ open, handleClose, templateOrigin }) {

  const { register, handleSubmit, formState: { errors } } = useForm();


  console.log(templateOrigin.id_template);
  console.log(templateOrigin);

  const handleCreateRecipe = async (data) => {
    const list = [];
    templateOrigin.parameters.map((param) => {
      list.push({ id_parameter: param, value: "", status: false });
      return null;
    });

    const newData= {...data,
      id_template: templateOrigin.id_template,
      parameters: list,
    };
    console.log(newData);
    const response = await setRecipe(
      newData,
      JSON.parse(sessionStorage.getItem("ACCSSTKN")).access_token
    );
    console.log("response",response);
    if (response.status) {
      console.log("YES");


      handleClose();
    } else {
      console.log("Error");
    }
  };
  const onSubmit = (data) => {
    console.log("onsub");
    console.log(data);
    handleCreateRecipe(data);
  };
  
  return (
    <Modal open={open} onClose={handleClose} className="ap-modal">
      <Paper
        elevation={3}
        spacing={1}
        sx={{
          padding: 1,
          width: "20vw",
        }}
      >
        <Paper style={{ padding: 20 }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography sx={{ fontSize: "1.4em" }}>Add recipe</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h7">
                  Id Template:<span>{"  "}</span>
                  {templateOrigin.id_template}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                {...register("name",{required:true})}
                  fullWidth
                  label="Name recipe"
                  variant="standard"
                  error={errors.name ? true : false}
                  helperText={errors.name ? "Este campo es requerido" : ""} 
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                {...register("id_recipe",{required:true})}
                  fullWidth
                  label="Id recipe"
                  variant="standard"
                  error={errors.id_recipe ? true : false}
                  helperText={errors.id_recipe ? "Este campo es requerido" : ""}                   
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                {...register("description",{required:true})}
                  fullWidth
                  label="Description"
                  variant="standard"
                  error={errors.description ? true : false}
                  helperText={errors.description ? "Este campo es requerido" : ""} 
                />
              </Grid>

              <Grid item xs={12}>

              </Grid>
              <Grid item xs={12} sx={{ display:"flex", justifyContent: "end" }}>
                <Button variant="outlined" type="submit">
                Add recipe
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Paper>
    </Modal>
  );
}
export default AddReceipes;
