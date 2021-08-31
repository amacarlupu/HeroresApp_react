// Custom Hook para obtener el estado y el evento onChange de un input
import { useState } from "react"

// Recibe como initialState un objeto
export const useForm = (initialState = {}) => {

    const [values, setValues] = useState(initialState);

    // Resetear el input
    const reset = () => {
        setValues( initialState );
    }

    // Evento onChange, destructura propiedad 'target' del evento 'e'
    const handleInputChange = ({ target }) => {
        setValues({
            ...values,
            [target.name]: target.value
        });
    };

    // Retornar el estado y la funcion con el evento handleInputChange
    return [ values, handleInputChange, reset ];
}
