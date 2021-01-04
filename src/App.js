import React from "react";
import "./App.css";
import Header from "./components/Header/Header.js";
import MemeGenerator from "./components/MemeGenerator/MemeGenerator.js";

function App() {
  return (
    <div>
      <div className="App">
        <Header></Header>
      </div>
      <div>
      <MemeGenerator/>
      </div>
    </div>
  );
}

export default App;
