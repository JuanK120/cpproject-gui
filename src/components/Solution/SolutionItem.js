import React from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "font-awesome/css/font-awesome.min.css";
import styles from "./SolutionItem.module.css";

const SolutionItem = (args) => {
  return (
      <p className={args.className}>
        <strong>{args.number} &nbsp; &nbsp; &nbsp; &nbsp; <span className="fa fa-solid fa-arrow-right"/></strong>
      </p>
  );
};

export default SolutionItem;
