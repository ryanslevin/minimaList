import React, { useEffect } from "react";
import { Route } from "react-router-dom";
import { useAuth0 } from "../react-auth0-spa";

const PrivateRoute = ({ component: Component, path, ...rest}) => {
    const { loading, isAuthenticated, loginWithRedirect } = useAuth0();

    useEffect(() => {

        //Returns null if still loading or is authenticated
        if (loading || isAuthenticated) {
            return;
        }
        const fn = async () => {
            await loginWithRedirect({
                appState: { targetUrl: path }
            });
        };

        fn();
    }, [loading, isAuthenticated, loginWithRedirect, path]);

    //If user is authenticated, this route will render the default component,
    //if not it will return null
    const render = props => isAuthenticated === true ? <Component {...props} /> : null;

    return <Route path={path} render={render} {...rest} />;
};

export default PrivateRoute;