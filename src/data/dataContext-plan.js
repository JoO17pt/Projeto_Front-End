import React from "react";

export const dataPlan =
    [
        {Day: 'Monday', Meals: [
            {Meal: '1st Meal', Recip:{}},
            {Meal: '2nd Meal', Recip:{}},
            {Meal: '3rd Meal', Recip:{}} 
        ]},
        {Day: 'Tuesday', Meals: [
            {Meal: '1st Meal', Recip:{}},
            {Meal: '2nd Meal', Recip:{}},
            {Meal: '3rd Meal', Recip:{}} 
        ]},
        {Day: 'Wednesday', Meals: [
            {Meal: '1st Meal', Recip:{}},
            {Meal: '2nd Meal', Recip:{}},
            {Meal: '3rd Meal', Recip:{}} 
        ]},
        {Day: 'Thursday', Meals: [
            {Meal: '1st Meal', Recip:{}},
            {Meal: '2nd Meal', Recip:{}},
            {Meal: '3rd Meal', Recip:{}} 
        ]},
        {Day: 'Friday', Meals: [
            {Meal: '1st Meal', Recip:{}},
            {Meal: '2nd Meal', Recip:{}},
            {Meal: '3rd Meal', Recip:{}} 
        ]},
        {Day: 'Saturday', Meals: [
            {Meal: '1st Meal', Recip:{}},
            {Meal: '2nd Meal', Recip:{}},
            {Meal: '3rd Meal', Recip:{}} 
        ]},
        {Day: 'Sunday', Meals: [
            {Meal: '1st Meal', Recip:{}},
            {Meal: '2nd Meal', Recip:{}},
            {Meal: '3rd Meal', Recip:{}} 
        ]},
        
    ];

const DataContextPlan = React.createContext(dataPlan);

export default DataContextPlan;