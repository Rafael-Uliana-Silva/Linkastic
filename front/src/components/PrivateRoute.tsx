/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Route, useNavigate } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }:any ) => {
    const isAuthenticated = !!localStorage.getItem('token');
    const navigate = useNavigate()

    return (
        <Route
            {...rest}
            render={(props: any) =>
                isAuthenticated ? (
                    <Component {...props} />
                ) : (
                    navigate("/login")
                )
            }
        />
    );
};

export default PrivateRoute;
