import React, { useState, useCallback } from "react";
import store from "../../store";
import { Provider } from "react-redux";
import CardRecipe from "./Componentes/CardRecipe";
import { getRecipes } from "../../api/axios";
import Typography from "@mui/material/Typography";
import { useEffect } from "react";
import { Grid, Paper, CircularProgress, Button } from "@mui/material";

function Recipes(props) {
  const { onResponse } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [recipes, setRecipes] = useState([]);



  const fetchRecipes = useCallback(async () => {
    try {
      setIsLoading(true);
      const tkn = JSON.parse(sessionStorage.getItem("ACCSSTKN"))?.access_token;
      console.log(tkn);
      if (tkn !== undefined) {
        const json = await getRecipes(tkn);
        setRecipes(json.recipes);
        console.log(json.recipes)
        onResponse({ status: json.status, msg: json.msg });
        setIsLoading(false);
      } else {
        setRecipes([]);
      }
    } catch (error) {
      setIsLoading(false);
      onResponse({ status: false, msg: "Error" });
      console.error(error);
    }
  }, [onResponse]);

  useEffect(() => {
    fetchRecipes();
  }, [fetchRecipes]);

  return (
    <Provider store={store}>
      <Grid container padding={2}>
        <Grid item xs={12}>
          <Paper style={{ padding: 20 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} spacing={2}>
                <Button variant="outlined">Add new recipe</Button>
                <br />
                <br />
                <Typography variant="h6">Recipes</Typography>
                {isLoading && ( // Agrega el loader condicionalmente
                  <Grid item xs={12} align="center">
                    <CircularProgress size={50} />
                  </Grid>
                )}
                <Grid container spacing={2}>
                  {recipes?.map((recipe, index) => {
                    return (
                      <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
                        <CardRecipe recipe={recipe} />
                      </Grid>
                    );
                  })}
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Provider>
  );
}
export default Recipes;
