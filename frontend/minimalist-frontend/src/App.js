import React from "react";
import Navigation from "./components/NavBar";

import { BrowserRouter, Route, Switch } from "react-router-dom";
import Tasks from "./components/Tasks"

import Container from 'react-bootstrap/Container';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Container className="app">
      <BrowserRouter>
          <Navigation />
        <Switch>
          <Route path="/" exact />
        </Switch>
      </BrowserRouter>
      <h2>minimaList</h2>
      <Tasks />
    </Container>
  );
}

export default App;