import React, { useState, useCallback, useEffect } from "react";
import Typography from "@mui/material/Typography";
import HeaderContent from "../HeaderContent";
import { ListItemAvatar } from "@mui/material";
import { Grid, Divider, List, ListItem, ListItemText,
  IconButton, Avatar, Tooltip, Button, Paper
} from "@mui/material";
import EditIcon from "@mui/icons-material/ModeEdit";
import AddIcon from "@mui/icons-material/Add";
import { obtenerUsuarios } from "../../api/usuariosApi";
import { CircularProgress } from "@mui/material";
import AgregarUsuario from "./AgregarUsuario";
import { useTheme } from "@mui/material/styles";
import UsuarioAutorizado from "../../components/UsuarioAutorizado";
import EditarUsuario from "./EditarUsuario";
import PersonOffIcon from "@mui/icons-material/PersonOff";
import { actualizarEstatusUsuario } from "../../api/usuariosApi";
import RespuestaModal from "../../components/RespuestaModal";

const ListaUsuarios = (props) => {
  const theme = useTheme();
  const [estaActivoModalConfirmacion, setEstaActivoModalConfirmacion] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [usuarios, setUsuarios] = useState([]);
  const { onResponse, setSelectedComponent, auth } = props;
  const [idUsuarioSelecionado,setIdUsuarioSeleccionado] = useState("");
  const [respuestaModalConfirmacion, setRespuestaModalConfirmacion] = useState({msg:"¡Confirma para deshabilitar el usuario!",status:false});
  const [estaActivoModalOk, setEstaActivoModalOk] = useState(false);
  const [respuestaModalOk, setRespuestaModalOk] = useState({msg:"¡Usuario deshabilitado!",status:true});
  const [estaActivoModalError, setEstaActivoModalError] = useState(false);
  const [respuestaModalError, setRespuestaModalError] = useState({msg:"¡Error al deshabilitar el usuario!",status:false});
  const handleClickAgregarUsuario = () => {
    setSelectedComponent(<AgregarUsuario
      setSelectedComponent={setSelectedComponent}
    ></AgregarUsuario>);
  };
  const cerrarModal = (confirmacion) => {
    console.log("confirmacion", confirmacion);
    if(confirmacion){
      const estatus = false;
      console.log("idUsuarioSelecionado")
      console.log(idUsuarioSelecionado)
      fetchActualizarEstatusUsuario(estatus,idUsuarioSelecionado)
    }
    setEstaActivoModalConfirmacion(false); // Restablecer el estado a false cuando se cierra el modal
    setEstaActivoModalOk(false)
  };
  const handleEstatusUsuario = (idUsuario) => {
    setIdUsuarioSeleccionado(idUsuario);
    setEstaActivoModalConfirmacion(true);
    //fetchActualizarEstatusUsuario(estatus,idUsuario);
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

  const fetchActualizarEstatusUsuario = useCallback(
    async (estatus, idUsuario) => {
      try {
        setIsLoading(true);
        const tkn = JSON.parse(
          sessionStorage.getItem("ACCSSTKN")
        )?.access_token;
        if (tkn !== undefined) {
          const data = { idUsuario: idUsuario, estatus: estatus };
          const json = await actualizarEstatusUsuario(data, tkn);
          console.log(json);
          setIsLoading(false);
          setEstaActivoModalOk(true)
          cObtenerUsuarios()
        } else {
        }
      } catch (error) {
        setIsLoading(false);
        console.error(error);
      }
    },
    [setIsLoading]
  );
  const cObtenerUsuarios = useCallback(async () => {
    try {
      setIsLoading(true);
      const tkn = JSON.parse(sessionStorage.getItem("ACCSSTKN"))?.access_token;
      if (tkn !== undefined) {
        const json = await obtenerUsuarios(tkn);
        setUsuarios(json.usuarios);
        onResponse({ status: json.status, msg: json.msg });
        setIsLoading(false);
        console.log(json.usuarios);
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
    <Grid container padding={2} >
      <Grid item xs={12}>
        {isLoading ? ( // Agrega el loader condicionalmente
          <Grid item xs={12} align="center">
            <CircularProgress size={50} />
          </Grid>
        ) : (
          <Grid>
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
                                  handleEstatusUsuario(usuario.idUsuario);
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
      <RespuestaModal
        activo={estaActivoModalOk}
        respuesta={respuestaModalOk}
        autoCierre={true}
        onClose={cerrarModal}
      />      
      {/* Modal Confirmación */}

      <RespuestaModal
        activo={estaActivoModalConfirmacion}
        respuesta={respuestaModalConfirmacion}
        autoCierre={false}
        onClose={cerrarModal}
      />
    </Grid>
  );
};

export default ListaUsuarios;
