import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { ButtonBase } from "@mui/material";

const ItemParameterTemplate = (props) => {
  const { name, word, onClick } = props;
  const backgroundCard1 = "#3AAA35";
  const colorTextLight = "#fff";

  console.log(colorTextLight);

  return (
    <Card
      variant="outlined"
      style={{ backgroundColor: backgroundCard1, color: colorTextLight }}
    >
      <ButtonBase onClick={onClick}>
        <CardContent sx={{ padding: 1 }}>
          <Typography sx={{ fontWeight: 700 }} variant="h9">
            {name}
          </Typography>
          <Typography sx={{ fontSize: 14 }}>{word}</Typography>
        </CardContent>
      </ButtonBase>
    </Card>
  );
};
export default ItemParameterTemplate;
