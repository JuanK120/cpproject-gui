import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "font-awesome/css/font-awesome.min.css";
import Card from "../Card/Card";
import SolutionItem from "./SolutionItem";
import styles from "./SolutionList.module.css";

const SolutionList = (args) => {
  const [currentSolution, setCurrentSolution] = useState("");
  const [solutionStatus, setSolutionStatus] = useState("inProgress");

  async function fetchSolution(data) {
    await axios.post("http://localhost:8000/RunWithForm/", data).then((res) => {
      const solution = res.data;
      setCurrentSolution(solution);
      setSolutionStatus(solution[1]);
    });
  }

  useEffect(() => {
    let data = args.SolveData;
    if (data.dataType == "File") {
      let data = new FormData();
      data.append("file", args.SolveData);
      axios.post("http://localhost:8000/RunWithFile/", data).then((res) => {
        const solution = res.data;
        setCurrentSolution(solution);
        setSolutionStatus(solution[1]);
      });
    } else if (data.dataType == "Form") {
      fetchSolution(data);
    }
  }, [args.SolveData]);

  let solucion = (
    <p className={styles.centered}>
      la ultima solucion encontrada se mostrara aqui
    </p>
  );

  if (currentSolution != "") {
    if (currentSolution[1] == "Unsatisfiable") {
      solucion = (
        <Card title="Problema Insatisfactible">
          <p>
            <strong>
              El problema aparentemente no tiene una solucion factible
            </strong>
          </p>
        </Card>
      );
    } else if (currentSolution[1] == "I") {
      solucion = (
        <Card title="Desconocido">
          <p>
            <strong>Parece que occurio algun problema con la ejecucion</strong>
          </p>
        </Card>
      );
    } else {
      let aux = currentSolution[0].Sol.map((escene) => (
        <SolutionItem className={`col-2`} key={escene} number={escene} />
      ));
      solucion = (
        <>
          <div className={`row`}>
            {aux}
            <p>
              <strong>Fin</strong>
            </p>
          </div>

          <div className={`row`}>
            <p>
              El costo es : <strong> {`$ ${currentSolution[0].costo}`} </strong>
            </p>
          </div>
        </>
      );
    }
  }

  return (
    <div className="container">
      <div className={`row align-items-center ${styles.row}`}>
        <h3 className="col-10"> la solucion es : </h3>
        {solutionStatus != "inProgress" ? (
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
            <div className={`row`}>
              <p>El orden de Ensayo es :</p>
            </div>
            {solucion}
          </div>
        </Card>

      </div>
    </div>
  );
};

export default SolutionList;
