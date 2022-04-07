import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function NavBar() {
  return (
    <nav className="navbar navbar-dark bg-dark navbar-expand-lg ">
      <Link to="/" className="navbar-brand">
        HomePage
      </Link>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li>
            <Link to="/test" className="navbar-brand">
              Test
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
