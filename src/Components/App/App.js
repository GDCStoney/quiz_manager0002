import React, {Component} from "react";
import {Link, Route, Routes} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';

import Home from "./Home/Home";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: ""
    };
  }

  render() {
    return (
        <div>
          <nav className="navbar navbar-expand navbar-dark bg-dark">
            <Link to={"/"} className="navbar-brand">
              Quiz Manager
            </Link>
            <div className="navbar-nav me-auto">
              <li className="nav-item">
                <Link to={"/"} className="nav-link">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/"} className="nav-link">
                  Manage Quizzes
                </Link>
              </li>
            </div>
            <div className="navbar-nav mt-auto">
              <li className="nav-item">
                <Link to={"/"} className="nav-link">
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/"} className="nav-link">
                  Register
                </Link>
              </li>
            </div>
          </nav>

          <div className="container mt-3">
            <Routes>
              <Route exact path="/" element={<Home />} />
            </Routes>
          </div>
        </div>
    );
  }
}

export default App;
