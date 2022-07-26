import React from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "font-awesome/css/font-awesome.min.css";
import styles from "./MainPage.module.css";

const MainPage = () => {
  return (
    <div className="container">
      <div className={`row ${styles.row}`}>
        <h4> Proyecto Final Programacion Por Restricciones : </h4>
        <p>
          Esta es la interfaz en la que se presenta la ejecucion del proyecto de
          la materia de Programacion por Restricciones, cursada en el periodo
          Abril-Agosto de 2022 en la universidad del valle, Presentada al
          Profesor Juan Francisco Diaz Frias, Elaborado y Presentado por los 
          estudiantes Juan Camilo Rosero Lopez y Alejandro Caicedo Caicedo.
        </p>
        <br />
        <p>
          Este Proyecto, Consiste en la ejecucion y luego presentacion de los
          resultados de un modelo de Minizinc, el cual es una creacion propia
          del grupo de trabajo, y que esta hecha basada en un enunciado de un
          problema al cual se le quiere buscar una solucion. el problema, es en
          resumen el siguiente :
        </p>
      </div>
      <div className={`row ${styles.row}`}>
        <div
          className={`card rounded ${styles.card} ${styles.background_pale}`}
        >
          <div className="card-body">
            <blockquote className={`blockquote mb-0`}>
              el problema busca determinar la organización de los ensayos para
              una telenovela, este problema parte de las premisas de que en
              todas las telenovelas las escenas no necesariamente se ensayan en
              el mismo orden en el que se van a emitir, que cada escena tiene
              una duración que puede ser diferente de las otras, que no todos
              los actores están presentes en las telenovelas, que cada actor
              tiene un costo diferente y que este cobra por el tiempo que debe
              permanecer en el set de grabación, independientemente de si esta
              en un ensayo o no esta haciendo nada. el problema busca optimizar
              costo de la producción de la telenovela, a través de optimizar el
              orden de los ensayos de tal manera que los actores pasen el menor
              tiempo posible en el set, y así reduciendo el costo total que
              tiene tener a los actores en el set para realizar los ensayos
            </blockquote>
          </div>
        </div>
      </div>
      <div className={`row ${styles.row}`}>
        <br />
        <p>
          Esta implementacion consta de Esta Pagina Principal, donde se
          explicará el funcionamiento de la interfaz, y de un formulario, el
          cual es del que se basa el funcionamiento de la interfaz como tal.
        </p>
      </div>
      <div className={`row ${styles.row}`}>
        <h6> ejecucion : </h6>
        <p>
          Para Hacer uso de la interfaz, lo primero que hay que hacer es
          dirigirse a la pestaña de formulario, ahi se mostara una pequeña
          interfaz con 2 campos, para ingresar el numero de actores y de 
          escensa con los cuales queremos modelar nuestro problema. de ahi
          se podrá ver como se despliega una serie de campos en los que
          debemos llenar, teniendo que estar, como minimo, para los campos
          de actores, los espacios de Nombre y Costo, los otros son espacios
          opcionales por si queremos añadir datos extra, uno siendo la
          Disponibilidad de ese actor, indicando el munero de unidades de
          tiempo maximo que puede llegar a ocupar en la produccion. el otro
          dato opcional es el menú a evitar, en este seleccionamos e indicamos
          con cuales otros actores, el actor que estamos describiendo en ese
          momento preferiria no cruzarse. en escenas, debemos llenar la duración
          de la escena y los actores que participan en la misma.
        </p>
        <br />
        <p>
          una vez lleno este formulario, le damos a Submit, este boton enviará
          a resolver el modelo con estos datos que acabamos de ingresar, y luego
          nos llevara a una interfaz nueva, donde nos mostrará la solucion a
          ese problema, mostrandonos el orden mas optimo en el que deberiamos
          ensayar las escenas para que nos salga lo menos costosa posible la
          producion y nos mostrará tambien entonces el costo de este orden
          propuesto
        </p>
      </div>
    </div>
  );
};

export default MainPage;
