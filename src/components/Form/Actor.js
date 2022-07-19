import React, { useEffect, useState } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "font-awesome/css/font-awesome.min.css";
import styles from "./Escene.module.css";
import Card from "../Card/Card";

const Actor = (args) => {
  const [actorName, setActorName] = useState("");
  const [actorCost, setActorCost] = useState(0);
  const [disponibility, setDisponibility] = useState(0);
  const [actorsToAvoid, setActorsToAvoid] = useState(
    new Array(+args.actors.length).fill(0)
  );


  useEffect(() => {
    const timer = setTimeout(() => {
      args.onSaveActor(
        {
          index: args.index,
          name: actorName,
          cost: actorCost,
          toAvoid: actorsToAvoid,
          disponibility: disponibility,
        }
        
      );
    }, 200);
    return () => clearTimeout(timer);
  }, [actorName, actorCost, actorsToAvoid, disponibility]);

  const nameChangeHandler = (event) => {
    setActorName(event.target.value);
  };

  const disponibilityChangeHandler = (event) => {
    setDisponibility(+event.target.value);
  };

  const actorsToAvoidChangeHandler = (event) => {
    let actorChanged = +event.target.value;
    if (event.target.checked) {
      let newActors = [...actorsToAvoid];
      newActors[actorChanged] = 1;
      setActorsToAvoid(newActors);
    } else {
      let newActors = [...actorsToAvoid];
      newActors[actorChanged] = 0;
      setActorsToAvoid([...newActors]);
    }
  };

  const CostChangeHandler = (event) => {
    setActorCost(event.target.value);
  };

  return (
    <Card className={`justify-content-end  ${styles.item}`}>
      <div className="row">
        <div className="containter col-12 col-md-6 ">
          <div className={`row ` + styles.item}>
            <label className="col-12 col-md-5">Nombre</label>
            <input
              type="text"
              className="col-12 col-md-7"
              onChange={nameChangeHandler}
              value={actorName}
            ></input>
          </div>
          <div className={`row ` + styles.item}>
            <label className="col-12 col-md-5">Sueldo</label>
            <input
              type="number"
              className="col-12 col-md-7"
              onChange={CostChangeHandler}
              value={actorCost}
            ></input>
          </div>
          <div className={`row ` + styles.item}>
            <label className="col-12 col-md-5">horas Disponibles</label>
            <input
              type="number"
              className="col-12 col-md-7"
              onChange={disponibilityChangeHandler}
              value={disponibility}
            ></input>
          </div>
        </div>
        <div className="containter col-12 col-md-5 offset-md-1">
          <p className="row">Actores A Evitar :</p>
          <div className="form-group form-check">
            {args.actors.map((actor) => (
              <div className="row" key={actor.name}>
                <input
                  className="form-check-input col-1"
                  type="checkbox"
                  value={actor.index}
                  id={actor.name}
                  onChange={actorsToAvoidChangeHandler}
                ></input>
                <label className="form-check-label col-8" htmlFor={actor.name}>
                  {` ${actor.name} `}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default Actor;
