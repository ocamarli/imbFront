import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import AddReceipe from "../../Recipes/Componentes/AddRecipe";
import { useState } from "react";
import { Button, Grid, Dialog,alpha, CardHeader } from "@mui/material";
import EditCode from "./EditCode";
import { useTheme } from "@mui/material";
export default function CardTemplate(props) {
  const { template } = props;
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = (props) => {
    setOpen(false);
  };
  const handleClickOpenEdit = () => {
    setOpenEdit(true);
  };
  const handleCloseEdit = (props) => {
    setOpenEdit(false);
  };
const theme=useTheme();
  // Obtener el color de fondo con transparencia según el modo del tema
  const backgroundColorWithOpacity = theme.palette.mode === 'light'
    ? alpha(theme.palette.primary.main, .7)// Para el modo oscuro, no se aplica transparencia
    :  null;
    const colorTextHeader = theme.palette.mode === 'light'
    ? alpha("#ffffff", .9)// Para el modo oscuro, no se aplica transparencia
    :  null;    

  return (
    <>
      <Grid item xs={12} >
        <Dialog open={open} onClose={handleClose}>
          <AddReceipe
            open={open}
            handleClose={handleClose}
            templateOrigin={template}
          ></AddReceipe>
        </Dialog>
        <Dialog open={openEdit} onClose={handleCloseEdit}>
          <EditCode
            open={openEdit}
            handleClose={handleCloseEdit}
            templateOrigin={template}
          ></EditCode>
        </Dialog>
      </Grid>
      <Card variant="outlined">
        <CardHeader  titleTypographyProps={{ variant: 'h6'}} 
        sx={{color:colorTextHeader, padding:"5px",backgroundColor:backgroundColorWithOpacity, marginBottom:"-10px"}} title={template.name}/>
    
        <CardContent>

          <Typography variant="body2" color="text.secondary" >
            Version:{" "}{template.version}
          </Typography>
          <Typography variant="body2" color="text.secondary" >
            Template:{" "}{template.id_template}
          </Typography>
          <Typography variant="body2" color="text.secondary">{template.description}</Typography>

        </CardContent>
        <CardActions sx={{display:"flex",justifyContent:"end"}}>
          <Button size="small" onClick={handleClickOpen}>
            Create recipe
          </Button>
          <Button size="small" onClick={handleClickOpenEdit}>
            Edit BaseCode
          </Button>
        </CardActions>
      </Card>
    </>
  );
}
