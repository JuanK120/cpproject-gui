import React, { useState, Fragment, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import Form from "./components/Form/Form";
import MainPage from "./components/MainPage/MainPage";
import SolutionList from "./components/Solution/SolutionList";

function App() {
  const [currentPage, setCurrentPage] = useState("main");

  const [SolveData, setSolveData] = useState("");


  const onChangePage = (newPage) => {
    setCurrentPage(newPage);
  };

  const onChangeSolveData = (data) => {
    setSolveData(data);
    setCurrentPage("solve");
  };

  let pageToRender = "";

  if (currentPage === "main") {
    pageToRender = <MainPage />;
  } else if (currentPage === "form") {
    pageToRender = <Form onSolve={onChangeSolveData} />;
  } else if (currentPage === "solve") {
    pageToRender = <SolutionList SolveData={SolveData}/>
  }

  return (
    <Fragment>
      <NavBar onChangePage={onChangePage} />
      {pageToRender}
    </Fragment>
  );
}

export default App;
