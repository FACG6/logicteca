import React, { Component } from "react";
import "./App.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTrash, faFilter, faPlus } from "@fortawesome/free-solid-svg-icons";

library.add(faTrash, faFilter, faPlus);

function App() {
  return <div>Hello World</div>;
}

export default App;
