import React from "react";
import { Link } from 'react-router-dom';
import "../components/menu.css";

const Menu = props => {
    return(
        // <div className="container">
            <nav className="navbar navbar-expand-lg bg-light fixed-top">
                <div className="container-fluid">
                    <a className="navbar-brand">MealPlanner</a>
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <Link to={"/"} className="nav-link">Home</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to={"/planner"} className="nav-link">Manage Plan</Link>
                                </li>
                                <li class="nav-item">
                                    <Link to={"/report"} className="nav-link">See Report</Link>
                                </li>
                            </ul>
                        </div>
                </div>
            </nav>
        // </div>
    )
}

export default Menu;