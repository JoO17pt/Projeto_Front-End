import React, {useState} from "react";
import Menu from "./components/Menu";
import Content from "./components/Content";
import { BrowserRouter as Router } from 'react-router-dom';

function App() {
  return (
    <Router>
        <Menu></Menu>
        <Content></Content>
    </Router>
  )
}

export default App;
