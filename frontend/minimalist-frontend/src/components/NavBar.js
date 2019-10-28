import React from "react";
import { useAuth0 } from "../react-auth0-spa";
import { Link } from "react-router-dom";

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav'

import '../App.css'

const Navigation = () => {


    const { loginWithRedirect, isAuthenticated, logout } = useAuth0();

    return (
        <Navbar className='navbar' bg="dark" variant="dark">
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
                <>
                    <Nav.Item><Link to="/">Home</Link></Nav.Item>
                    <Nav.Item><Link to="/profile">Profile</Link></Nav.Item>
                </>
            )}

            {/*Checks to see if user is authenticated, adds Log out button to NavBar if true*/}
            {isAuthenticated && <button onClick={() => logout()}>Log out</button>}
        </Navbar>
    );
};

export default Navigation;