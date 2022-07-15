import React from "react";
import { Link } from "react-router-dom";
import "../components/styles/menu.css";

const Menu = (props) => {
  return (
    <nav className="navbar navbar-expand-lg bg-light fixed-top">
      <div className="container-fluid">
        <a className="navbar-brand bold">
          MealPlanner
          <img id="menuIcon" src="/img/asparagus.png"></img>
        </a>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item bold">
              <Link to={"/"} className="nav-link">
                Home
              </Link>
            </li>
            <li className="nav-item bold">
              <Link to={"/planner"} className="nav-link">
                Manage Plan
              </Link>
            </li>
            <li class="nav-item bold">
              <Link to={"/report"} className="nav-link">
                See Report
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Menu;
