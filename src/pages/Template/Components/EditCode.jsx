import React, { useState } from "react";
/*import { setRecipe } from "../../../api/axios";*/
import Typography from "@mui/material/Typography";
import "../TemplateCss.css";
import { Grid, Paper, Modal } from "@mui/material";

import CodeInput from "./CodeInput";
import ListParametersCode from "./ListParametersCode";

function EditCode({ open, handleClose, templateOrigin }) {
  const [matches, setMatches] = useState([]);
  console.log(templateOrigin.id_template);
  console.log(templateOrigin);

  return (
    <Modal open={open} onClose={handleClose} className="ap-modal">
      <Paper
        elevation={3}
        sx={{
          padding: 3,
          width: "95vw",
          height: "95vh",
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography sx={{ fontSize: "1.4em" }}>Config file.h</Typography>
          </Grid>
          <Grid item xs={12} style={{ maxHeight: "600px" }}>
            <>
            {console.log("matches",matches)}
            <ListParametersCode
              matches={matches}
              templateOrigin={templateOrigin}
              style={{ maxHeight: "500px" }}

            ></ListParametersCode>
            </>
          </Grid>
          <Grid item xs={12}>
            <CodeInput
              id_template={templateOrigin.id_template}
              setMatches={setMatches}
              onClose={handleClose}
            ></CodeInput>
          </Grid>
          <Grid item xs={12} sx={{display:"flex", justifyContent:"end" }}>

          </Grid>
        </Grid>
      </Paper>
    </Modal>
  );
}
export default EditCode;
