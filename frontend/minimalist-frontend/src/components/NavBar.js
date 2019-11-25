import React from "react";
import { useAuth0 } from "../react-auth0-spa";

import Navbar from "react-bootstrap/Navbar";
import Col from "react-bootstrap/Col";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Button from "react-bootstrap/Button"

import "../App.css"

const Navigation = () => {


    const { loginWithRedirect, isAuthenticated, logout } = useAuth0();

    return (
        <Navbar className="navbar" variant="dark">
            <Col xs={2}>
            </Col>
            <Col xs={8} className="header"><h2 className="title cursive">minima</h2><h2 className="title">List</h2></Col>
            {/*Check to see if user is unauthenticated, populates NavBar with login button if true*/}

            <Col sx={2} className="logout">
                {!isAuthenticated && (
                    <Button variant="outline-light" onClick={() => loginWithRedirect()}>Login</Button>
                )}
                {/*Checks to see if user is authenticated, adds Log out button to NavBar if true*/}

                {isAuthenticated && (
                    <Button variant="outline-light" onClick={() => logout()}>Logout</Button>

                )}
            </Col>
        </Navbar>
    );
};

export default Navigation;