import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = ({ user }) => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            {
                !user && <NavLink className="navbar-brand" to="/">To-Do App</NavLink>
            }
            {
                user && <NavLink className="navbar-brand" to="/home">To-Do App</NavLink>
            }

            <button className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse flex-row-reverse" id="navbarNav">
                <ul className="navbar-nav">
                    {!user && (
                        <React.Fragment>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/login">Login</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/register">Register</NavLink>
                            </li>
                        </React.Fragment>
                    )
                    }
                    {user && (
                        <React.Fragment>
                            <li className="nav-item">
                                <NavLink className="nav-link active" to="/userProfile">{user.name}</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/logout">Logout</NavLink>
                            </li>
                        </React.Fragment>
                    )
                    }
                </ul>
            </div>
        </nav>
    );
}

export default Navbar