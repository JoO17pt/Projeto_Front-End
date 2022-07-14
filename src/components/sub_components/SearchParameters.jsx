import React from "react";
import {
    searchBar_cuisines,
    searchBar_type,
    searchBar_sort,
    searchBar_diets,
    searchBar_intolerances,
  } from "../../data/search_bar";

// This component is responsible for render the search parameters bar

const SearchParameters = props => {
    return(
        <div className="accordion accordion-flush" id="accordionFlushExample">
          <div className="accordion-item">
            <h2 className="accordion-header" id="flush-headingOne">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#flush-collapseOne"
                aria-expanded="false"
                aria-controls="flush-collapseOne"
              >
                Cuisine
              </button>
            </h2>
            <div
              id="flush-collapseOne"
              className="accordion-collapse collapse"
              aria-labelledby="flush-headingOne"
              data-bs-parent="#accordionFlushExample"
            >
              <div className="accordion-body">
                <div className="recips_container container">
                  {searchBar_cuisines.map((cuisine) => {
                    return (
                      <div className="form-check form-switch">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          role="switch"
                          id={"flexSwitchCheckDefault" + "_" + cuisine}
                          onChange={props.cuisine}
                        />
                        <label
                          className="form-check-label"
                          for={"flexSwitchCheckDefault" + "_" + cuisine}
                        >
                          {cuisine}
                        </label>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          <div className="accordion-item">
            <h2 className="accordion-header" id="flush-headingTwo">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#flush-collapseTwo"
                aria-expanded="false"
                aria-controls="flush-collapseTwo"
              >
                Type
              </button>
            </h2>
            <div
              id="flush-collapseTwo"
              className="accordion-collapse collapse"
              aria-labelledby="flush-headingTwo"
              data-bs-parent="#accordionFlushExample"
            >
              <div className="accordion-body">
                <div className="recips_container container">
                  {searchBar_type.map((type) => {
                    return (
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="flexRadioDefault"
                          id={"flexRadioDefault1" + "_" + type}
                          onChange={props.type}
                        />
                        <label
                          className="form-check-label"
                          for={"flexRadioDefault1" + "_" + type}
                        >
                          {type}
                        </label>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          <div className="accordion-item">
            <h2 className="accordion-header" id="flush-headingThree">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#flush-collapseThree"
                aria-expanded="false"
                aria-controls="flush-collapseThree"
              >
                Sort
              </button>
            </h2>
            <div
              id="flush-collapseThree"
              className="accordion-collapse collapse"
              aria-labelledby="flush-headingThree"
              data-bs-parent="#accordionFlushExample"
            >
              <div className="accordion-body">
                <div className="recips_container container">
                  {searchBar_sort.map((sort) => {
                    return (
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="flexRadioDefault"
                          id={"flexRadioDefault1" + "_" + sort}
                          onChange={props.sort}
                        />
                        <label
                          className="form-check-label"
                          for={"flexRadioDefault1" + "_" + sort}
                        >
                          {sort}
                        </label>
                      </div>
                    );
                  })}
                </div>
                <div className="row g-0">
                  <input
                    type="radio"
                    className="btn-check"
                    id="btn-check_1"
                    autocomplete="off"
                    name="sortDir"
                    value="asc"
                    onClick={props.sortDir}
                  />
                  <label className="btn btn-primary" for="btn-check_1">
                    Ascending
                  </label>

                  <input
                    type="radio"
                    className="btn-check"
                    id="btn-check_2"
                    autocomplete="off"
                    name="sortDir"
                    value="desc"
                    onClick={props.sortDir}
                  />
                  <label className="btn btn-primary" for="btn-check_2">
                    Descending
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="accordion-item">
            <h2 className="accordion-header" id="flush-headingFour">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#flush-collapseFour"
                aria-expanded="false"
                aria-controls="flush-collapseFour"
              >
                Diet
              </button>
            </h2>
            <div
              id="flush-collapseFour"
              className="accordion-collapse collapse"
              aria-labelledby="flush-headingFour"
              data-bs-parent="#accordionFlushExample"
            >
              <div className="accordion-body">
                <div className="recips_container container">
                  {searchBar_diets.map((diet) => {
                    return (
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="flexRadioDefault"
                          id={"flexRadioDefault1" + "_" + diet}
                          onChange={props.diet}
                        />
                        <label
                          className="form-check-label"
                          for={"flexRadioDefault1" + "_" + diet}
                        >
                          {diet}
                        </label>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          <div className="accordion-item">
            <h2 className="accordion-header" id="flush-headingFive">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#flush-collapseFive"
                aria-expanded="false"
                aria-controls="flush-collapseFive"
              >
                Intolerances
              </button>
            </h2>
            <div
              id="flush-collapseFive"
              className="accordion-collapse collapse"
              aria-labelledby="flush-headingFive"
              data-bs-parent="#accordionFlushExample"
            >
              <div className="accordion-body">
                <div className="recips_container container">
                  {searchBar_intolerances.map((intolerance) => {
                    return (
                      <div className="form-check form-switch">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          role="switch"
                          id={"flexSwitchCheckDefault" + "_" + intolerance}
                          onChange={props.intolerance}
                        />
                        <label
                          className="form-check-label"
                          for={"flexSwitchCheckDefault" + "_" + intolerance}
                        >
                          {intolerance}
                        </label>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
    )
}

export default SearchParameters;