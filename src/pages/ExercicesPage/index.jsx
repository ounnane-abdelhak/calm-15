import React from "react";
import LearnTitle from "../../assets/images/logos/LearnTitle.png"
import starImage from "../../assets/images/calm/exerciceImages/1-star.png"
import star2Image from "../../assets/images/calm/exerciceImages/2-stars.png"
import star3Image from "../../assets/images/calm/exerciceImages/3-stars.png"
import star4Image from "../../assets/images/calm/exerciceImages/4-stars.png"

// import components
import { NavBar } from "../../components";
import { Footer } from "../../containers";
import "./style.css";
import Bot from "../../components/ChatBot";

// New Exercice component with responsive layout
const ExerciceComponent = ({ title, buttonText, link, text, img }) => {
  return (
    <div className="exercice-component">
      <div className="exercice-component-header">
        <img src={img} className="exercice-component-img" alt={title} />
        <h3 className="exercice-component-title">{title}</h3>
      </div>
      <p className="exercice-component-text">{text}</p>
      <a href={link} className="exercice-component-button">{buttonText}</a>
    </div>
  );
};

function ExercicesPage(props) {
    return (
        <>
            <NavBar/>
            <img src={LearnTitle} className="exerciceTitle" alt="Exercices Title" />

            <div className="globalContainerExercice">
                <p className="exrciceIntro">
                    This exercises are ranked by level so you can test yourself according to what you have learned and to the
                    difficulty of the exercises.
                </p>
                
                <ExerciceComponent 
                    title="Level 1" 
                    buttonText="Practice" 
                    link="/learn/Exercices/level1" 
                    text="Embark on a learning journey with our beginner-friendly course and uncover the inner workings of the calM machines." 
                    img={starImage}
                />

                <ExerciceComponent 
                    title="Level 2" 
                    buttonText="Practice" 
                    link="/learn/Exercices/level2" 
                    img={star2Image} 
                    text="Discover how data is stored and retrieved from the memory and the different modes used to access information."
                />

                <ExerciceComponent 
                    title="Level 3" 
                    buttonText="Practice" 
                    link="/learn/Exercices/level3" 
                    img={star3Image} 
                    text="Get to know the different parts that makes the calM machine and how they interact with each other."
                />

                <ExerciceComponent 
                    title="Level 4" 
                    buttonText="Practice" 
                    img={star4Image} 
                    text="A collection of code examples we designed carefully to show you how the calM machine works in action, you can execute them!" 
                    link="/learn/Exercices/level4"
                />
            </div>
            
            <div style={{ zIndex: 1200}}>
  <Bot/>
</div>
            <Footer/>
        </>
    );
}

export default ExercicesPage;
