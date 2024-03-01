import React, { useState } from "react";
import { Paper, Button, Grid } from "@mui/material";
import { useTheme } from "@mui/material/styles";
const ComponentePestana = ({ tabs}) => {
  const [activeTab, setActiveTab] = useState(0);
  const theme = useTheme();
  const handleTabChange = (index) => {
    setActiveTab(index);

  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Paper>
          {tabs && tabs.length > 0 ? ( // Verifica si hay datos en tabs
            tabs.map((tab, index) => (
              <Button
                key={index}
                variant="contained"
                onClick={() => handleTabChange(index)}
                style={{
                  backgroundColor: activeTab === index ? theme.palette.primary.main : "#cccccc",
                  color: "white",
                  cursor: "pointer",
                }}
              >
                {tab.label}
              </Button>
            ))
          ) : (
            <p>No hay pestañas disponibles</p> // Mensaje de error si no hay datos en tabs
          )}
        </Paper>
      </Grid>

    </Grid>
  );
};

export default ComponentePestana;