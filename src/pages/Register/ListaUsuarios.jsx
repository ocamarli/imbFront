import React, { useState, useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { setRegister } from "../../api/axios";
import HeaderContent from "../HeaderContent";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { format } from "date-fns";
import { ListItemAvatar } from "@mui/material";

import {
  TextField,  Button,  FormControl,  Grid,  Paper,  Box,
  Divider, List, ListItem, ListItemText, TableBody, TableHead,
  TableCell, Table, TableContainer, TableRow, IconButton, Avatar,
} from "@mui/material";
import ListItemIcon from "@mui/material/ListItemIcon";
import FolderIcon from "@mui/icons-material/Folder";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/ModeEdit";
import CancelIcon from "@mui/icons-material/Cancel";
import AddIcon from "@mui/icons-material/Add";
import { obtenerUsuarios } from "../../api/axios";
function generate(element) {
  return [0, 1, 2].map((value) =>
    React.cloneElement(element, {
      key: value,
    })
  );
}
const handleCloseRegister = async (data) => {
  const response = await setRegister(
    data,
    JSON.parse(sessionStorage.getItem("ACCSSTKN")).access_token
  );
  console.log(response);
};
const handleClickAgregarUsuario = () => {
    const newWindow = window.open(
      "/AgregarUsuario",
      "_blank",
      "width=auto,height=auto"
    );
  };
const onSubmit = (data) => {
  console.log(data);
  handleCloseRegister(data);
};
const handleEdit = (data) => {
  console.log(data);
};
const handleCancel = (data) => {
  console.log(data);
};
const handleDelete = (data) => {
  console.log(data);
};
const handleClickOpenSalesDay = () => {
  const newWindow = window.open(
    "/VentaDiaria",
    "_blank",
    "width=auto,height=auto"
  );
};
const ListaUsuarios = (props) => {

  const [isLoading, setIsLoading] = useState(false);
  const [usuarios, setUsuarios] = useState([]);
  const { onResponse } = props;
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
  }, [onResponse]);

  useEffect(() => {
    cObtenerUsuarios();
  }, [cObtenerUsuarios]);


  const [activeTab, setActiveTab] = useState("activas"); // Estado para controlar la pestaña activa
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  // Obtener la fecha actual
  const date = new Date();

  // Formatear la fecha en el formato deseado
  const formatDate = format(date, "d-MMM-yyyy");
  const [selectedDate, setSelectedDate] = useState(null);
  const {
    trigger,
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <Grid container padding={2}  sx={{ height: "calc(100vh)"}}>
      <Grid item xs={12}>
        <HeaderContent></HeaderContent>
        <Paper style={{ padding: 10 }}>
          <Grid container spacing={0}>
            <Grid
              item
              xs={12}
              sx={{
                display: "flex",
                justifyContent: "right",
                alignItems: "center",
              }}
            >
              <Typography variant="h6">Agregar usuario nuevo</Typography>
              <IconButton
                variant={"contained"}
                sx={{
                  borderRadius: "50%",
                  backgroundColor: "green",
                  color: "white",
                  marginLeft: "10px",
                }}
                onClick={handleClickAgregarUsuario}
              >
                <AddIcon />
              </IconButton>
            </Grid>

            <Grid item xs={12} >
              <List sx={{ height:"100vh", width: "100%", bgcolor: "background.paper" }}>
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
                                  src={`/static/images/avatar/${index + 1}.jpg`}
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
                                      {usuario.puesto}
                                      <br />
                                    </Typography>
                                    {`${usuario.correo}`}
                                    <br />
                                    {`${usuario.permisos}`}
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
        </Paper>
      </Grid>
    </Grid>
  );
};

export default ListaUsuarios;
