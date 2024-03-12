import React, { useState, useCallback, useEffect } from "react";
import Typography from "@mui/material/Typography";
import HeaderContent from "../HeaderContent";
import { ListItemAvatar } from "@mui/material";
import {
  Grid,
  Divider,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Avatar,
} from "@mui/material";
import EditIcon from "@mui/icons-material/ModeEdit";
import AddIcon from "@mui/icons-material/Add";
import { obtenerUsuarios } from "../../api/axios";
import { CircularProgress } from "@mui/material";
import AgregarUsuario from "./AgregarUsuario";
import { useTheme } from "@mui/material/styles";
import UsuarioAutorizado from "../../components/UsuarioAutorizado";
const ListaUsuarios = (props) => {
  const theme = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const [usuarios, setUsuarios] = useState([]);
  const { onResponse, setSelectedComponent, auth } = props;

  const handleClickAgregarUsuario = () => {
    setSelectedComponent(<AgregarUsuario></AgregarUsuario>);
  };
  const cObtenerUsuarios = useCallback(async () => {
    try {
      setIsLoading(true);
      const tkn = JSON.parse(sessionStorage.getItem("ACCSSTKN"))?.access_token;
      if (tkn !== undefined) {
        const json = await obtenerUsuarios(tkn);
        setUsuarios(json.usuarios);
        onResponse({ status: json.status, msg: json.msg });
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      onResponse({ status: false, msg: "Error" });
    }
  }, [onResponse, setIsLoading]);

  useEffect(() => {
    cObtenerUsuarios();
  }, [cObtenerUsuarios]);

  return (
    <Grid container padding={2} sx={{ height: "calc(100vh)" }}>
      <Grid item xs={12}>
        {isLoading ? ( // Agrega el loader condicionalmente
          <Grid item xs={12} align="center">
            <CircularProgress size={50} />
          </Grid>
        ) : 
          <Grid>
             <HeaderContent titulo="Lista de usuarios"></HeaderContent>
            <Grid container spacing={0}>
              <UsuarioAutorizado
                usuario={auth}
                permisosRequeridos={["refrigeracion"]}
              >
                <Grid
                  item
                  xs={12}
                  sx={{
                    display: "flex",
                    justifyContent: "right",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="h6" mt={4}>
                    Agregar usuario nuevo
                  </Typography>
                  <IconButton
                    variant={"contained"}
                    sx={{
                      borderRadius: "50%",
                      backgroundColor: theme.palette.secondary.main,
                      color: theme.palette.secondary.contrastText,
                      marginLeft: "10px",
                    }}
                    onClick={handleClickAgregarUsuario}
                  >
                    <AddIcon />
                  </IconButton>
                </Grid>
              </UsuarioAutorizado>
              <Grid item xs={12}>
                <List
                  sx={{
                    height: "100vh",
                    width: "100%",
                    bgcolor: "background.paper",
                  }}
                >
                  {usuarios.map((usuario, index) => (
                    <React.Fragment key={index}>
                      <ListItem alignItems="flex-start">
                        <Grid container>
                          <Grid item xs={10}>
                            <Grid container>
                              <Grid
                                item
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "left",
                                }}
                              >
                                <ListItemAvatar>
                                  <Avatar
                                    alt={usuario.nombre}
                                    src={`/static/images/avatar/${
                                      index + 1
                                    }.jpg`}
                                  />
                                </ListItemAvatar>
                              </Grid>
                              <Grid item>
                                <ListItemText
                                  primary={usuario.nombre}
                                  secondary={
                                    <React.Fragment>
                                      <Typography
                                        sx={{ display: "inline" }}
                                        component="span"
                                        variant="body2"
                                        color="text.primary"
                                      >
                                        {usuario.correo}
                                        <br />
                                      </Typography>
                                      {Object.entries(usuario.permisos).map(
                                        ([permiso, tienePermiso]) =>
                                          tienePermiso && (
                                            <span key={permiso}>
                                              {permiso},{" "}
                                            </span>
                                          )
                                      )}
                                    </React.Fragment>
                                  }
                                />
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid
                            item
                            xs={2}
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "flex-end",
                            }}
                          >
                            <EditIcon />
                          </Grid>
                        </Grid>
                      </ListItem>
                      {index !== usuarios.length - 1 && (
                        <Divider variant="inset" component="li" />
                      )}
                    </React.Fragment>
                  ))}
                </List>
              </Grid>
            </Grid>
            </Grid>
        }
      </Grid>
    </Grid>
  );
};

export default ListaUsuarios;
