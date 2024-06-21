import React from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button, Grid, Paper, Typography } from '@mui/material';
import HeaderContent from '../HeaderContent';
import Home from '../Home/Home';
import ModalGenerico from '../../components/ModalGenerico';
import { useGaeService } from '../../hooks/useGaeServices';
import LoadingComponent from '../LoadingComponent.jsx';
import {
  handleOnChangeInputTexto,
  handleOnChangeInputIds,
  handleOnChangeInputTextoNumero,
} from '../utils.js';

const AgregarGae = (props) => {
  const { setSelectedComponent, onResponse } = props;

  const {
    isLoading,
    estaActivoModalOk,
    respuestaModalOk,
    handleCrearGae,
    cerrarModalOk,
  } = useGaeService(onResponse);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log('submit');
    console.log(data);
    handleCrearGae(data);
  };

  const handleOnCLickSalir = () => {
    setSelectedComponent(<Home />);
  };

  if (isLoading) {
    return <LoadingComponent />;
  }

  return (
    <Grid container padding={2} justifyContent={'center'}>
      <ModalGenerico
        tipoModal={respuestaModalOk.status}
        open={estaActivoModalOk}
        onClose={cerrarModalOk}
        title={respuestaModalOk.status ? 'Correcto' : 'Advertencia'}
        message={respuestaModalOk.msg}
        autoCierre={true}
      />
      <Grid item xs={7}>
        <HeaderContent titulo="Agregar GAE" />
        <Paper style={{ padding: 20 }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography>Id GAE</Typography>
                <TextField
                  {...register('idGaeInterno', { required: true })}
                  fullWidth
                  placeholder="id GAE"
                  variant="outlined"
                  error={errors.idGaeInterno ? true : false}
                  helperText={errors.idGaeInterno ? 'Este campo es requerido' : ''}
                  onChange={handleOnChangeInputIds}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography>Nombre GAE</Typography>
                <TextField
                  {...register('nombre', { required: true })}
                  fullWidth
                  placeholder="Nombre GAE"
                  variant="outlined"
                  error={errors.nombre ? true : false}
                  helperText={errors.nombre ? 'Este campo es requerido' : ''}
                  onChange={handleOnChangeInputTexto}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography>Código GAE</Typography>
                <TextField
                  {...register('codigo', { required: true })}
                  fullWidth
                  placeholder="Código GAE"
                  variant="outlined"
                  error={errors.codigo ? true : false}
                  helperText={errors.codigo ? 'Este campo es requerido' : ''}
                  onChange={handleOnChangeInputTextoNumero}
                />
              </Grid>
              <Grid item xs={12}>
                <Grid container sx={{ justifyContent: 'space-around' }} spacing={2}>
                  <Grid item xs={6}>
                    <Button
                      variant="contained"
                      type="submit"
                      sx={{ height: '50px' }}
                      fullWidth
                    >
                      Agregar
                    </Button>
                  </Grid>
                  <Grid item xs={6}>
                    <Button
                      color="error"
                      variant="contained"
                      sx={{ height: '50px' }}
                      fullWidth
                      onClick={handleOnCLickSalir}
                    >
                      Salir
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default AgregarGae;