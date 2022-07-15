import React, { useContext, useState, useEffect, useRef } from "react";
import DataContextPlan from "../../data/dataContext-plan";
import "../../components/views/styles/report.css";
import NutritionalChart from "../sub_components/NutritionalChart";
import {checkIfEmpty} from "../functions/functions";

const Report = (props) => {

  // =============================================================== 1. Variables Declaration =====================================================================
  
  // 1.1 Manage the Meal Plan and the report

  const [plan, setPlan] = useContext(DataContextPlan);
  const [results, setResults] = useState();
  
  // 1.2 Manage the information needed to build the chart (component NutritionalChart)

  const chartDays = useRef();
  let chartDaysLocal = [];
  
  const chartCals = useRef();
  let chartCalsLocal = [];
  var chartCalsDay = 0;
  
  const chartCarbs = useRef();
  let chartCarbsLocal = [];
  var chartCarbsDay = 0;
  
  const chartProts = useRef();
  let chartProtsLocal = [];
  var chartProtsDay = 0;
  

  // ===================================================================== 2. Functions ===========================================================================

  useEffect(() => {
    
  // 2.1 Manage the preparation of data needed to build the chart on NutritionalChart component

    // 2.1.1 Collect data about the days included on the Meal Plan  

    plan.forEach((day) => {
      if (
        checkIfEmpty(day.Meals[0].Recip) ||
        checkIfEmpty(day.Meals[1].Recip) ||
        checkIfEmpty(day.Meals[2].Recip)
      ) {
        chartDaysLocal.push(`"${day.Day}"`);
        chartDays.current = chartDaysLocal;

    // 2.1.2 Collect data about the values of calories included on the meals of the Meal Plan 

        chartCalsDay = 0;
        day.Meals.forEach((meal) => {
          if (checkIfEmpty(meal.Recip)) {
            chartCalsDay =
              chartCalsDay +
              meal.Recip.nutrition.nutrients[0].percentOfDailyNeeds;
          }
        });
        chartCalsLocal.push(chartCalsDay);
        chartCals.current = chartCalsLocal;

    // 2.1.3 Collect data about the values of carbohydrates included on the meals of the Meal Plan 

        chartCarbsDay = 0;
        day.Meals.forEach((meal) => {
          if (checkIfEmpty(meal.Recip)) {
            chartCarbsDay =
              chartCarbsDay +
              meal.Recip.nutrition.nutrients[3].percentOfDailyNeeds;
          }
        });
        chartCarbsLocal.push(chartCarbsDay);
        chartCarbs.current = chartCarbsLocal;

    // 2.1.4 Collect data about the values of proteins included on the meals of the Meal Plan 

        chartProtsDay = 0;
        day.Meals.forEach((meal) => {
          if (checkIfEmpty(meal.Recip)) {
            chartProtsDay =
              chartProtsDay +
              meal.Recip.nutrition.nutrients[8].percentOfDailyNeeds;
          }
        });
        chartProtsLocal.push(chartProtsDay);
        chartProts.current = chartProtsLocal;
      }
    });

  // 2.2 Manage if the report is rendered, based on if the Meal Plan has information

    if (chartDays.current !== undefined) {
      renderMealPlan(plan);
    } else {
      setResults(
        <p>
          Your Meal Plan is currently empty. Start with the section "Manage
          Plan" to search for recipes and build your Meal Plan for the week.
          Come back later to check the results!
        </p>
      );
    }
  }, []);

  // 2.3 When call (if Meal Plan has information on it) render the Meal Report

  const renderMealPlan = (plan) => {
    setResults(
      <>
        <p>
          Et voilà! On the report below you will find your nutritional chart,
          with the estimated levels of calories, carbohydrates and protein you
          will reach if you stick to the planned meals, as percentage of the
          daily recommeded values. Doesn't the nutritional values match with your
          expectation? Move back to the section "Manage Plan" and readjust your
          plan.
        </p>

        <p>
          Once your nutritional expectation are fullfield, use the report to
          help you prepare your meals, using the recipes and ingridents lists!
        </p>

        <div className="container resultsContainer">
          <div className="row">

            {/* 2.3.1 Render the navigation bar, with links for the several sections of the report */}

            <div className="col-3 indexContainer">
              <nav
                id="navbar-example3"
                className="navbar flex-column align-items-stretch p-3"
              >
                <nav className="nav nav-pills flex-column">
                  <a className="nav-link indexTitles" href="#Chart">
                    Nutritional  Chart
                  </a>
                  {plan.map((day) => {
                    if (
                      checkIfEmpty(day.Meals[0].Recip) ||
                      checkIfEmpty(day.Meals[1].Recip) ||
                      checkIfEmpty(day.Meals[2].Recip)
                    )
                      return (
                        <>
                          <a className="nav-link indexTitles" href={"#" + day.Day}>
                            {day.Day}
                          </a>
                          {day.Meals.map((meal) => {
                            if (checkIfEmpty(meal.Recip))
                              return (
                                <nav className="nav nav-pills flex-column">
                                  <a
                                    className="nav-link ms-3 my-1 indexTitles"
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

            {/* 2.3.2 Render the sections of the report */}

            <div className="col-9 resultsContainer">
              <div
                data-bs-spy="scroll"
                data-bs-target="#navbar-example3"
                data-bs-smooth-scroll="true"
                tabindex="0"
              >

                {/* 2.3.2.1 Call the component that builds the Nutritional Chart */}

                <NutritionalChart
                  chartDays={chartDays.current}
                  chartCals={chartCals.current}
                  chartCarbs={chartCarbs.current}
                  chartProts={chartProts.current}
                ></NutritionalChart>
                <br />
                {plan.map((day) => {
                  if (
                    checkIfEmpty(day.Meals[0].Recip) ||
                    checkIfEmpty(day.Meals[1].Recip) ||
                    checkIfEmpty(day.Meals[2].Recip)
                  )
                    return (
                      <>
                        <div id={day.Day}>
                          <h4>{day.Day}</h4>
                        </div>
                        {day.Meals.map((meal) => {
                          if (checkIfEmpty(meal.Recip))
                            return (
                              <>
                                <div id={day.Day + "_" + meal.Meal}>
                                  <h5>
                                    {meal.Meal} | {meal.Recip.title}
                                  </h5>
                                  <div>
                                    <div className="card removeBorder">
                                      <div className="card-body">
                                        <h5 className="card-title">
                                          How it's made?
                                        </h5>
                                        <p className="card-text">
                                          <ol className="list-group list-group-numbered">
                                            {meal.Recip.analyzedInstructions[0].steps.map(
                                              (instruction) => {
                                                return (
                                                  <li className="list-group-item removeBorder">
                                                    {instruction.step}
                                                  </li>
                                                );
                                              }
                                            )}
                                          </ol>
                                        </p>
                                      </div>
                                    </div>
                                    <div className="card removeBorder">
                                      <div className="card-body">
                                        <h5 className="card-title">Ingridients</h5>
                                        <p className="card-text">
                                          <table className="table">
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
                                                        {
                                                          ingridient.originalName
                                                        }
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
  };

  // ====================================================================== 3. Results ============================================================================

  return (
    <div className="container">
      <div>{results}</div>
    </div>
  );
};

export default Report;
