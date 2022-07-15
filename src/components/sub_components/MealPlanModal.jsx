import React from "react";

// This component is responsible for render the Meal Plan modal window

const MealPlanModal = props => {
    return(
        <div>
          <div
            className="modal fade"
            id="exampleModal"
            tabindex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">
                    Meal Plan
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <div className="container">
                    <div className="col">
                      {props.plan.map((day) => {
                        return (
                          <div className="row modalRow">
                            <div className="col-4 alignVertical">{day.Day}</div>
                            <div className="col-8" id={day.Day}>
                              {day.Meals.map((meal) => {
                                return (
                                  <>
                                    <div className="row">
                                      <div className="col-8 alignMeal">{meal.Meal}</div>
                                      <div
                                        className="col-4"
                                        onClick={props.handleChangePlan}
                                        id={meal.Meal}
                                      >
                                        {props.addOrRemove(meal.Recip)}
                                      </div>
                                    </div>
                                  </>
                                );
                              })}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
    )
}

export default MealPlanModal;