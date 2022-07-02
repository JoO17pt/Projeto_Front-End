import React, {useState, useEffect, useRef, useContext} from "react";
import DataContext from "../data/dataContext-search";

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
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const {recips, setRecips} = useContext(DataContext);

    const handleChange_cuisine = (e) => {
        setCuisine(e.target.value);
        console.log(e.target.value);
    }
    
    const handleChange_type = (e) => {
        setMealType(e.target.value);
        console.log(e.target.value);
    }
    
    const handleChange_sort = (e) => {
        setSort(e.target.value);
        console.log(e.target.value);
    }
    
    const handleSearch = (e) => {
        setClick(click+1);
        offset.current = 0;
        acederAPI();
        console.log('Fui clicado');
    }

    const handleMoreResults = (e) => {
        offset.current = offset.current + 10;
        acederAPI();
        setClick(click+1);
    }
    
   
    useEffect (()=>{
        recips.results == undefined ? console.log('Data Context Vazio') : renderizarPagina(recips);
    },[]);

    

// ============================================================================================================================================

    const acederAPI = () => {
        console.log("Entrei!")
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
        console.log('Função carregamento chamada!')
        
            console.log('Atualizei a DOM')
            recips.number < recips.totalResults - recips.offset ? setnumberResults(recips.number) :  setnumberResults(recips.totalResults - recips.offset);
            settotalResults(recips.totalResults);
            setoffsetResults(recips.offset);
            setSearchResults(
                recips.results.map(recip=>{
                    return(
                        
                        <div className="card mb-3">
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
            
        </div>
        </>
    )
}

export default Search;