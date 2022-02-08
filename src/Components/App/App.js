import React, {Component} from "react";
import {Link, Route, Routes} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';

import AuthService from "../../Services/auth-service";
import Home from "./Home/Home";
import RegisterComponent from "../Register/RegisterComponent";
import LoginComponent from "../Login/LoginComponent";
import ProfileComponent from "../Profile/ProfileComponent";
import ManagerComponent from "../Manager/ManagerComponent";

class App extends Component {
  constructor(props) {
    super(props);

    this.logOut = this.logOut.bind(this);

    this.state = {
      currentUser: undefined
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user
      });
    }
  }

  logOut() {
    AuthService.logOut();
  }

  render() {
    const {currentUser} = this.state;

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
              {currentUser
                  ? (
                      <li className="nav-item">
                        <Link to={"/manager"} className="nav-link">
                          Manage Quizzes
                        </Link>
                      </li>
                      )
                  : (<></>)
              }
            </div>

            {currentUser
              ? (
                  <div className="navbar-nav mt-auto">
                    <li className="nav-item">
                      <Link to={"/profile"} className="nav-link">
                        {currentUser.email}
                      </Link>
                    </li>
                    <li className="nav-item">
                      <a href="/login" className="nav-link" onClick={this.logOut}>
                        LogOut
                      </a>
                    </li>
                  </div>
                )
                : (
                  <div className="navbar-nav mt-auto">
                    <li className="nav-item">
                      <Link to={"/login"} className="nav-link">
                        LogIn
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link to={"/register"} className="nav-link">
                        Register
                      </Link>
                    </li>
                  </div>
                )
            }
          </nav>

          <div className="container mt-3">
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/register" element={<RegisterComponent />} />
              <Route exact path="/login" element={<LoginComponent />} />
              <Route exact path="/profile" element={<ProfileComponent />} />
              <Route exact path="/manager" element={<ManagerComponent />} />
            </Routes>
          </div>
        </div>
    );
  }
}

export default App;
