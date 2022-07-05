import React, {useContext, useState, useEffect} from "react";
import DataContextPlan from "../data/dataContext-plan";

const Report = props => {
    const [plan, setPlan] = useContext(DataContextPlan);
    const [results, setResults] = useState();

    useEffect (()=>{
        rendeizarPagina(plan);
    },[]);

    console.log(plan)

    const rendeizarPagina = (plan) => {
        setResults(
            // <div className="col">
            //                     {plan.map(day => {
            //                         return(
            //                             <div className="row">
            //                                 <div className="col">{day.Day}</div>
            //                                 <div className="col">{day.Meals.map(meal => {
            //                                     return(
            //                                         <>
            //                                             <div className="row">
            //                                                 <div className="col">{meal.Meal}</div>
            //                                                 {/* <div className="col">{meal.Recip}</div> */}
            //                                                 {console.log(meal.Recip)}
            //                                             </div>
            //                                         </>
            //                                     )
            //                                 })}</div>
            //                             </div>
            //                         )
            //                     })}
            //                 </div>
            )
    }

    return (
        <div className="container">
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cupiditate nemo sapiente aut repellat alias qui consequatur! Facere rem quos veritatis eius laudantium. Expedita quidem eveniet corrupti officia unde consequuntur reprehenderit?</p>
            <p>Resultado do useContext:</p>
            
            <div>{results}</div>

        </div>
    )
}

export default Report;