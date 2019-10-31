import React from "react";

import Navigation from "./components/NavBar";
import Welcome from "./components/Welcome";

import Tasks from "./components/Tasks"
import Container from 'react-bootstrap/Container';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <>
    <Navigation />
    <Container className="app">
      <Welcome />
      <Tasks />
    </Container>
    </>
  );
}

export default App;