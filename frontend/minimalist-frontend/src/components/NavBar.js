import React from "react";
import { useAuth0 } from "../react-auth0-spa";
import { Link } from "react-router-dom";

const NavBar = () => {


    const { loginWithRedirect, isAuthenticated, logout } = useAuth0();

    return (
        <div>
            {/*Check to see if user is unauthenticated, populates NavBar with login button if true*/}
            {!isAuthenticated && (
                <button
                    onClick={() =>
                        loginWithRedirect({})
                    }
                >
                    Log in
        </button>
            )}

            {/*Checks to see if user is authenticated, populates NavBar with private links*/}
            {isAuthenticated && (
                <span>
                    <Link to="/">Home</Link>&nbsp;
                    <Link to="/profile">Profile</Link>
                </span>
            )}

            {/*Checks to see if user is authenticated, adds Log out button to NavBar if true*/}
            {isAuthenticated && <button onClick={() => logout()}>Log out</button>}
        </div>
    );
};

export default NavBar;