export const handleOnChangeInputTexto = (event) => {
    // Expresión regular que permite letras (mayúsculas y minúsculas) y espacios en blanco
    const regex = /^[A-Za-z\s]*$/;
    const inputValue = event.target.value;
  
    // Validar si el texto ingresado cumple con la expresión regular
    if (regex.test(inputValue)) {
      // Si cumple, convertir a mayúsculas y establecer en el campo de texto
      event.target.value = inputValue.toUpperCase();
    } else {
      // Si no cumple, eliminar el último caracter ingresado
      event.target.value = inputValue.slice(0, -1);
    }
  };
  export const handleOnChangeInputIds = (event) => {
    // Expresión regular que permite letras (mayúsculas y minúsculas) y espacios en blanco
    const regex = /^\d{0,3}$/;
    const inputValue = event.target.value;
  
    // Validar si el texto ingresado cumple con la expresión regular
    if (regex.test(inputValue)) {
      // Si cumple, convertir a mayúsculas y establecer en el campo de texto
      event.target.value = inputValue.toUpperCase();
    } else {
      // Si no cumple, eliminar el último caracter ingresado
      event.target.value = inputValue.slice(0, -1);
    }
  };
  export const handleOnChangeInputTextoNumero = (event) => {
    // Expresión regular que permite letras (mayúsculas y minúsculas) y espacios en blanco
    const regex = /^[A-Za-z0-9\s]*$/;
    const inputValue = event.target.value;
  
    // Validar si el texto ingresado cumple con la expresión regular
    if (regex.test(inputValue)) {
      // Si cumple, convertir a mayúsculas y establecer en el campo de texto
      event.target.value = inputValue.toUpperCase();
    } else {
      // Si no cumple, eliminar el último caracter ingresado
      event.target.value = inputValue.slice(0, -1);
    }
  };
  export const handleOnChangeInputParametros = (event) => {
    // Expresión regular que permite letras (mayúsculas y minúsculas) y espacios en blanco
    const regex = /^\d{0,3}$/;
    const inputValue = event.target.value;
  
    // Validar si el texto ingresado cumple con la expresión regular
    if (regex.test(inputValue)) {
      // Si cumple, convertir a mayúsculas y establecer en el campo de texto
      event.target.value = inputValue.toUpperCase();
    } else {
      // Si no cumple, eliminar el último caracter ingresado
      event.target.value = inputValue.slice(0, -1);
    }
  };
  