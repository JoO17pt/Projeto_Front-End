import React, {useState, useEffect, useRef, useContext} from "react";
import DataContextSearch from "../data/dataContext-search";
import DataContextPlan from "../data/dataContext-plan";

const Search = props => {

// =============================================================================================================================================

    const [cuisine, setCuisine] = useState('');
    const [mealType, setMealType] = useState('');
    const [sort, setSort] = useState('');
    const [click, setClick] = useState(0);
    const [searchResults, setSearchResults] = useState('');
    const [totalResults, settotalResults] = useState();
    const [numberResults, setnumberResults] = useState();
    const [offsetResults, setoffsetResults] = useState();
    const offset = useRef(0);
    const recipID = useRef();
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const {recips, setRecips} = useContext(DataContextSearch);
    const [plan, setPlan] = useContext(DataContextPlan);
    const [modal, setModal] = useState();

    const [planLocal, setPlanLocal] = useState();

    // let planLocal = {};

    const handleChange_cuisine = (e) => {
        setCuisine(e.target.value);
    }
    
    const handleChange_type = (e) => {
        setMealType(e.target.value);
    }
    
    const handleChange_sort = (e) => {
        setSort(e.target.value);
    }
    
    const handleSearch = (e) => {
        setClick(click+1);
        offset.current = 0;
        acederAPI();
    }

    const handleMoreResults = (e) => {
        offset.current = offset.current + 10;
        acederAPI();
        setClick(click+1);
    }
    
    const handleAdd = (e) => {
        
        console.log(e.target.parentElement.firstChild.innerText); // Apanha a meal
        console.log(e.target.parentElement.parentElement.parentElement.firstChild.innerText); // Apanha o dia
        console.log(recipID.current);

        let day = e.target.parentElement.parentElement.parentElement.firstChild.innerText;
        let meal = e.target.parentElement.firstChild.innerText;
        // for( let i = 0 ; i < plan.length ; i++) {
        //     if ( plan[i].Day === day ) {
        //         for ( let t=0 ; t < plan[i].Meals ; t++) {
        //             if ( plan[i].Meals[t].Meal === meal) setPlan(plan[i].Meals[t].Recip=recipID.current)
        //         }
        //     }
        // };
        // planLocal[0].Meals[0].Recip = recipID.current;
        // console.log(planLocal[0].Meals[0].Recip);
        planLocal[0].Meals[0].Recip = recipID.current;
        setPlan(planLocal);
        console.log(planLocal);
    }

    const handleModal = (e) => {
        // renderizarModal(plan);
        console.log(plan);
        console.log(e.target.parentElement.parentElement.id) // id da receita que é clicada no modal
        recipID.current = e.target.parentElement.parentElement.id;
    }

   
    useEffect (()=>{
        recips.results == undefined ? console.log('Data Context Vazio') : renderizarPagina(recips);
        // planLocal = plan;
        setPlanLocal(plan);
        console.log(planLocal);
    },[]);

// ============================================================================================================================================

    const acederAPI = () => {
        fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=76b1835049c04ff1ab1c10a5507294b8&cuisine=${cuisine}&type=${mealType}&sort=${sort}&number=10&offset=${offset.current}&addRecipeInformation=true`)
            .then(res => res.json())
            .then(
                (data) => {
                    setIsLoaded(true);
                    setRecips(data);
                    if(error) {
                        return setSearchResults(<tr><td>Error: {error.message}</td></tr>);
                    // } else if (!isLoaded) {
                    //     return setSearchResults(<p>Loading...</p>);
                    } else {renderizarPagina(data);}

                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    };

    const renderizarPagina = (recips) => {

        recips.number < recips.totalResults - recips.offset ? setnumberResults(recips.number) :  setnumberResults(recips.totalResults - recips.offset);
        settotalResults(recips.totalResults);
        setoffsetResults(recips.offset);
        setSearchResults(
            recips.results.map(recip=>{
                return(
                    
                    <div className="card mb-3" id={recip.id}>
                            <div className="row g-0">
                                <div className="col-md-4">
                                    <img src={recip.image} className="img-fluid rounded-start" alt="..."/>
                                </div>
                                <div className="col-md-8">
                                    <div className="card-body">
                                        <h5 className="card-title">{recip.title}</h5>
                                        <p className="card-text">{recip.summary}</p>
                                    </div>
                                </div>
                                <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={handleModal}>
                                    Add to my Meal Plan!
                                </button>
                            </div>
                        </div>    
                )
            }) 
        )
    }

    // const renderizarModal = (plan) => {
    //     console.log(plan);
    //     setModal(
    //         <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    //             <div class="modal-dialog modal-dialog-centered">
    //                 <div class="modal-content">
    //                     <div class="modal-header">
    //                         <h5 class="modal-title" id="exampleModalLabel">Meal Plan</h5>
    //                         <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    //                      </div>
    //                 <div class="modal-body">
                        
    //                 <div className="container">
    //                     <div className="col">
    //                         {plan.map(day => {
    //                             return(
    //                                 <div className="row">
    //                                     <div className="col">{day.Day}</div>
    //                                     <div className="col" id={day.Day}>{day.Meals.map(meal => {
    //                                         return(
    //                                             <>
    //                                                 <div className="row">
    //                                                     <div className="col">{meal.Meal}</div>
    //                                                     <div className="col" onClick={handleAdd} id={meal.Meal}>Add</div>
    //                                                 </div>
    //                                             </>
    //                                         )
    //                                     })}</div>
    //                                 </div>
    //                                 )
    //                         })}
    //                     </div>
    //                 </div>
                    
    //                 </div>
    //                 <div class="modal-footer">
    //                     <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
    //                     <button type="button" class="btn btn-primary">Save changes</button>
    //                 </div>
    //             </div>
    //         </div>
    //     </div>
    //     )
    // }

// =============================================================================================================================================
    return(
        <>
        <div className="container">
            <p>
                <label for="cuisine">Cuisine:</label>
                <select className="form-select" name="cuisine" onChange={handleChange_cuisine}>

                    <option value="0">-- Select a Cuisine --</option>
                    
                    <optgroup label="Europe">
                        <option value="british">British</option>
                        <option value="french">French</option>
                        <option value="german">German</option>
                        <option value="greek">Greek</option>
                        <option value="italian">Italian</option>
                    </optgroup>
                    
                    <optgroup label="Asia">
                        <option value="Chinese">Chinese</option>
                        <option value="Indian">Indian</option>
                        <option value="Korean">Korean</option>
                    </optgroup>

                </select>
            </p>

            <p>
                <label for="type">Type:</label>
                <select className="form-select" name="type" onChange={handleChange_type}>

                    <option value="0">-- Select a type of meal --</option>
                
                    <option value="main course">Main course</option>
                    <option value="dessert">Dessert</option>
                    <option value="breakfast">Breakfast</option>

                </select>
            
            </p>
            
            <p>
                <label for="sort">Sort:</label>
                <select className="form-select" name="sort" onChange={handleChange_sort}>

                    <option value="0">-- Select the sort method --</option>
                
                    <option value="popularity">Popularity</option>
                    <option value="healthiness">Healthiness</option>
                    <option value="price">Price</option>

                </select>
            
            </p>

            <p>Selected cuisine: {cuisine}</p>
            <p>Selected type of meal: {mealType}</p>
            <p>Selected sort method: {sort}</p>
   
            <p>
            <button className="btn btn-primary" onClick={handleSearch}>Search</button>
            </p>
            <p>Fui clicado {click} vezes!</p>

        </div>

        

        {/* <div className="container">
            {RecipsList('','','')}
        </div> */}
        <div className="container">
            <div>
                <p>Total results: {totalResults}</p>
                <p>Results presentd: {numberResults}</p>
                <p>Results Offset: {offsetResults}</p>
                <button className="btn btn-primary" onClick={handleMoreResults}>Get more results</button>
            </div>
            <br/>
            <div>
                {searchResults}
            </div>

            <div>

            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Meal Plan</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                         </div>
                    <div class="modal-body">
                        
                    <div className="container">
                        <div className="col">
                            {plan.map(day => {
                                return(
                                    <div className="row">
                                        <div className="col">{day.Day}</div>
                                        <div className="col" id={day.Day}>{day.Meals.map(meal => {
                                            return(
                                                <>
                                                    <div className="row">
                                                        <div className="col">{meal.Meal}</div>
                                                        <div className="col" onClick={handleAdd} id={meal.Meal}>Add</div>
                                                    </div>
                                                </>
                                            )
                                        })}</div>
                                    </div>
                                    )
                            })}
                        </div>
                    </div>
                    
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary">Save changes</button>
                    </div>
                </div>
            </div>
        </div>

            </div>
  
        </div>

        
        
        
        </>
    )
}

export default Search;