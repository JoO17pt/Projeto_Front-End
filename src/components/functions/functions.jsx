// Check if an object is empty

const checkIfEmpty = (recip) => {
    if (Object.keys(recip).length !== 0) {
      return true;
    }
    return false;
  };

  // Use Spoonacular API to get search results

  const callAPI = (cuisine,mealType,sort,offsetCurrent,diet,intolerance,sortDirection,setRecips,error,setSearchResults,renderizarPagina,setError) => {
    fetch(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=42ae2751b3ce4073a79699c333c2ec16&cuisine=${cuisine}&type=${mealType}&sort=${sort}&number=10&offset=${offsetCurrent}&diet=${diet}&intolerances=${intolerance}&sortDirection=${sortDirection}&addRecipeInformation=true&fillIngredients=true&addRecipeNutrition=true`
    )
      .then((res) => res.json())
      .then(
        (data) => {
          setRecips(data);
          if (error) {
            return setSearchResults(
              <tr>
                <td>Error: {error.message}</td>
              </tr>
            );
          } else {
            renderizarPagina(data);
          }
        },
        (error) => {
          setError(error);
        }
      );
  };

  export {checkIfEmpty,callAPI};