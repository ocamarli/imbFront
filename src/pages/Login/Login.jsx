import { useState } from "react";
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
import { authenticate } from "../../api/usuariosApi";
import ImagenLogin from "../../imagenes/ImberaLogo.png";
import ImagenFondo from "../../imagenes/fondo-login.png";
import RespuestaModal from "../../components/RespuestaModal";
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
  const cerrarModal = () => {
    setEstaActivo(false); // Restablecer el estado a false cuando se cierra el modal
  };
  const [estaActivo, setEstaActivo] = useState(false);
  const [respuestaModal, setRespuestaModal] = useState(false);

  const fetchAuth = async (data) => {
    const response = await authenticate(data);
    console.log("response", response);
    if (response.status) {
      console.log("Nueva auth");

      sessionStorage.setItem(
        "ACCSSTKN",
        JSON.stringify({
          access_token: response.access_token,
          refresh_token: response.refresh_token,
        })
      );
      navigate("/Menu");
    } else {
      console.log("Error");
      setEstaActivo(true);
      setRespuestaModal(response);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let data = {
      usuario: event.target.form[0].value,
      pwo: event.target.form[1].value,
    };
    fetchAuth(data);
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
          backgroundImage: "url(" + ImagenFondo + ")",
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
            <img src={ImagenLogin} alt="Logo" />
          </Grid>
          <Typography component="h1" variant="h5" sx={{ mt: 4, mb: 2 }}>
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
      <RespuestaModal
        activo={estaActivo}
        respuesta={respuestaModal}
        autoCierre={true}
        onClose={cerrarModal}
      />
    </Grid>
  );
}
