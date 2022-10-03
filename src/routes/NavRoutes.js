import React from 'react'
import { Route } from 'react-router'
import Layout from '../hocs/Layout'

function NavRoutes({ component: Component, ...rest }) {
    return (
        <Route {...rest} render={props => (
            <Layout>
                <Component {...props} />
            </Layout>
        )} />
    )
}

export default NavRoutes
