import React from "react";
import LearnTitle from "../../assets/images/logos/LearnTitle.png"
import starImage from "../../assets/images/calm/exerciceImages/1-star.png"
import star2Image from "../../assets/images/calm/exerciceImages/2-stars.png"
import star3Image from "../../assets/images/calm/exerciceImages/3-stars.png"
import star4Image from "../../assets/images/calm/exerciceImages/4-stars.png"


// import components
import { NavBar } from "../../components";
import {Learn, Footer} from "../../containers";
import "./style.css";
import Bot from "../../components/ChatBot";
function ExercicesPage(props) {
    return (
        <>
            <NavBar/>
            {/* <main id="learn-page-main">
        <Title/>
      </main> */}
            <img src={LearnTitle} className="exerciceTitle" alt="" />

            <div className="globalContainerExercice">
                <p className="exrciceIntro">
                    This exercises are ranked by level so you can test yourself according to what you have learned and to the
                    difficulty of the exercises.
                </p>
                <Learn buttonText="Practice" title={"Level 1"} but link={"/learn/Exercices/level1"} text={"Embark on a learning journey with our beginner-friendly " +
                    "course and uncover the inner workings of the calM machines."} img={starImage}/>

                <Learn buttonText="Practice" title={"Level 2"} link={"/learn/Exercices/level2"} img={star2Image} text={"Discover how data is" +
                    " stored and retrieved from the memory and the different modes used to access information."}/>

                <Learn buttonText="Practice" title={"Level 3"} link={"/learn/Exercices/level3"} img={star3Image} text={"Get to know the different " +
                    "parts that makes the calM machine and how they interact with each other."}/>

                <Learn buttonText="Practice" title={"Level 4"} img={star4Image} text={"A collection of code examples we designed carefully to show you how the calM machine" +
                    "works in action, you can execute them !"} link={"/learn/Exercices/level4"}/>
            </div>
            <Bot/>
            <Footer></Footer>
        </>
    );
}

export default ExercicesPage;