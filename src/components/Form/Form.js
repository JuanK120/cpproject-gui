import React, { Fragment, useEffect, useState } from "react";
import Card from "../Card/Card";
import Escene from "./Escene";
import Actor from "./Actor";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "font-awesome/css/font-awesome.min.css";
import styles from "./Form.module.css";

const Form = (args) => {
  /// States for Input Form

  const [numActors, setNumActors] = useState(0);
  const [numEscenes, setNumEscenes] = useState(0);
  const [actorsInfo, setActorsInfo] = useState(new Array(numActors));
  const [escenesInfo, setEscenesInfo] = useState(new Array(numEscenes));

  /// States for File Form

  const [selectedFile, setSelectedFile] = useState("");
  const [fileValid, setFileValid] = useState(true);

  /// Funtions for Input Form

  const onsubmitWithFormHandler = (event) => {
    event.preventDefault();
    let modelData = {
      dataType: "Form",
      Actores: [],
      NumActores: 0,
      NumEscenas: 0,
      Escenas: [],
      Duracion: [],
      NumActoresConDisponibilidad: 0,
      Disponibilidad: [],
      NumEvitaciones: 0,
      Evitar: [],
      problemType: "",
    };

    modelData.Actores = `Actores = {${actorsInfo.map(
      (actor) => `${actor.name}`
    )}};`.replace("/,}", "}");
    modelData.NumActores = numActors;
    modelData.NumEscenas = numEscenes;
    modelData.Escenas = new Array(numActors);
    for (let i = 0; i < modelData.Escenas.length; i++) {
      modelData.Escenas[i] = new Array(numEscenes + 1).fill(0);
    }
    modelData.Duracion = new Array(numEscenes);
    modelData.Disponibilidad = new Array();
    modelData.Evitar = new Array();
    for (let i = 0; i < numActors; i++) {
      for (let j = 0; j < numEscenes; j++) {
        if (escenesInfo[j].actorsInEscene.includes(i)) {
          modelData.Escenas[i][j] = 1;
        } else {
          modelData.Escenas[i][j] = 0;
        }
        modelData.Duracion[j] = +escenesInfo[j].duration;
      }
      modelData.Escenas[i][numEscenes] = +actorsInfo[i].cost;
      for (let k = 0; k < actorsInfo[i].toAvoid.length; k++) {
        if (actorsInfo[i].toAvoid[k] != 0) {
          modelData.Evitar.push([actorsInfo[i].name, actorsInfo[k].name]);
        }
      }
      modelData.Disponibilidad.push([actorsInfo[i].name, +actorsInfo[i].disponibility]);
    }
    modelData.NumActoresConDisponibilidad = modelData.Disponibilidad.length;
    modelData.NumEvitaciones = modelData.Evitar.length;
    if (modelData.NumEvitaciones == 0) {
      modelData.problemType = "Simple";
    } else {
      modelData.problemType = "Complex";
    }

    args.onSolve(modelData);
  };

  const NumActorsChangeHandler = (event) => {
    setNumActors(+event.target.value);
  };

  const NumEscenesChangeHandler = (event) => {
    setNumEscenes(+event.target.value);
  };

  const onAddActorChangeHandler = (event) => {
    event.preventDefault();
    setNumActors(+numActors + 1);
  };

  const onAddEsceneHandler = (event) => {
    event.preventDefault();
    setNumEscenes(+numEscenes + 1);
  };

  const onSaveActorInfo = (newInfo) => {
    let currentInfo = actorsInfo;
    currentInfo[newInfo.index] = newInfo;
    setActorsInfo([...currentInfo.filter((actor) => actor.name != "")]);
  };

  const onSaveEsceneInfo = (newInfo) => {
    let currentInfo = escenesInfo;
    currentInfo[newInfo.index] = newInfo;
    setEscenesInfo([...currentInfo]);
  };

  const onDeleteActor = (event) => {
    event.preventDefault();
    let currentNumActors = numActors;
    let currentActorsInfo = actorsInfo;
    currentActorsInfo.pop();
    setActorsInfo([...currentActorsInfo]);
    setNumActors(currentNumActors - 1);
  };
  const onDeleteEscene = (event) => {
    event.preventDefault();
    let currentNumEscenes = numEscenes;
    let currentEscenesInfo = escenesInfo;
    currentEscenesInfo.pop();
    setEscenesInfo([...currentEscenesInfo]);
    setNumEscenes(currentNumEscenes - 1);
  };

  let actors = [];
  if (numActors != 0) {
    for (let i = 0; i < numActors; i++) {
      actors.push(
        <Actor
          key={`A${i}`}
          index={i}
          actors={actorsInfo}
          onSaveActor={onSaveActorInfo}
          onDeleteActor={onDeleteActor}
        ></Actor>
      );
    }
  }

  let escenes = [];
  if (numEscenes != 0) {
    for (let i = 0; i < numEscenes; i++) {
      escenes.push(
        <Escene
          key={`E${i}`}
          index={i}
          onSaveEscene={onSaveEsceneInfo}
          actors={actorsInfo}
        ></Escene>
      );
    }
  }

  /// Functions for File Form.

  const selectedFileChangeHandler = (event) => {
    let file = event.target.files[0];
    if (file == undefined) {
      setFileValid(false);
    } else {
      let isValid = file.name.split(".")[1] == "dzn";
      setFileValid(isValid);
      setSelectedFile(file);
    }
  };

  const onsubmitWithFileHandler = (event) => {
    event.preventDefault();
    let modelData = {
      dataType: "File",
      file: selectedFile,
    };
    args.onSolve(modelData);
  };

  return (
    <div className="row">
      <div className="container col-12 col-md-5">
        <Card title="Ingrese datos de forma manual">
          <form onSubmit={onsubmitWithFormHandler}>
            <div className={`form-group ${styles.formRow}`}>
              <label htmlFor="NumActors" className="col-12 col-md-2">
                Num. Actores
              </label>
              <input
                type="text"
                id="NumActors"
                className="col-12 col-md-3"
                onChange={NumActorsChangeHandler}
                value={numActors}
              ></input>
              <label
                htmlFor="NumActors"
                className="col-12 col-md-2 offset-md-1"
              >
                Num. Escenas
              </label>
              <input
                type="text"
                id="NumEscenes"
                className="col-12 col-md-3"
                onChange={NumEscenesChangeHandler}
                value={numEscenes}
              ></input>
            </div>

            {numActors != 0 ? (
              <div className="form-group row">
                <Card>
                  <h4>Actores : </h4>
                  {actors}
                  <div className="row justify-content-end ">
                    <div className={`btn-group col-2`}>
                      <button
                        className={`btn btn-sm ${styles.background_light}`}
                        onClick={onDeleteActor}
                      >
                        <span className="fa fa-duotone fa-minus"></span>
                      </button>
                      <button
                        className={`btn btn-sm ${styles.background_green}`}
                        onClick={onAddActorChangeHandler}
                      >
                        <span className="fa fa-duotone fa-plus"></span>
                      </button>
                    </div>
                  </div>
                </Card>
              </div>
            ) : (
              <></>
            )}

            {numEscenes != 0 ? (
              <div className="form-group row">
                <Card>
                  <h4>Escenas : </h4>
                  {escenes}
                  <div className="row justify-content-end ">
                    <div className={`btn-group col-2`}>
                      <button
                        className={`btn btn-sm ${styles.background_light}`}
                        onClick={onDeleteEscene}
                      >
                        <span className="fa fa-duotone fa-minus"></span>
                      </button>
                      <button
                        className={`btn btn-sm ${styles.background_green}`}
                        onClick={onAddEsceneHandler}
                      >
                        <span className="fa fa-duotone fa-plus"></span>
                      </button>
                    </div>
                  </div>
                  <div className="row justify-content-center">
                    <input
                      type="submit"
                      className={`btn btn-sm col-4 ${styles.background_light}`}
                      value="Submit"
                    ></input>
                  </div>
                </Card>
              </div>
            ) : (
              <></>
            )}
          </form>
        </Card>
      </div>
      {/* 
      <div className="container col-12 col-md-5 offset-md-1">
        <Card title="Suba un Archivo dzn">
          <form onSubmit={onsubmitWithFileHandler}>
            <div className={`row ${styles.formRow}`}>
              <input type="file" onChange={selectedFileChangeHandler} />
            </div>

            {fileValid ? (
              <></>
            ) : (
              <div className={`row justify-content-center`}>
                <span className="alert alert-danger">
                  <p>
                    <strong>Por favor seleccione un archivo .dzn valido</strong>
                  </p>
                </span>
              </div>
            )}

            <div className="row justify-content-center">
              <input
                type="submit"
                className={`btn btn-sm col-4 ${styles.background_light}`}
                value="Submit"
                disabled={!fileValid}
              ></input>
            </div>
          </form>
        </Card>
      </div>
      */}
    </div>
  );
};

export default Form;
