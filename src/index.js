import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";

import { login, logout } from './services/auth';
import Profile from './components/Profile';
import Callback from './components/Callback';
import "./styles.css";

function App() {

  const initiateLogin = () => {
    login();
  }

  const initiateLogout = () => {
    logout();
  }

  return (
    <div className="App">
      <button onClick={initiateLogin}>Login</button>
      <button onClick={initiateLogout}>Logout</button>
      <Profile />
      <Router>
        <Route path="/callback" component={Callback} />
      </Router>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
