import React from "react";

import { Grid } from "@mui/material";

const SvgComponent = (props) => {

  return (
    <Grid
      container
      padding={5}
      alignItems="center"
      justifyItems="center"
      justifyContent="center"
      mt={"20%"}
      
sx={{opacity:".7"}}
    >
            <img src={process.env.PUBLIC_URL +"/imberaLogo.png"} alt="Logo" />
    </Grid>
  );
};

export default SvgComponent;
