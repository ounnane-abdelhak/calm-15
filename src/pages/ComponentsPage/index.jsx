//import components
import { useEffect, useState } from "react";
import {ComponentsCard, NavBar} from "../../components/"
import calmArchi from "../../assets/images/calm/calmArchitecture.svg"

import axios from "axios";
import './style.css';

import React from "react";
import Bot from "../../components/ChatBot";


const Components = () => {
  const [categories, setCategories] = useState({});
  
  return (
    <>
      <NavBar/>
      <div className="globalContainer">
        <div className="imageContainer">
          <p className="title">calM Architecture</p>
        </div>
        {
          Object.keys(categories).map(categoryName => 
            <div className="UnitsContainer">
              <p className="title">{categoryName}</p>
              {categories[categoryName].map(component => 
                <ComponentsCard componentInfo={component} key={component.name}/>
              )}
            </div>
          )
        }
      </div>
      <Bot/>
    
    </>
  );
};
export default Components;
