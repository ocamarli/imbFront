import React, { useState } from "react";
import { Button, Grid, Paper } from "@mui/material";
import Typography from "@mui/material/Typography";
import HeaderContent from "../../HeaderContent";
import {
  TableBody,
  TableHead,
  TableCell,
  Table,
  TableContainer,
  TableRow,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/ModeEdit";
import CancelIcon from "@mui/icons-material/Cancel";
import AddIcon from "@mui/icons-material/Add";
import AgregarPlantilla from "../AgregarPlantilla";

const handleEdit = (data) => {
  console.log(data);
};
const handleCancel = (data) => {
  console.log(data);
};
const handleDelete = (data) => {
  console.log(data);
};

const ListaPlantillas = (props) => {
  const { setSelectedComponent } = props;
  const [activeTab, setActiveTab] = useState("activas"); // Estado para controlar la pestaña activa
  const handleClickAgregarPlantilla = () => {
    setSelectedComponent(<AgregarPlantilla></AgregarPlantilla>);
  };
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
      plantillas: 4,
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

  return (
    <Grid container padding={2}>
      <Grid item xs={12}>
        <HeaderContent titulo="Lista de plantillas"></HeaderContent>
        <Paper style={{ padding: 20 }}>
          <Grid container spacing={3}>
            <Grid item xs={8} sx={{ display: "flex", justifyContent: "left" }}>
              <Button
                variant={"contained"}
                onClick={() => handleTabChange("activas")}
                style={{
                  backgroundColor:
                    activeTab === "activas" ? "green" : "#cccccc",
                  color: "white",
                  cursor: "pointer",
                }}
              >
                Plantillas Activas
              </Button>
              <Button
                variant={"contained"}
                onClick={() => handleTabChange("obsoletas")}
                style={{
                  backgroundColor:
                    activeTab === "obsoletas" ? "orange" : "#cccccc",
                  color: "white",
                  cursor: "pointer",
                }}
              >
                Plantillas Obsoletas
              </Button>
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
              <Typography variant="h6">Agregar una plantilla</Typography>
              <IconButton
                variant={"contained"}
                sx={{
                  borderRadius: "50%",
                  backgroundColor: "green",
                  color: "white",
                  marginLeft: "10px",
                }}
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
                      <TableCell>Id</TableCell>
                      <TableCell>Autor</TableCell>
                      <TableCell>Familia</TableCell>
                      <TableCell>Hardware</TableCell>
                      <TableCell>Estatus</TableCell>
                      <TableCell>Plantillas</TableCell>
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
