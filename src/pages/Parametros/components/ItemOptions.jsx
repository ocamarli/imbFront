
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

function ItemOptions(props) {
  const value =props.value;
  const name = props.name;

  return (
    <Grid container alignItems="center">
      <Grid item xs={4}>
        <Typography variant="subtitle1" sx={{ fontSize: 14, textAlign:"left", margin:0 }}>{value}</Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography variant="subtitle1" sx={{ fontSize: 14, textAlign:"left", margin:0 }}>{name}</Typography>
      </Grid>
      <Grid item xs={2}>
        <IconButton
          edge="end"
          aria-label="delete"
          onClick={()=>props.removeOption(value)}
        >
          <DeleteIcon fontSize="small" />
        </IconButton>
      </Grid>
      <Divider/>
    </Grid>
  );
}

export default ItemOptions;