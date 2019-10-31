import React from "react";
import { useAuth0 } from "../react-auth0-spa";

import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOutAlt, faSignInAlt } from '@fortawesome/free-solid-svg-icons'

import '../App.css'

const Navigation = () => {


    const { loginWithRedirect, isAuthenticated, logout } = useAuth0();

    return (
        <Navbar className='navbar' variant="dark">
            <Col xs={2}>
            </Col>
            <Col xs={8} className='header'><h2 className='title'>MinimaList</h2></Col>
            {/*Check to see if user is unauthenticated, populates NavBar with login button if true*/}

            <Col xs={2} className='logout'>
                {!isAuthenticated && (
                    <FontAwesomeIcon icon={faSignInAlt} className='icon logout' onClick={() => loginWithRedirect({})} />
                )}
                {/*Checks to see if user is authenticated, adds Log out button to NavBar if true*/}

                {isAuthenticated && (
                    <FontAwesomeIcon icon={faSignOutAlt} className='icon logout' onClick={() => logout()} />
                )}
            </Col>
        </Navbar>
    );
};

export default Navigation;