import React from "react";
import Navigation from "./components/NavBar";

import { BrowserRouter, Route, Switch } from "react-router-dom";
import Profile from "./components/Profile";
import Tasks from "./components/Tasks"
import PrivateRoute from './components/PrivateRoute';

import Container from 'react-bootstrap/Container';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Container className="app">
      <BrowserRouter>
          <Navigation />
        <Switch>
          <Route path="/" exact />
          <PrivateRoute path="/profile" component={Profile} />
        </Switch>
      </BrowserRouter>
      <Tasks />
    </Container>
  );
}

export default App;