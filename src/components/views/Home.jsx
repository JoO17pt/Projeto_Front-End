import React from "react";
import "../../components/views/styles/home.css";
import { Link } from "react-router-dom";

const Home = (props) => {
  return (
    <>
      <div className="container">
        <div id="home">
          <div className="container">
            <div className="row">
              <div className="col-8">
                <p className="semiBold">
                  MealPlanner is an application developed to assist people
                  reaching their ideal levels of food consumption, along with
                  optimize the process of managing the ingredients and the
                  preparation of meals, allowing the users to be and feel
                  healthy, and have time to enjoy life!
                </p>
                <ol class="list-group list-group-numbered semiBold">
                  <li class="list-group-item homeLi">
                    Manage your plan - navigate through thousands of meal option
                    and structure your weekly Meal Plan
                  </li>
                  <li class="list-group-item homeLi">
                    Check the nutritional levels of your plan, and adjust it
                    according to your expectations
                  </li>
                  <li class="list-group-item homeLi">
                    Use your final report to assist you on manage your stock of
                    ingredients and cooking
                  </li>
                  <li class="list-group-item homeLi">
                    Enjoy feeling healthy and have enough time be happy!
                  </li>
                </ol>
                <br />
                <div id="divButton">
                  <Link to={"/planner"} className="homeLink">
                    <button
                      className="btn btn-primary button semiBold"
                      id="buttonHome"
                    >
                      Ready to Start?
                    </button>
                  </Link>
                </div>
              </div>
              <div className="col-4">
                <p>
                  <q>
                    <i>
                      The newly emerging field of positive psychology focuses on
                      the positive facets of life, including happiness, life
                      satisfaction, personal strengths, and flourishing.
                      Research in this field has empirically identified many
                      important benefits of enhanced well-being, including
                      improvements in blood pressure, immune competence,
                      longevity, career success, and satisfaction with personal
                      relationships. Recognizing these benefits has motivated
                      researchers to identify the correlates and causes of
                      well-being to inform them in the development and testing
                      of strategies and interventions to elevate well-being. As
                      positive psychology researchers throughout the world have
                      turned their attention toward facets of food intake, a
                      consensus is developing that the consumption of healthy
                      foods can enhance well-being in a dose-response
                      fashion.(...)
                    </i>
                  </q>
                  <br />
                  <p>© 2019 S. Karger AG, Basel</p>
                </p>
              </div>
            </div>
          </div>
<div>
         
          <p>
          <strong>About me:</strong> I'm a Full-Stack student living in Porto, interested in technology, art and gastronomy. This application is the final project of the front-end module of my course. The idea of develop a Meal Planner came from my believe that having an healthy and organized food routine is essential to live an happy life, and be able to deal with the stress of the nowadays way of living. Also, after a preliminary search through the information available online about the subject, it became clear that it would be an easy task to find all the necessary tools to develop the expected output.
          </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
