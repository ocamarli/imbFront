import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import Paper from "@mui/material/Paper";
import { authenticate } from "../../api/axios";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mx.imberacooling.com/">
        Imbera
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
export default function Login() {
  const theme = useTheme();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    authenticate({
      usuario: event.target.form[0].value,
      pwo: event.target.form[1].value,
    })
      .then((json) => {
        sessionStorage.setItem(
          "ACCSSTKN",
          JSON.stringify({
            access_token: json.access_token,
            refresh_token: json.refresh_token,
          })
        );
        navigate("/Menu");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      {console.log("Theme type:", theme.palette.type)}

      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={9}
        sx={{
          backgroundImage: "url(/fondo-login.png)",
          backgroundRepeat: "no-repeat",
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[50]
              : theme.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Grid item xs={12} sm={8} md={3} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 10,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Grid item xs={12}>
            <img src={process.env.PUBLIC_URL +"/imberaLogo.png"} alt="Logo" />
          </Grid>
          <Typography component="h1" variant="h5" sx={{ mt: 4,mb:2 }}>
            Iniciar Sesión
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <form>
              <TextField
                variant="standard"
                margin="normal"
                required
                fullWidth
                label="Usuario"
                name="usuario"
                autoFocus
              />
              <TextField
                margin="normal"
                variant="standard"
                required
                fullWidth
                name="pow"
                label="Contraseña"
                type="password"
                autoComplete="contraseña actual"
              />
              <Button
                type="submit"
                fullWidth
                variant="outlined"
                sx={{ mt: 10, mb: 2 }}
                onClick={handleSubmit}
              >
                Iniciar Sesión
              </Button>
            </form>
            <Copyright sx={{ mt: 5 }} />
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
