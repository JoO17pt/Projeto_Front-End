import React, {useState} from "react";
import Menu from "./components/Menu";
import Content from "./components/Content";
import { BrowserRouter as Router } from 'react-router-dom';
import DataContextSearch, {dataSearch} from "../src/data/dataContext-search";
import DataContextPlan, {dataPlan} from "../src/data/dataContext-plan";

function App() {
  const [recips, setRecips] = useState(dataSearch);
  const [plan, setPlan] = useState(dataPlan);
  return (
    <Router>
      <DataContextPlan.Provider value = {[plan, setPlan]}>
        <DataContextSearch.Provider value = {{recips, setRecips}}>
          <Menu></Menu>
          <Content></Content>
        </DataContextSearch.Provider>
      </DataContextPlan.Provider>
    </Router>
  )
}

export default App;