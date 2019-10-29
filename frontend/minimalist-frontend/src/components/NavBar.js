import React from "react";
import { useAuth0 } from "../react-auth0-spa";

import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';

import '../App.css'

const Navigation = () => {


    const { loginWithRedirect, isAuthenticated, logout } = useAuth0();

    return (
        <Navbar className='navbar' variant="light">
            {/*Check to see if user is unauthenticated, populates NavBar with login button if true*/}
            {!isAuthenticated && (
                <Button variant="outline-success" className="mr-sm-2"
                    onClick={() =>
                        loginWithRedirect({})
                    }
                >
                    Log in
                </Button>
            )}
            {/*Checks to see if user is authenticated, adds Log out button to NavBar if true*/}
            {isAuthenticated && <Button variant="outline-danger" className="mr-sm-2" onClick={() => logout()}>Log out</Button>}
        </Navbar>
    );
};

export default Navigation;