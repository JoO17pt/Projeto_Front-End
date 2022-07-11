import React, { useContext, useState, useEffect } from "react";
import DataContextPlan from "../data/dataContext-plan";
import "../components/report.css"

const Report = (props) => {
  const [plan, setPlan] = useContext(DataContextPlan);
  const [results, setResults] = useState();
  const [results2, setResults2] = useState();

  useEffect(() => {
    renderizarPagina3(plan);
    console.log(plan);
  }, []);

  const renderizarTeste = (recip) => {
    if (Object.keys(recip).length !== 0) {
      return true;
    }
    return false;
  };

  const renderizarPagina3 = (plan) => {
    setResults2(
      plan.map((day) => {
        if (
          renderizarTeste(day.Meals[0].Recip) ||
          renderizarTeste(day.Meals[1].Recip) ||
          renderizarTeste(day.Meals[2].Recip)
        )
          return (
            <div className="teste123">
              <h2>{day.Day}</h2>
              {day.Meals.map((meal) => {
                if (renderizarTeste(meal.Recip)) return(buildCards(meal.Meal,meal.Recip));
              })}
            </div>
          );
      })
    );
  };

  const buildCards = (meal, recip) => {
    return (
      <div className="teste123">
      
          <h3>{meal}</h3>
          <div className="container">
            <h4>{recip.title}</h4>
            <img src={recip.image} className="img-fluid rounded-start" alt="..."/>
          </div>
          <div class="row">
            <div class="col-sm-6">
              <div class="card">
                <div class="card-body">
                  <h5 class="card-title">How it's made?</h5>
                  <p class="card-text">

                    <ol class="list-group list-group-numbered">
                      {recip.analyzedInstructions[0].steps.map(instruction => {
                        return(
                          <li class="list-group-item">{instruction.step}</li>
                        )
                      })}
                    </ol>

                  </p>
                </div>
              </div>
            </div>
            <div class="col-sm-6">
              <div class="card">
                <div class="card-body">
                  <h5 class="card-title">Ingridients</h5>
                  <p class="card-text">
                    <table class="table">
                      <thead>
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">Name</th>
                          <th scope="col">Amount</th>
                          <th scope="col">Unit</th>
                        </tr>
                      </thead>
                      <tbody>
                        {recip.extendedIngredients.map((ingridient, index) => {
                          return (
                            <tr>
                              <th scope="row">{index+1}</th>
                              <td>{ingridient.originalName}</td>
                              <td>{ingridient.measures.metric.amount}</td>
                              <td>{ingridient.measures.metric.unitShort}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </p>
                </div>
              </div>
            </div>
          </div>
        <br />
      </div>
    );
  };

  return (
    <div className="container">
      <div>{results2}</div>
    </div>
  );
};

export default Report;
