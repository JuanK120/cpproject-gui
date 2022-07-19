import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "font-awesome/css/font-awesome.min.css";
import Card from "../Card/Card";
import SolutionItem from "./SolutionItem";
import styles from "./SolutionList.module.css";

const SolutionList = (args) => {
  const [currentSolution, setCurrentSolution] = useState([[1, 2, 3], 12]);
  const [solutionStatus, setSolutionStatus] = useState("inProgress");

  useEffect(() => {
    let data = args.SolveData;
    if (data.dataType == "File") {
      let data = new FormData();
      data.append("file", args.SolveData);
      console.log(data);
      axios.post("http://localhost:8000/RunWithFile/", data).then((res) => {
        const solution = res.data;
        console.log(solution);
        setCurrentSolution(solution);
      });
    } else if (data.dataType == "Form") {
      axios.post("http://localhost:8000/RunWithForm/", data).then((res) => {
        const solution = res.data;
        console.log("here");
        setCurrentSolution(solution);
      });
    }
  }, [args.SolveData]);

  let solucion = (
    <p className={styles.centered}>
      la ultima solucion encontrada se mostrara aqui
    </p>
  );

  if (currentSolution != "") {
    if (solucion[1] == "Unsatisfiable") {
      solucion = (
        <Card title="Problema Insatisfactible">
          <p>
            <strong>
              El problema aparentemente no tiene una solucion factible
            </strong>
          </p>
        </Card>
      );
    } else {
      solucion = currentSolution[0].map((escene) => (
        <SolutionItem className={`col-2`} key={escene} number={escene} />
      ));
    }
  }

  return (
    <div className="container">
      <div className={`row align-items-center ${styles.row}`}>
        <h3 className="col-10"> la solucion es : </h3>
        {solutionStatus == "done" ? (
          <></>
        ) : (
          <div className="col-2">
            <span
              className={`fa fa-3x fa-solid fa-rotate-right ${styles.animation_spin}`}
            ></span>
          </div>
        )}
      </div>
      <div className={`row align-center ${styles.row}`}>
        <Card>
          <div className={`row`}>
            <p>El orden de Ensayo es :</p>
          </div>
          <div className={`row`}>{solucion}</div>
          <div className={`row`}>
            <p>
              El costo es : <strong> {`$ ${currentSolution[1]}`} </strong>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default SolutionList;
