import React from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "font-awesome/css/font-awesome.min.css";
import styles from "./Card.module.css";

function Card(args) {
  const classes = `card ${args.className} ${styles.card}`; //'card ' + args.className;
  let ret = (
    <div className={classes}>
      <div className="card-body">{args.children}</div>
    </div>
  );
  if (args.subTitle != null) {
    ret = (
      <div className={classes}>
        <div className={"card-header " + styles.background_light}>
          <p>{args.subTitle}</p>
        </div>
        <div className="card-body">{args.children}</div>
      </div>
    );
  }
  if (args.title != null) {
    ret = (
      <div className={classes}>
        <div className={"card-header " + styles.background_light}>
          <h2>{args.title}</h2>
        </div>
        <div className="card-body">{args.children}</div>
      </div>
    );
  }
  return ret;
}

export default Card;
