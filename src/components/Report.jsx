import React, { useContext, useState, useEffect, useRef } from "react";
import DataContextPlan from "../data/dataContext-plan";
import "../components/report.css"

const Report = (props) => {
  const [plan, setPlan] = useContext(DataContextPlan);
  const [results, setResults] = useState();
  const [results2, setResults2] = useState();
  // const [chartDays, setChartDays] = useState();
  // const [chartCals, setchartCals] = useState();
  const chartDays = useRef();
  const chartCals = useRef();
  const chartCarbs = useRef();
  const chartProts = useRef();
  const [chart, setChart] = useState();


  useEffect(() => {
    
    
    let chartDaysLocal = [];
    let chartCalsLocal = [];
    var chartCalsDay = 0;

    let chartCarbsLocal = [];
    var chartCarbsDay = 0;

    let chartProtsLocal = [];
    var chartProtsDay = 0;

    plan.forEach(day => {
      if (
        renderizarTeste(day.Meals[0].Recip) ||
        renderizarTeste(day.Meals[1].Recip) ||
        renderizarTeste(day.Meals[2].Recip)
      ) {

          chartDaysLocal.push(`"${day.Day}"`);
          chartDays.current = chartDaysLocal;

          // =============== Cals ===================
          chartCalsDay = 0;
          day.Meals.forEach(meal => {
            if (renderizarTeste(meal.Recip)) {
              chartCalsDay = chartCalsDay + meal.Recip.nutrition.nutrients[0].percentOfDailyNeeds
            }
          })
          chartCalsLocal.push(chartCalsDay);
          chartCals.current = chartCalsLocal;

          // =============== Carbs ===================

          chartCarbsDay = 0;
          day.Meals.forEach(meal => {
            if (renderizarTeste(meal.Recip)) {
              chartCarbsDay = chartCarbsDay + meal.Recip.nutrition.nutrients[3].percentOfDailyNeeds
            }
          })
          chartCarbsLocal.push(chartCarbsDay);
          chartCarbs.current = chartCarbsLocal;

          // =============== Prots ===================

          chartProtsDay = 0;
          day.Meals.forEach(meal => {
            if (renderizarTeste(meal.Recip)) {
              chartProtsDay = chartProtsDay + meal.Recip.nutrition.nutrients[8].percentOfDailyNeeds
            }
          })
          chartProtsLocal.push(chartProtsDay);
          chartProts.current = chartProtsLocal;

        };

        
        console.log(chartDays.current === undefined)
        console.log(document.querySelector("#resultsContainer"))

    })

    // renderizarPagina3(plan);
    // renderizarPagina5(plan);

    if( chartDays.current !== undefined) {
      // document.querySelector("#initialMessage").classList.add("invisible");
      // document.querySelector(".resultsContainer").classList.remove("invisible");
      renderizarPagina5(plan);
    } else {
      setResults(
        <p>Your Meal Plan is currently empty. Start by the section "Manage Plan" to search for recips and build your Meal Plan for the week. Come back here later to check the results!</p>
      )
      // document.querySelector("#initialMessage").classList.remove("invisible");
      // document.querySelector(".resultsContainer").classList.add("invisible");
      
    }


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
      
          {/* <h3>{meal}</h3> */}
          <div className="container">
            <h4>{recip.title}</h4>
            {/* <img src={recip.image} className="img-fluid rounded-start" alt="..."/> */}
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

  //=========================================================================================================

  const renderizarPagina5 = (plan) => {
    setResults(
      <>
      <p>Et voilà! On the report below you will find your nutritional chart, with the estimated levels of calories, carbohydrates and protein you will reach if you stick to the planned meals, as percentage of the daily recommeded values. Does the value doesn't match with your expectation? Move back to the section "Manage Plan" and readjust your plan.</p>

      <p>Once your nutritional expectation are fullfield, use the report to help you prepare your meals, using the recip and ingridents lists.</p>
      <div className="container resultsContainer">
        <div className="row">
          <div className="col-2 resultsContainer2">
            <nav
              id="navbar-example3"
              class="navbar bg-light flex-column align-items-stretch p-3"
            >
              <nav class="nav nav-pills flex-column">
                <a class="nav-link" href="#Chart">
                  Nutrional Chart
                </a>
                {plan.map((day) => {
                  if (
                    renderizarTeste(day.Meals[0].Recip) ||
                    renderizarTeste(day.Meals[1].Recip) ||
                    renderizarTeste(day.Meals[2].Recip)
                  )
                    return (
                      <>
                        <a class="nav-link" href={"#" + day.Day}>
                          {day.Day}
                        </a>
                        {day.Meals.map((meal) => {
                          if (renderizarTeste(meal.Recip))
                            return (
                              <nav class="nav nav-pills flex-column">
                                <a
                                  class="nav-link ms-3 my-1"
                                  href={"#" + day.Day + "_" + meal.Meal}
                                >
                                  {meal.Meal}
                                </a>
                              </nav>
                            );
                        })}
                      </>
                    );
                })}
              </nav>
            </nav>
          </div>

          <div className="col-10 resultsContainer2">
            <div
              data-bs-spy="scroll"
              data-bs-target="#navbar-example3"
              data-bs-smooth-scroll="true"
              tabindex="0"
            >
              <div id="Chart">
                <h4>Nutritional Chart</h4>
                <div>
                  <img
                    src={`https://quickchart.io/chart?c={type:'bar',data:{labels:[${chartDays.current}], datasets:[{label:'Calories',data:[${chartCals.current}]},{label:'Carbohydrates',data:[${chartCarbs.current}]},{label:'Protein',data:[${chartProts.current}]}]}}`}
                  ></img>
                </div>
              </div>
              {plan.map((day) => {
                if (
                  renderizarTeste(day.Meals[0].Recip) ||
                  renderizarTeste(day.Meals[1].Recip) ||
                  renderizarTeste(day.Meals[2].Recip)
                )
                  return (
                    <>
                      <div id={day.Day}>
                        <h4>{day.Day}</h4>
                      </div>
                      {day.Meals.map((meal) => {
                        if (renderizarTeste(meal.Recip))
                          return (
                            <>
                              <div id={day.Day + "_" + meal.Meal}>
                                <h5>
                                  {meal.Meal} | {meal.Recip.title} |{" "}
                                  {meal.Recip.nutrition.nutrients[0].name}:{" "}
                                  {
                                    meal.Recip.nutrition.nutrients[0]
                                      .percentOfDailyNeeds
                                  }
                                  % | {meal.Recip.nutrition.nutrients[3].name}:{" "}
                                  {
                                    meal.Recip.nutrition.nutrients[3]
                                      .percentOfDailyNeeds
                                  }
                                  % | {meal.Recip.nutrition.nutrients[8].name}:{" "}
                                  {
                                    meal.Recip.nutrition.nutrients[8]
                                      .percentOfDailyNeeds
                                  }
                                  %
                                </h5>
                                {/* <div>{buildCards(meal.Meal,meal.Recip)}</div> */}
                                <div>
                                  <div class="card removeBorder">
                                    <div class="card-body">
                                      <h5 class="card-title">How it's made?</h5>
                                      <p class="card-text">
                                        <ol class="list-group list-group-numbered">
                                          {meal.Recip.analyzedInstructions[0].steps.map(
                                            (instruction) => {
                                              return (
                                                <li class="list-group-item removeBorder">
                                                  {instruction.step}
                                                </li>
                                              );
                                            }
                                          )}
                                        </ol>
                                      </p>
                                    </div>
                                  </div>
                                  <div class="card removeBorder">
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
                                            {meal.Recip.extendedIngredients.map(
                                              (ingridient, index) => {
                                                return (
                                                  <tr>
                                                    <th scope="row">
                                                      {index + 1}
                                                    </th>
                                                    <td>
                                                      {ingridient.originalName}
                                                    </td>
                                                    <td>
                                                      {
                                                        ingridient.measures
                                                          .metric.amount
                                                      }
                                                    </td>
                                                    <td>
                                                      {
                                                        ingridient.measures
                                                          .metric.unitShort
                                                      }
                                                    </td>
                                                  </tr>
                                                );
                                              }
                                            )}
                                          </tbody>
                                        </table>
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <br />
                            </>
                          );
                      })}
                    </>
                  );
              })}
            </div>
          </div>
        </div>
      </div>
      </>
    );
    
  }

  const renderizarPagina4 = (plan) => {
    setResults(



      
      plan.map((day) => {
        if (
          renderizarTeste(day.Meals[0].Recip) ||
          renderizarTeste(day.Meals[1].Recip) ||
          renderizarTeste(day.Meals[2].Recip)
        )
          return (
            <>
              <div className="container">
                <div className="row">
                  <div className="col-4">
                    <nav
                      id="navbar-example3"
                      class="navbar bg-light flex-column align-items-stretch p-3"
                    >
                      <nav class="nav nav-pills flex-column">
                        <a class="nav-link" href="#item-1">
                          {day.Day}
                        </a>
                        {day.Meals.map((meal) => {
                          if (renderizarTeste(meal.Recip))
                            return (
                              <nav class="nav nav-pills flex-column">
                                <a class="nav-link ms-3 my-1" href="#item-1-1">
                                  {meal.Meal}
                                </a>
                              </nav>
                            );
                        })}
                      </nav>
                    </nav>
                  </div>

                  <div className="col-8">
                    <div
                      data-bs-spy="scroll"
                      data-bs-target="#navbar-example3"
                      data-bs-smooth-scroll="true"
                      tabindex="0"
                    >
                      <div id="item-1">
                        <h4>{day.Day}</h4>
                        <p>...</p>
                      </div>

                      {day.Meals.map((meal) => {
                        if (renderizarTeste(meal.Recip))
                          return (
                            <div id="item-1-1">
                              <h5>{meal.Meal}</h5>
                              <p>...</p>
                            </div>
                          );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </>
          );
      })

      
    );
  };

// ==================================================================================================

  const buildCards2 = (meal, recip) => {
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
      <div>{results}</div>
    </div>
  );
};

export default Report;
