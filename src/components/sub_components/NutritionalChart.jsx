import React from "react";

// This component is responsible for building a chart based on the daily needed % of calories, carbohydrates and protein of the meals selected by the user

const NutritionalChart = (props) => {
  return (
    <div id="Chart">
      <h4>Nutritional Chart</h4>
      <div>
        <img
          src={`https://quickchart.io/chart?c={type:'bar',data:{labels:[${props.chartDays}], datasets:[{label:'Calories',data:[${props.chartCals}]},{label:'Carbohydrates',data:[${props.chartCarbs}]},{label:'Protein',data:[${props.chartProts}]}]}}`}
          alt="Nutritional Chart"
        ></img>
      </div>
    </div>
  );
};

export default NutritionalChart;
