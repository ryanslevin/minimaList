import React from "react";
import { useAuth0 } from "../react-auth0-spa";

import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

import "../App.css"

const Welcome = () => {


    const { loginWithRedirect, isAuthenticated } = useAuth0();

    return (

        <>
            {!isAuthenticated && (
                <Container className="welcome">
                    <p>Simply productive.</p>
                    <Button variant="outline-light" className="welcome-button"
                        onClick={() =>
                            loginWithRedirect({})
                        }
                    >
                        Get Started
                        </Button>
                </Container>

            )}
        </>
    )

};

export default Welcome;