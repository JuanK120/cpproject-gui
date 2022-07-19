import React, { useEffect, useState } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "font-awesome/css/font-awesome.min.css";
import styles from "./Escene.module.css";
import Card from "../Card/Card";

const Escene = (args) => {
  const [actorsInEscene, setActorsInEscene] = useState(
    new Array(+args.actors.length).fill(-1)
  );
  const [duration, setDuration] = useState(0);
  const actors = args.actors
  useEffect(() => {
    const timer = setTimeout(() => {
      args.onSaveEscene(
        {
          index: args.index,
          actorsInEscene : actorsInEscene,
          duration : duration,
        }
      );
    }, 200);
    return () => clearTimeout(timer);
  }, [actorsInEscene, duration]);

  const durationChangeHandler = (event) => {
    setDuration(event.target.value);
  };

  const actorsInEsceneChangeHandler = (event) => {
    let actorChanged = event.target.value;
    if (event.target.checked) {
      let newActors = [...actorsInEscene];
      newActors[+actorChanged] = +actorChanged;
      setActorsInEscene(newActors);
    } else {
      let newActors = actorsInEscene;
      newActors[+actorChanged] = -1;
      setActorsInEscene([...newActors]);
    }
  };
  return (
    <Card className={`${styles.item}`}>
      <p className="row">
        <strong>{`Escena numero ${args.index + 1}`}</strong>
      </p>
      <div className="row">
        <div className="containter col-11 col-md-5 offset-1">
          <div className="row">
            <p className="col-6 col-md-12">Actores que participan :</p>
            <div className="form-group form-check col-5 col-md-11 offset-1">
              {actors.map((actor) => (
                <div className="row" key={actor.name}>
                  <input
                    className="form-check-input col-1"
                    type="checkbox"
                    value={actor.index}
                    id={actor.name}
                    onChange={actorsInEsceneChangeHandler}
                  ></input>
                  <label
                    className="form-check-label col-8"
                    htmlFor={actor.name}
                  >
                    {` ${actor.name} `}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="containter col-12 col-md-6">
          <div className="form-group">
            <label className="col-12 col-md-5">Duracion</label>
            <input
              type="text"
              className="col-12 col-md-6"
              onChange={durationChangeHandler}
              value={duration}
            ></input>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default Escene;
