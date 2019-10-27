import React from "react";
import NavBar from "./components/NavBar";

// New - import the React Router components, and the Profile page component
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Profile from "./components/Profile";
import PrivateRoute from './components/PrivateRoute';
import PrivateApi from './components/PrivateApi';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <header>
          <NavBar />
        </header>
        <Switch>
          <Route path="/" exact />
          <PrivateRoute path="/profile" component={Profile} />
          <PrivateRoute path="/private-api" component={PrivateApi} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;