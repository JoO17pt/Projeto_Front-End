import React from "react";
import parse from "html-react-parser";

// This component receives the data from the API and build the cards with the search results

const SearchResults = (props) => {
  return (
    <>
      {props.recips.results.map((recip) => {
        return (
          <>
            <div className="card mb-3" id={recip.id}>
              <div className="row g-0">
                <div className="col-md-4">
                  <img
                    src={recip.image}
                    className="img-fluid rounded-start"
                    alt="Image of the recipe"
                  />
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <h5 className="card-title">{recip.title}</h5>
                    <p className="card-text">{parse(recip.summary)}</p>
                    <div className="container">
                      <div className="row">
                        <div className="col">
                          <img src="/img/relogio.png" className="imgIcons" alt="Clock icon"/>
                          {" "+recip.readyInMinutes} minutes
                        </div>
                        <div className="col">
                          <img src="/img/carrot.png" className="imgIcons" alt="Carrot icon"/>
                          {" "+recip.extendedIngredients.length} ingridients
                        </div>
                        <div className="col">
                          <img src="/img/muscle.png" className="imgIcons" alt="Arm icon"/>
                          {" "+recip.healthScore}%
                        </div>
                        <div className="col">
                          <img src="/img/pessoas.png" className="imgIcons" alt="People icon"/>
                          {" "+recip.servings} people
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  className="btn btn-primary button"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                  onClick={props.handleModal}
                >
                  Add to my Meal Plan!
                </button>
              </div>
            </div>
          </>
        );
      })}
    </>
  );
};

export default SearchResults;
