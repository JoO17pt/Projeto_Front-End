import React, {useContext} from "react";
import DataContext from "../data/dataContext-search";

const Report = props => {
    const {recips, setRecips} = useContext(DataContext);
    console.log(recips);
    return (
        <div className="container">
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cupiditate nemo sapiente aut repellat alias qui consequatur! Facere rem quos veritatis eius laudantium. Expedita quidem eveniet corrupti officia unde consequuntur reprehenderit?</p>
            <p>Resultado do useContext:</p>
        </div>
    )
}

export default Report;