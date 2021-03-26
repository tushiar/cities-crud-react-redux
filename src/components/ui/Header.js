import React from "react";
import {NavLink} from 'react-router-dom';
import classes from "./Header.module.css";

const Header = () => {
  return (
    <header className={classes.Header}>
      <nav>
        <ul>
          <li><NavLink to="/all">All</NavLink> </li>
          <li><NavLink to="/shortlisted">Shortlisted</NavLink></li>
        </ul>
      </nav>
    </header>
  );
};
export default Header;
