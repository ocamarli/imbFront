import React, { useState, useEffect,useMemo } from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Typography } from '@mui/material';

function GrupoCheckbox(props) {
    const { setCheckboxSeleccionado } = props;
    const totalDeProgramas = useMemo(() => ["1", "2", "3", "4", "5", "6"], []);

    // Estado para almacenar los checkboxes seleccionados
    const [checkboxSeleccionados, setCheckboxSeleccionados] = useState([]);
    // Estado para controlar si se muestra todos o solo los seleccionados
    const [mostrarTodos, setMostrarTodos] = useState(false);
    // Estado para controlar si se filtran los seleccionados
    const [filtrarSeleccionados, setFiltrarSeleccionados] = useState(false);

    // Función para manejar el cambio de estado de un checkbox
    const handleChange = (value) => (event) => {
        if (event.target.checked) {
            // Agregar el valor a la lista si el checkbox está marcado
            setCheckboxSeleccionados([...checkboxSeleccionados, value]);
            setCheckboxSeleccionado([...checkboxSeleccionados, value]);
        } else {
            // Remover el valor de la lista si el checkbox está desmarcado
            setCheckboxSeleccionados(checkboxSeleccionados.filter(item => item !== value));
            setCheckboxSeleccionado(checkboxSeleccionados.filter(item => item !== value));
        }
    };

    // Función para manejar el checkbox de mostrar todos
    const handleMostrarTodosChange = () => {
        setMostrarTodos(!mostrarTodos);
        if (!mostrarTodos) {
            setCheckboxSeleccionados(totalDeProgramas);
            setFiltrarSeleccionados(false);
            setCheckboxSeleccionado(totalDeProgramas);
        } else {
            setCheckboxSeleccionados([]);
            setCheckboxSeleccionado([]);
            setFiltrarSeleccionados(true);
        }
    };

    // Función para manejar el checkbox de filtrar seleccionados
    const handleFiltrarSeleccionadosChange = () => {
        setFiltrarSeleccionados(!filtrarSeleccionados);
        if (filtrarSeleccionados) {
            setCheckboxSeleccionados([]);
            setCheckboxSeleccionado([]);
            setMostrarTodos(true);
        } else {
            setCheckboxSeleccionados([]);
            setCheckboxSeleccionado([]);
            setMostrarTodos(false);
        }
    };

    useEffect(() => {
        if (mostrarTodos) {
            setCheckboxSeleccionados(totalDeProgramas);
            setCheckboxSeleccionado(totalDeProgramas);
        }
    }, [mostrarTodos, setCheckboxSeleccionado,setCheckboxSeleccionados,totalDeProgramas]);

    return (
        <div>
          <Typography variant="body1" fontWeight={600} >Habilitar programas</Typography>
            <FormControlLabel
                
                control={<Checkbox size="small" checked={mostrarTodos} onChange={handleMostrarTodosChange} />}
                label="Mostrar Todos"
            />
            <FormControlLabel
                control={<Checkbox size="small" checked={filtrarSeleccionados} onChange={handleFiltrarSeleccionadosChange} />}
                label="Filtrar Seleccionados"
            />
            <br />
            {totalDeProgramas.map((programa) => (
                <FormControlLabel
                    key={programa}
                    control={<Checkbox size="small" onChange={handleChange(programa)} />}
                    label={programa}
                    disabled={mostrarTodos}
                    checked={checkboxSeleccionados.includes(programa)}
                />
            ))}
            
        </div>
    );
}

export default GrupoCheckbox;
