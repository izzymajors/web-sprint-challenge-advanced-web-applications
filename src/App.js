import React from "react";
import {  BrowserRouter as Router, Route, Switch, Link, useHistory } from "react-router-dom";

import Login from "./components/Login";
import BubblePage from "./components/BubblePage";
import PrivateRoute from "./components/PrivateRoute";
import "./styles.scss";

import { axiosWithAuth } from "./components/axiosWithAuth";

function App() {
  const history = useHistory();

  const logout = () => {
    // axios call to logout - usually will invalidate the token from the server
    axiosWithAuth()
      .post("/api/logout")
      .then(() => {
        // remove the token from localStorage
        localStorage.removeItem("token");
        // re-route to the Login
        history.push("/login");
      });
  };
  return (
    <div className="App">
      <ul>
        <li>
          <Link to="/login">Login</Link>
        </li>
        {/* <li>
          <Link onClick={logout}>Logout</Link>
        </li> */}
        <li>
          <Link to="/protected">Protected Page</Link>
        </li>
      </ul>
      <Switch>
        <PrivateRoute exact path= "/protected" component={BubblePage} />
        <Route exact path="/" component={Login} />
        <Route component={Login} />
      </Switch>
    </div>
  );
}

export default App;

//Task List:
//1. Render BubblePage as a PrivateRoute