import { useForm } from "react-hook-form";
import { TextField, Button, FormControl, Grid, Paper } from "@mui/material";
import Typography from "@mui/material/Typography";
import { format } from 'date-fns';
import { styled, useTheme } from "@mui/material/styles";
const HeaderContent = () => {
  // Obtener la fecha actual
  const date = new Date();
  const theme = useTheme();
  // Formatear la fecha en el formato deseado
  const formatDate = format(date, "d-MMM-yyyy");


  return (

        <Paper
          sx={{
            padding: "10px",
            height: "30px%",
            backgroundColor: theme.palette.secondary.main,
            color:theme.palette.primary.light,
          }}
        >
          <Grid
            container
            display={"flex"}
            alignItems="center"
            justifyContent="space-between"
          >
            <Grid item>
              <Typography variant="h6">Título</Typography>
            </Grid>
            <Grid item>
              <Typography variant="h6">{formatDate}</Typography>
            </Grid>
          </Grid>
        </Paper>

  );
};

export default HeaderContent;
