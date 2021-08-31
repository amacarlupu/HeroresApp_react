import React, { useContext } from 'react'
import { AuthContext } from '../../auth/AuthContext';
import { types } from '../../types/types';

export const LoginScreen = ({ history }) => {

    const { dispatch } = useContext(AuthContext);

    const lastPath = localStorage.getItem('lastPath') || '/';

    const handleLogin = () => {
        // history.push('/marvel'); // Al pulsar boton de atras, puedo ver la pagina anterior

        dispatch({
            type: types.login,
            payload: {
                name: 'Anderson'
            }
        })

        // Restablece el historial de ruta y no permite volver a pagina anterior
        history.replace(lastPath);
    }

    return (
        <div className="container mt-5">
            <h1>Login</h1>
            <hr />

            <button
                className="btn btn-primary"
                onClick={handleLogin}
            >
                Login
            </button>
        </div>
    )
}
