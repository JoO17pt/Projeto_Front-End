import React, {useState, useEffect, useRef, useContext} from "react";
import DataContextSearch from "../data/dataContext-search";
import DataContextPlan from "../data/dataContext-plan";
import { searchBar_cuisines, searchBar_type, searchBar_sort, searchBar_diets, searchBar_intolerances } from "../data/search_bar";
import "../components/search.css";
import "../fonts/fontawesome-free-6.0.0-web/css/all.css"
import parse from 'html-react-parser'

const Search = props => {

// =============================================================================================================================================

    const [cuisine, setCuisine] = useState('');
    const [mealType, setMealType] = useState('');
    const [sort, setSort] = useState('');
    const [diet, setDiet] = useState('');
    const [intolerance, setIntolerance] = useState('');
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
    const [sortDirection, setSortDirection] = useState('');

    const [planLocal, setPlanLocal] = useState();

    const handleChange_SortDir = (e) => {
        setSortDirection(e.target.value);
    }

    // Função para fazer find and replace de strings

    // const convertString = (string) => {
    //     let newStringTeste = string.includes('<');

    //     while (newStringTeste) {
    //         string = string.replace('<', '&lt;');
    //         newStringTeste = string.includes('<');
    //     } 

    //     let newStringTeste2 = string.includes('>');

    //     while (newStringTeste2) {
    //         string = string.replace('>', '&gt;');
    //         newStringTeste2 = string.includes('>');
    //     }

    //     let newStringTeste3 = string.includes(`"`);

    //     while (newStringTeste3) {
    //         string = string.replace(`"`, '');
    //         newStringTeste3 = string.includes(`"`);
    //     }

    //     return (string);
  
    // }

    const handleChange_cuisine = (e) => {

        let stringTeste = "João Pedro Araújo João";
        let newStringTeste = stringTeste.includes('João');

        while (newStringTeste) {
            stringTeste = stringTeste.replace('João', 'Rui');
            newStringTeste = stringTeste.includes('João');
        }

        console.log(stringTeste)
        console.log(newStringTeste)

        if (!cuisine.includes(e.target.parentElement.lastChild.innerText)) {
            setCuisine (cuisine + ',' + e.target.parentElement.lastChild.innerText);
        } else {
            let cuisineTemp = ''; 
            cuisineTemp = cuisine.replace(','+e.target.parentElement.lastChild.innerText,'');
            setCuisine (cuisineTemp);
        }
    }
    
    const handleChange_intolerance = (e) => {

        if (!intolerance.includes(e.target.parentElement.lastChild.innerText)) {
            setIntolerance (intolerance + ',' + e.target.parentElement.lastChild.innerText);
        } else {
            let intoleranceTemp = ''; 
            intoleranceTemp = intolerance.replace(','+e.target.parentElement.lastChild.innerText,'');
            setIntolerance (intoleranceTemp);
        }
    }
    
    const handleChange_type = (e) => {
        setMealType(e.target.parentElement.lastChild.innerText);
    }
    
    const handleChange_sort = (e) => {
        setSort(e.target.parentElement.lastChild.innerText);
    }
    
    const handleChange_diet = (e) => {
        setDiet(e.target.parentElement.lastChild.innerText);
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
        
        //console.log(e.target.parentElement.firstChild.innerText); // Apanha a meal
        //console.log(e.target.parentElement.parentElement.parentElement.firstChild.innerText); // Apanha o dia
        console.log(recipID.current);

        let day = e.target.parentElement.parentElement.parentElement.firstChild.innerText;
        let meal = e.target.parentElement.firstChild.innerText;
        console.log(day);
        console.log(meal);
        console.log(planLocal[0].Meals);

      
        for( let i = 0 ; i < planLocal.length ; i++) {
            if ( planLocal[i].Day === day ) {
                for ( let t=0 ; t < planLocal[i].Meals.length ; t++) {
                    if ( planLocal[i].Meals[t].Meal === meal) planLocal[i].Meals[t].Recip=recips.results.filter(recip => recip.id==recipID.current)[0];
                }
            }
        };

        console.log(recips.results.filter(recip => recip.id==recipID.current)[0]);

        // planLocal[0].Meals[0].Recip = recipID.current;
        // console.log(planLocal[0].Meals[0].Recip);
        // planLocal[0].Meals[0].Recip = recipID.current;
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
        fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=76b1835049c04ff1ab1c10a5507294b8&cuisine=${cuisine}&type=${mealType}&sort=${sort}&number=10&offset=${offset.current}&diet=${diet}&intolerances=${intolerance}&sortDirection=${sortDirection}&addRecipeInformation=true&fillIngredients=true&addRecipeNutrition=true`)
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
                                        <p className="card-text" >
                                            {parse(recip.summary)}
                                        </p>
                                        <div className="container">
                                            <div className="row">
                                                <div className="col"> <img src="/img/relogio.png" className="imgIcons"/> {recip.readyInMinutes} minutes</div>
                                                <div className="col"><img src="/img/cooking.png" className="imgIcons"/> {recip.analyzedInstructions[0].steps.length} steps</div>
                                                <div className="col"><img src="/img/carrot.png" className="imgIcons"/> {recip.extendedIngredients.length} ingridients</div>
                                                <div className="col"><img src="/img/muscle.png" className="imgIcons"/> {recip.healthScore}%</div>
                                            </div>
                                        </div>
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

// =============================================================================================================================================
    return(
        <>
        <div className="container">

            <div class="accordion accordion-flush" id="accordionFlushExample">
                <div class="accordion-item">
                    <h2 class="accordion-header" id="flush-headingOne">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                        Cuisine
                        </button>
                    </h2>
                    <div id="flush-collapseOne" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                        <div class="accordion-body">
                                <div className="recips_container container">
                                    {searchBar_cuisines.map(cuisine => {
                                        return(
                                            <div class="form-check form-switch">
                                                <input class="form-check-input" type="checkbox" role="switch" id={"flexSwitchCheckDefault"+"_"+cuisine} onChange={handleChange_cuisine}/>
                                                <label class="form-check-label" for={"flexSwitchCheckDefault"+"_"+cuisine}>{cuisine}</label>
                                            </div>
                                        )
                                    })}
                                </div>
                        </div>
                    </div>
                </div>
                
                <div class="accordion-item">
                    <h2 class="accordion-header" id="flush-headingTwo">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
                        Type
                        </button>
                    </h2>
                    <div id="flush-collapseTwo" class="accordion-collapse collapse" aria-labelledby="flush-headingTwo" data-bs-parent="#accordionFlushExample">
                        <div class="accordion-body">
                            <div className="recips_container container">
                                {searchBar_type.map(type => {
                                    return (
                                        
                                        <div class="form-check">
                                            <input class="form-check-input" type="radio" name="flexRadioDefault" id={"flexRadioDefault1"+"_"+type} onChange={handleChange_type}/>
                                            <label class="form-check-label" for={"flexRadioDefault1"+"_"+type}>{type}</label>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>

                <div class="accordion-item">
                    <h2 class="accordion-header" id="flush-headingThree">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
                        Sort
                        </button>
                    </h2>
                    <div id="flush-collapseThree" class="accordion-collapse collapse" aria-labelledby="flush-headingThree" data-bs-parent="#accordionFlushExample">
                        <div class="accordion-body">
                            <div className="recips_container container">
                                {searchBar_sort.map(sort => {
                                    return (
                                        
                                        <div class="form-check">
                                            <input class="form-check-input" type="radio" name="flexRadioDefault" id={"flexRadioDefault1"+"_"+sort} onChange={handleChange_sort}/>
                                            <label class="form-check-label" for={"flexRadioDefault1"+"_"+sort}>{sort}</label>
                                        </div>
                                    )
                                })}
                            </div>
                            <div className="row g-0">
                                <input type="radio" class="btn-check" id="btn-check_1" autocomplete="off" name="sortDir" value ="asc" onClick={handleChange_SortDir}/>
                                <label class="btn btn-primary" for="btn-check_1">Ascending</label>
                                
                                <input type="radio" class="btn-check" id="btn-check_2" autocomplete="off" name="sortDir" value ="desc" onClick={handleChange_SortDir}/>
                                <label class="btn btn-primary" for="btn-check_2">Descending</label>
                            </div>
                            

                        </div>
                    </div>
                </div>
                
                <div class="accordion-item">
                    <h2 class="accordion-header" id="flush-headingFour">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseFour" aria-expanded="false" aria-controls="flush-collapseFour">
                        Diet
                        </button>
                    </h2>
                    <div id="flush-collapseFour" class="accordion-collapse collapse" aria-labelledby="flush-headingFour" data-bs-parent="#accordionFlushExample">
                        <div class="accordion-body">
                            <div className="recips_container container">
                                {searchBar_diets.map(diet => {
                                    return (
                                        
                                        <div class="form-check">
                                            <input class="form-check-input" type="radio" name="flexRadioDefault" id={"flexRadioDefault1"+"_"+diet} onChange={handleChange_diet}/>
                                            <label class="form-check-label" for={"flexRadioDefault1"+"_"+diet}>{diet}</label>
                                        </div>
                                    )
                                })}
                            </div>

                        </div>
                    </div>
                </div>
                
                <div class="accordion-item">
                    <h2 class="accordion-header" id="flush-headingFive">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseFive" aria-expanded="false" aria-controls="flush-collapseFive">
                        Intolerances
                        </button>
                    </h2>
                    <div id="flush-collapseFive" class="accordion-collapse collapse" aria-labelledby="flush-headingFive" data-bs-parent="#accordionFlushExample">
                        <div class="accordion-body">
                            <div className="recips_container container">
                                {searchBar_intolerances.map(intolerance => {
                                    return (
                                        
                                        <div class="form-check form-switch">
                                                <input class="form-check-input" type="checkbox" role="switch" id={"flexSwitchCheckDefault"+"_"+intolerance} onChange={handleChange_intolerance}/>
                                                <label class="form-check-label" for={"flexSwitchCheckDefault"+"_"+intolerance}>{intolerance}</label>
                                        </div>
                                    )
                                })}
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            
            <br/>

            {/* <p>Selected cuisine: {cuisine}</p>
            <p>Selected type of meal: {mealType}</p>
            <p>Selected sort method: {sort}</p>
            <p>Selected intolerance: {intolerance}</p> */}
   
            <p>
            <button className="btn btn-primary" onClick={handleSearch}>Check the results</button>
            </p>

        </div>

        

        {/* <div className="container">
            {RecipsList('','','')}
        </div> */}
        <div className="container">
            <div className="row pagination">
                <p>
                    Presenting {numberResults} out of {totalResults} results (Offset: {offsetResults})     
                </p>
            </div>

            <div>
                {searchResults}
            </div>

            <div className="row pagination">
                <p>
                    Presenting {numberResults} out of {totalResults} results (Offset: {offsetResults})     
                </p>
                <p>
                    <button className="btn btn-primary" onClick={handleMoreResults} disabled={false}>Get more results</button>
                </p>
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