import React from "react";

const Home = props => {
    return (
      <>
        <div className="container">
          <p>
            MealPlanner is an application developed to assist people reaching
            their ideal levels of food consumption, along with optimize the
            process of managing the ingredients and the preparation of meals,
            allowing the users to be and feel healthy, and have time to enjoy
            life!
          </p>
          <q>
            The newly emerging field of positive psychology focuses on the
            positive facets of life, including happiness, life satisfaction,
            personal strengths, and flourishing. Research in this field has
            empirically identified many important benefits of enhanced
            well-being, including improvements in blood pressure, immune
            competence, longevity, career success, and satisfaction with
            personal relationships. Recognizing these benefits has motivated
            researchers to identify the correlates and causes of well-being to
            inform them in the development and testing of strategies and
            interventions to elevate well-being. As positive psychology
            researchers throughout the world have turned their attention toward
            facets of food intake, a consensus is developing that the
            consumption of healthy foods can enhance well-being in a
            dose-response fashion.(...)
          </q>
          <p>© 2019 S. Karger AG, Basel</p>

          <ol class="list-group list-group-numbered">
            <li class="list-group-item">Manage your plan - navigate through thousands of meal option and structure your weekly Meal Plan</li>
            <li class="list-group-item">Check the nutritional levels of your plan, and adjust it according to your expectations</li>
            <li class="list-group-item">Use your final report to assist you on manage your stock of ingredients and cooking</li>
            <li class="list-group-item">Enjoy feeling healthy and have enough time be happy!</li>
          </ol>
        </div>
      </>
    );
}

export default Home;