import React from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "font-awesome/css/font-awesome.min.css";
import styles from "./NavBar.module.css";

const NavBar = (args) => {
  const toMainPageHandler = () => {
    args.onChangePage("main");
  };

  const toFormPageHandler = () => {
    args.onChangePage("form");
  };

  return (
    <nav
      className={`navbar navbar-expand-lg ${styles.background_dark} ${styles.nav} me-auto`}
    >
      <div className={"container-fluid"}>
        <a
          className={"navbar-brand offset-1 col'3"}
          href="#"
          onClick={toMainPageHandler}
        >
          <img src={require("../imgs/Logo_UV.png")} height={70} width={60} />
        </a>
        <ul className={`navbar-nav ${styles.navbar_right}`}>
          <li className="nav-item">
            <a className={"nav-link "} onClick={toMainPageHandler}>
              <span className="fa fa-home fa-lg"></span> Inicio &nbsp;
            </a>
          </li>
          <li className="nav-item">
            <a className={"nav-link "} onClick={toFormPageHandler}>
              <span className="fa fa-info fa-lg"></span> Formulario &nbsp;
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
