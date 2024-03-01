import React, { useState, useCallback, useEffect } from "react";

import { useForm } from "react-hook-form";
import {
  TextField,
  Button,
  FormControl,
  Grid,
  Paper,
  Box,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { setRegister } from "../../../api/axios";
import HeaderContent from "../../HeaderContent";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { format } from "date-fns";
import {
  List,
  ListItem,
  ListItemText,
  TableBody,
  TableHead,
  TableCell,
  Table,
  TableContainer,
  TableRow,
  IconButton,
} from "@mui/material";
import ListItemIcon from "@mui/material/ListItemIcon";
import FolderIcon from "@mui/icons-material/Folder";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/ModeEdit";
import CancelIcon from "@mui/icons-material/Cancel";
import AddIcon from "@mui/icons-material/Add";
function generate(element) {
  return [0, 1, 2].map((value) =>
    React.cloneElement(element, {
      key: value,
    })
  );
}
const handleClickAgregarPlantilla = () => {
    const newWindow = window.open(
      "/AgregarPlantilla",
      "_blank",
      "width=auto,height=auto"
    );
  };
const handleCloseRegister = async (data) => {
  const response = await setRegister(
    data,
    JSON.parse(sessionStorage.getItem("ACCSSTKN")).access_token
  );
  console.log(response);
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

const ListaPlantillas = () => {
  const [activeTab, setActiveTab] = useState("activas"); // Estado para controlar la pestaña activa
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  const dataActivas = [
    {
      id: 1,
      autor: "Juan",
      familia: "Familia A",
      hardware: "Hardware 1",
      estatus: "Activo",
      plantillas: 3,
    },
    {
      id: 2,
      autor: "María",
      familia: "Familia B",
      hardware: "Hardware 2",
      estatus: "Activo",
      plantillas: 5,
    },
  ];

  const dataObsoletas = [
    {
      id: 3,
      autor: "Pedro",
      familia: "Familia C",
      hardware: "Hardware 3",
      estatus: "Obsoleta",
      plantillas: 2,
    },
    {
      id: 4,
      autor: "Ana",
      familia: "Familia D",
      hardware: "Hardware 4",
      estatus: "Obsoleta",
      plantillas: 4,
    },
  ];

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
    <Grid container padding={2}>
      <Grid item xs={12}>
        <HeaderContent></HeaderContent>
        <Paper style={{ padding: 20 }}>
          <Grid container spacing={3}>

          <Grid item xs={8} sx={{ display: 'flex', justifyContent: 'left' }}>
        <Button variant={"contained"} onClick={() => handleTabChange('activas')} style={{  backgroundColor: activeTab === 'activas' ? 'green' : '#cccccc', color: 'white',  cursor: 'pointer' }}>Plantillas Activas</Button>
        <Button variant={"contained"} onClick={() => handleTabChange('obsoletas')} style={{ backgroundColor: activeTab === 'obsoletas' ? 'orange' : '#cccccc', color: 'white', cursor: 'pointer' }}>Plantillas Obsoletas</Button>
      </Grid>
    
      <Grid item xs={4} sx={{ display: 'flex', justifyContent: 'right', alignItems: 'center' }}>
      <Typography variant="h6">
          Agregar una plantilla
        </Typography>        
        <IconButton
        variant={"contained"}
          sx={{ borderRadius: '50%', backgroundColor: 'green', color: 'white', marginLeft: '10px' }}
          onClick={handleClickAgregarPlantilla}
        >
          <AddIcon />
        </IconButton>

      </Grid>

            <Grid item xs={12}>
              <TableContainer
                component={Paper}
                style={{ display: activeTab === "activas" ? "block" : "none" }}
              >
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>ID</TableCell>
                      <TableCell>AUTOR</TableCell>
                      <TableCell>FAMILIA</TableCell>
                      <TableCell>HARDWARE</TableCell>
                      <TableCell>ESTATUS</TableCell>
                      <TableCell>PLANTILLAS</TableCell>
                      <TableCell>Eliminar</TableCell>
                      <TableCell>Editar</TableCell>
                      <TableCell>Cancelar</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {dataActivas.map((row) => (
                      <TableRow key={row.id}>
                        <TableCell>{row.id}</TableCell>
                        <TableCell>{row.autor}</TableCell>
                        <TableCell>{row.familia}</TableCell>
                        <TableCell>{row.hardware}</TableCell>
                        <TableCell>{row.estatus}</TableCell>
                        <TableCell>{row.plantillas}</TableCell>
                        <TableCell>
                          <IconButton onClick={() => handleDelete(row.id)}>
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                        <TableCell>
                          <IconButton onClick={() => handleEdit(row.id)}>
                            <EditIcon />
                          </IconButton>
                        </TableCell>
                        <TableCell>
                          <IconButton onClick={() => handleCancel(row.id)}>
                            <CancelIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
            <Grid item xs={12}>
              <TableContainer
                component={Paper}
                style={{
                  display: activeTab === "obsoletas" ? "block" : "none",
                }}
              >
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>ID</TableCell>
                      <TableCell>AUTOR</TableCell>
                      <TableCell>FAMILIA</TableCell>
                      <TableCell>HARDWARE</TableCell>
                      <TableCell>ESTATUS</TableCell>
                      <TableCell>PLANTILLAS</TableCell>
                      <TableCell>Eliminar</TableCell>
                      <TableCell>Editar</TableCell>
                      <TableCell>Cancelar</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {dataObsoletas.map((row) => (
                      <TableRow key={row.id}>
                        <TableCell>{row.id}</TableCell>
                        <TableCell>{row.autor}</TableCell>
                        <TableCell>{row.familia}</TableCell>
                        <TableCell>{row.hardware}</TableCell>
                        <TableCell>{row.estatus}</TableCell>
                        <TableCell>{row.plantillas}</TableCell>
                        <TableCell>
                          <IconButton onClick={() => handleDelete(row.id)}>
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                        <TableCell>
                          <IconButton onClick={() => handleEdit(row.id)}>
                            <EditIcon />
                          </IconButton>
                        </TableCell>
                        <TableCell>
                          <IconButton onClick={() => handleCancel(row.id)}>
                            <CancelIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default ListaPlantillas;
