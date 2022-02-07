import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import {Link} from "react-router-dom";

function App() {
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
    </div>
  );
}

export default App;
