import React, { useState, useEffect, useRef, useContext } from "react";
import DataContextSearch from "../../data/dataContext-search";
import DataContextPlan from "../../data/dataContext-plan";
import "../../components/views/styles/search.css";
import { checkIfEmpty, callAPI } from "../functions/functions";
import SearchResults from "../sub_components/SearchResults";
import SearchParameters from "../sub_components/SearchParameters";
import MealPlanModal from "../sub_components/MealPlanModal";

const Search = (props) => {

  // =============================================================== 1. Variables Declaration =====================================================================

  // 1.1 Manage Search Parameters

  const [cuisine, setCuisine] = useState("");
  const [mealType, setMealType] = useState("");
  const [sort, setSort] = useState("");
  const [diet, setDiet] = useState("");
  const [intolerance, setIntolerance] = useState("");
  const [sortDirection, setSortDirection] = useState("");

  // 1.2 Manage Pagination

  const [searchResults, setSearchResults] = useState("");
  const [totalResults, settotalResults] = useState();
  const [numberResults, setnumberResults] = useState();
  const [offsetResults, setoffsetResults] = useState();
  const offset = useRef(0);

  // 1.3 Manage fetch and fetch results

  const [error, setError] = useState(null);
  const {recips, setRecips} = useContext(DataContextSearch);
  const [plan, setPlan] = useContext(DataContextPlan);
  const [planLocal, setPlanLocal] = useState();

  // 1.4 Manage changes in Meal Plan

  const recipID = useRef();

  // ===================================================================== 2. Functions ===========================================================================

  // 2.1 Manage Changes of the Search Parameters

  const handleChange_cuisine = (e) => {
    if (!cuisine.includes(e.target.parentElement.lastChild.innerText)) {
      setCuisine(cuisine + "," + e.target.parentElement.lastChild.innerText);
    } else {
      let cuisineTemp = "";
      cuisineTemp = cuisine.replace(
        "," + e.target.parentElement.lastChild.innerText,
        ""
      );
      setCuisine(cuisineTemp);
    }
  };

  const handleChange_type = (e) => {
    setMealType(e.target.parentElement.lastChild.innerText);
  };

  const handleChange_sort = (e) => {
    setSort(e.target.parentElement.lastChild.innerText);
  };

  const handleChange_SortDir = (e) => {
    setSortDirection(e.target.value);
  };

  const handleChange_diet = (e) => {
    setDiet(e.target.parentElement.lastChild.innerText);
  };

  const handleChange_intolerance = (e) => {
    if (!intolerance.includes(e.target.parentElement.lastChild.innerText)) {
      setIntolerance(
        intolerance + "," + e.target.parentElement.lastChild.innerText
      );
    } else {
      let intoleranceTemp = "";
      intoleranceTemp = intolerance.replace(
        "," + e.target.parentElement.lastChild.innerText,
        ""
      );
      setIntolerance(intoleranceTemp);
    }
  };

  // 2.3 Manage Search Buttons

  const handleSearch = (e) => {
    offset.current = 0;
    callAPI(cuisine,mealType,sort,offset.current,diet,intolerance,sortDirection,setRecips,error,setSearchResults,renderSearchResults,setError);
  };

  const handleMoreResults = (e) => {
    offset.current = offset.current + 10;
    callAPI(cuisine,mealType,sort,offset.current,diet,intolerance,sortDirection,setRecips,error,setSearchResults,renderSearchResults,setError);
  };

  // 2.4 Manage Changes on the Meal Plan

  // Define if show add or remove button, according if the meal has or not a recipe associated
  const addOrRemove = (recip) => {
    if (checkIfEmpty(recip)) {
      return (
        <img
          src="/img/minus.png"
          className="addRemoveIcons pointer"
          id="removeButton"
        ></img>
      );
    } else {
      return (
        <img
          src="/img/add.png"
          className="addRemoveIcons pointer"
          id="addButton"
        ></img>
      );
    }
  };

  // Once the add / remove button is clicked, define if add or remove recipe to the meal plan, according if the meal has or not a recipe associated. Also change to image accordingly.
  const handleChangePlan = (e) => {
    let day = e.target.parentElement.parentElement.parentElement.parentElement.firstChild.innerText;
    let meal = e.target.parentElement.parentElement.firstChild.innerText;

    if (e.target.parentElement.lastChild.id === "addButton") {
      handleAdd(day, meal);
      e.target.setAttribute("src", "/img/check.png");
      setTimeout(()=>e.target.setAttribute("src", "/img/minus.png"),1000)
      e.target.parentElement.lastChild.setAttribute("id", "removeButton");
    } else {
      handleRemove(day, meal);
      e.target.setAttribute("src", "/img/check.png");
      setTimeout(()=>e.target.setAttribute("src", "/img/add.png"),1000)
      e.target.parentElement.lastChild.setAttribute("id", "addButton");
    }
  };

  // When called by the function handleChangePlan, add the recipe to the Meal Plan
  const handleAdd = (day, meal) => {

    for (let i = 0; i < planLocal.length; i++) {
      if (planLocal[i].Day === day) {
        for (let t = 0; t < planLocal[i].Meals.length; t++) {
          if (planLocal[i].Meals[t].Meal === meal)
            planLocal[i].Meals[t].Recip = recips.results.filter(
              (recip) => recip.id == recipID.current
            )[0];
        }
      }
    }
    setPlan(planLocal);
  };

  // When called by the function handleChangePlan, remove the recipe to the Meal Plan
  const handleRemove = (day, meal) => {

    for (let i = 0; i < planLocal.length; i++) {
      if (planLocal[i].Day === day) {
        for (let t = 0; t < planLocal[i].Meals.length; t++) {
          if (planLocal[i].Meals[t].Meal === meal)
            planLocal[i].Meals[t].Recip = {};
        }
      }
    }
    setPlan(planLocal);
  };

  // Get the ID of the recipe, when the Meal Plan modal in called, so the function handleAdd could use it to update the Meal Plan
  const handleModal = (e) => {
    recipID.current = e.target.parentElement.parentElement.id;
  };

  // 2.5 Manage the possibility to change between pages without lose the results of the current search

  useEffect(() => {
    if(!(recips.results === undefined)) renderSearchResults(recips);
    setPlanLocal(plan);
  }, []);

  // 2.6 Render the pagination and the search results cards

  const renderSearchResults = (recips) => {

    // Manage the switch between the no results message and the pagination
    // - API returns no results?
    //    - Yes: display the no results message + hide the pagination and results intro message;
    //    - No: the opositte.

    if (recips.totalResults == 0) {
      document.querySelector(".noResults").classList.remove("invisible");
      document.querySelectorAll(".pagination").forEach((elem) => {
        elem.classList.add("invisible");
      });
      document.querySelector("#resultsIntro").classList.add("invisible");
    } else {
      document.querySelector(".noResults").classList.add("invisible");
      document.querySelectorAll(".pagination").forEach((elem) => {
        elem.classList.remove("invisible");
      });
      document.querySelector("#resultsIntro").classList.remove("invisible");
    }

    // Manage the pagination and the display of the "Get more results" button
    if (recips.number < recips.totalResults - recips.offset) {
      setnumberResults(recips.number);
      document.querySelector("#moreResultsButton").classList.remove("invisible");
    } else {
      setnumberResults(recips.totalResults - recips.offset);
      document.querySelector("#moreResultsButton").classList.add("invisible");
    }
    settotalResults(recips.totalResults);
    setoffsetResults(recips.offset);

    // Call the component that builds the results cards
    setSearchResults(
      <SearchResults recips={recips} handleModal={handleModal}></SearchResults>
    );
  };

  // ====================================================================== 3. Results ============================================================================
  return (
    <>
      <div className="container">
        <p>
          Explore the fields presented below to set the filters' combination
          that suits you best. Once you feel good to go, press the "Check the
          results" button to see the meal options we have for you. Despite the
          number of results we find for you, in order to keep the navigation
          clear it will be shown a maximum of 10 results at once. If you
          see the button "Get more results" at the bottom of the page, feel free
          to press it and get another set of meal option.
        </p>
        
        <SearchParameters
          cuisine={handleChange_cuisine}
          type={handleChange_type}
          sort={handleChange_sort}
          sortDir={handleChange_SortDir}
          diet={handleChange_diet}
          intolerance={handleChange_intolerance}
        ></SearchParameters>

        <br />
        
        <p>
          <button
            className="btn btn-primary button"
            onClick={handleSearch}
            id="upPagination"
          >
            Check the results
          </button>
        </p>
        
        <p className="noResults invisible">
          No results found. Please update the search parameters.
        </p>
      </div>

      <div className="container">
        <p className="invisible" id="resultsIntro">
          Take a look at the results we found for you! Beyond the description
          and photo, you can also check how long it will take to prepare each
          meal, the number of required ingridents, the number of portions, and
          the health rate (the higher, the healthier!). Did you find what you
          were looking for? Tap the "Add to my Meal Plan" button and associate
          the meal to a day and meal of your Meal Plan. Through the modal window
          you will also be able to remove meals previously added to the plan.
          Satisfied with your weekly meal plan? Move on to the "See Report"
          section to collect the data that will help you to manage your meal
          routine.
        </p>

        <div className="row pagination invisible">
          <p>
            Presenting {numberResults} out of {totalResults} results (Offset:{" "}
            {offsetResults})
          </p>
        </div>

        <div>{searchResults}</div>

        <div className="row pagination invisible">
          <p>
            Presenting {numberResults} out of {totalResults} results (Offset:{" "}
            {offsetResults})
          </p>

          <p>
            <a href="#upPagination">
              <button
                id="moreResultsButton"
                className="btn btn-primary button"
                onClick={handleMoreResults}
              >
                Get more results
              </button>
            </a>
          </p>
        </div>

        <MealPlanModal
          plan={plan}
          handleChangePlan={handleChangePlan}
          addOrRemove={addOrRemove}
        ></MealPlanModal>

      </div>
    </>
  );
};

export default Search;
