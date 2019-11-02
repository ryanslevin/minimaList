import React from "react";
import { useAuth0 } from "../react-auth0-spa";

import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import "../App.css"

const Welcome = () => {


    const { loginWithRedirect, isAuthenticated, logout } = useAuth0();

    return (

        <>
            {!isAuthenticated && (
                <Container className="welcome">
                    <Button className="button welcome-button"
                        onClick={() =>
                            loginWithRedirect({})
                        }
                    >
                        Click here to get productive
                        </Button>
                </Container>

            )}
        </>
    )

};

export default Welcome;