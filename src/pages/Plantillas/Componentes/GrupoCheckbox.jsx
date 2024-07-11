import React, { useState, useEffect, useMemo } from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Typography, FormLabel, Switch } from '@mui/material';
import { usePlantillaService } from "../../../hooks/usePlantillaService.jsx";
import LoadingComponent from '../../LoadingComponent.jsx';

function GrupoCheckbox({ 
    setProgramaSeleccionado,
    programaSeleccionado,
    estaCongelado, checkboxSeleccionados, setCheckboxSeleccionados, setCheckboxSeleccionado, idPlantilla, onResponse }) {
    const { isLoading, handleEditarPlantilla } = usePlantillaService(onResponse);  
    const totalDeProgramas = useMemo(() => ["1", "2", "3", "4", "5", "6"], []);

    const [mostrarTodos, setMostrarTodos] = useState(false);

    const handleChange = (value) => (event) => {
        if(programaSeleccionado===value)
            {
                setProgramaSeleccionado(checkboxSeleccionados[0]);
            }
        if (event.target.checked) {
            handleEditarPlantilla({ "idPlantilla": idPlantilla, "programasHabilitados": [...checkboxSeleccionados, value] });
            setCheckboxSeleccionados([...checkboxSeleccionados, value]);
            setCheckboxSeleccionado([...checkboxSeleccionados, value]);
            
        } else {
            if (checkboxSeleccionados.length > 1) {
                
                setCheckboxSeleccionados(checkboxSeleccionados.filter(item => item !== value));
                setCheckboxSeleccionado(checkboxSeleccionados.filter(item => item !== value));
            }

        }
    };

    useEffect(() => {
        if (mostrarTodos) {
            setCheckboxSeleccionados(totalDeProgramas);
            setCheckboxSeleccionado(totalDeProgramas);
        }
    }, [mostrarTodos, setCheckboxSeleccionado, setCheckboxSeleccionados, totalDeProgramas]);

    if (isLoading) {
        return <LoadingComponent />;
    }

    return (
        <div>
            <Typography variant="body1" fontWeight={600}>Habilitar programas</Typography>
            <FormLabel component="legend">Selecciona un programa</FormLabel>
            <FormControlLabel
                control={<Switch checked={mostrarTodos} onChange={() => setMostrarTodos(!mostrarTodos)} />}
                label="Mostrar todos los programas"
                disabled={estaCongelado}
            />
            {totalDeProgramas.map((programa) => (
                <FormControlLabel
                    key={programa}
                    control={<Checkbox id={programa} size="small" onChange={handleChange(programa)} />}
                    label={programa}
                    disabled={estaCongelado || mostrarTodos}
                    checked={checkboxSeleccionados.includes(programa)}
                />
            ))}
        </div>
    );
}

export default GrupoCheckbox;
