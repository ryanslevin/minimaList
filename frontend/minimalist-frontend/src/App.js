import React from "react";

import Navigation from "./components/NavBar";
import Welcome from "./components/Welcome";
import Background from "./components/Background"

import Tasks from "./components/Tasks"
import Container from "react-bootstrap/Container";

import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <>
    <Background />
    <Container className="app">
    <Navigation />
      <Welcome />
      <Tasks />
    </Container>
    </>
  );
}

export default App;