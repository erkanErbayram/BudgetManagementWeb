import React from "react";
import { Route, Redirect } from "react-router-dom";
import Spinner from "../Spinner";

import { useSelector } from 'react-redux';
import MainLayout from '../hocs/MainLayout'

const MainRoutes = ({
    component: Component,
    ...rest
}) => {

    const isAuthenticated = useSelector(state => state.authReducer.isAuthenticated);
    const loading = useSelector(state => state.authReducer.loading);

    return (
        <Route
            {...rest}
            render={(props) =>
                loading ? (
                    <Spinner />
                ) : isAuthenticated ? (

                    <MainLayout>
                        <Component {...props} />
                    </MainLayout>
                ) : (
                    <Redirect to="/login" />
                )
            }
        />
    )
};


export default MainRoutes;
