import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Header from "./Header";
import Register from "./Register";
import Login from "./Login";
import { getApi } from "./Api";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

// Implement React Router for page navigation
// localhost.com/homepage
// localhost.com/login
// localhost.com/about
// localhost.com/register

class App extends Component {
  state = {
    users: [],
  };

  componentDidMount() {
    getApi("/users").then((data) => this.setState({ users: data }));
  }

  render() {
    return (
      <Router>
        <div className="app">
          <Switch>
            <Route path="/about">
              <Header />
              <h1>About Us Page</h1>
            </Route>
            <Route path="/login">
              <Header />
              <Login />
            </Route>
            <Route path="/register">
              <Header />
              <Register />
            </Route>
            <Route path="/">
              <Header />
              <h1>Homepage</h1>
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
