// Componente para poner privadas las rutas del dashboard
import React from 'react'
import { PropTypes } from 'prop-types';

import { Redirect, Route } from 'react-router-dom'

export const PrivateRoute = ({
    isAuthenticated,
    component: Component,
    ...rest //Resto de elementos
}) => {

    // Guarda la ruta antes de cerrar sesion
    localStorage.setItem('lastPath', rest.location.pathname);

    return (
        <Route {...rest}
            // props --> para recibir el history, location y search
            component={(props) => (
                (isAuthenticated)
                    ? (<Component {...props} />)
                    : (<Redirect to="/login" />)
            )}
        />
    )
}

PrivateRoute.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    component: PropTypes.func.isRequired
};