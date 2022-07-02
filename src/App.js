import React, {useState} from "react";
import Menu from "./components/Menu";
import Content from "./components/Content";
import { BrowserRouter as Router } from 'react-router-dom';
import DataContext, {data} from "../src/data/dataContext-search";

function App() {
  const [recips, setRecips] = useState(data);
  return (
    <Router>
      <DataContext.Provider value = {{recips, setRecips}}>
        <Menu></Menu>
        <Content></Content>
      </DataContext.Provider>
    </Router>
  )
}

export default App;