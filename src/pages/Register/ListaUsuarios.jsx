import React, {  useEffect } from "react";
import Typography from "@mui/material/Typography";
import HeaderContent from "../HeaderContent";
import { ListItemAvatar } from "@mui/material";
import { Grid, Divider, List, ListItem, ListItemText,
  IconButton, Avatar, Tooltip, Paper
} from "@mui/material";
import EditIcon from "@mui/icons-material/ModeEdit";
import AddIcon from "@mui/icons-material/Add";
import { CircularProgress } from "@mui/material";
import AgregarUsuario from "./AgregarUsuario";
import { useTheme } from "@mui/material/styles";
import UsuarioAutorizado from "../../components/UsuarioAutorizado";
import EditarUsuario from "./EditarUsuario";
import PersonOffIcon from "@mui/icons-material/PersonOff";
import ModalGenerico from "../../components/ModalGenerico";
import { useUsuarioService } from "../../hooks/useUsuarioService.jsx";
const ListaUsuarios = (props) => {
  const theme = useTheme();
  const { setSelectedComponent, auth, onResponse } = props;
  const { usuarios, isLoading, fetchUsuarios, handleDeshabilitarUsuario, cerrarModalOk, cerrarModalConfirmacion,
    estaActivoModalOk,respuestaModalOk,estaActivoModalConfirmacion,respuestaModalConfirmacion } = useUsuarioService(onResponse); 
  
  const handleClickAgregarUsuario = () => {
    setSelectedComponent(<AgregarUsuario
      setSelectedComponent={setSelectedComponent}
    ></AgregarUsuario>);
  };


  const handleEditarUsuario = (idUsuario) => {
    setSelectedComponent(
      <EditarUsuario
        idUsuario={idUsuario}
        setSelectedComponent={setSelectedComponent}
        auth={auth}
      ></EditarUsuario>
    );
    console.log("Editar usuario con ID:", idUsuario);
  };

  useEffect(() => {
    fetchUsuarios();
  }, [fetchUsuarios]);

  return (
    <Grid container padding={2} >
      <Grid item xs={12}>
        {isLoading ? ( // Agrega el loader condicionalmente
          <Grid item xs={12} align="center">
            <CircularProgress size={50} />
          </Grid>
        ) : (
          <Grid>
          <ModalGenerico
            tipoModal={"correcto"}          
            open={estaActivoModalOk}
            onClose={cerrarModalOk}
            title="Correcto"
            message={respuestaModalOk.msg}
            autoCierre={true}
      />      
      {/* Modal Confirmación */}

      <ModalGenerico

            open={estaActivoModalConfirmacion}
            onClose={cerrarModalConfirmacion}
            title="Confirmación"
            message={respuestaModalConfirmacion.msg}
            actions={[
              { label: "Confirmar", handler: () => { cerrarModalConfirmacion(true); }, color: "primary" },
              { label: "Cancelar", handler: () => { cerrarModalConfirmacion(false); }, color: "error" },
            ]}
      />        
            <HeaderContent titulo="Lista de usuarios"></HeaderContent>
            <Paper style={{ padding: 20 }}>
            <Grid container spacing={3}>
              <UsuarioAutorizado
                usuario={auth}
                permisosRequeridos={["superusuario"]}
              >
                              <Grid
                item
                xs={8}
                sx={{ display: "flex", justifyContent: "left" }}
              >
              </Grid>
                <Grid
                  item
                  xs={4}
                  sx={{
                    display: "flex",
                    justifyContent: "right",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="h6">
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
                            <Tooltip title="Deshabilitar usuario">
                              <IconButton
                                onClick={() => {
                                  handleDeshabilitarUsuario(usuario.idUsuario);
                                }}
                                aria-label="edit"
                              >
                                <PersonOffIcon />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Editar usuario">
                              <IconButton
                                onClick={() => {
                                  handleEditarUsuario(usuario.idUsuario);
                                }}
                                aria-label="edit"
                              >
                                <EditIcon />
                              </IconButton>
                            </Tooltip>
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
            </Paper>
          </Grid>
        )}
      </Grid>
      {/* Modal Respuesta Ok */}

    </Grid>
  );
};

export default ListaUsuarios;
