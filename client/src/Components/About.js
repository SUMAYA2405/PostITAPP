import React from "react";
import userImage from '../Images/user.png';

const About =()=>{
    return(<div>
            <h1>About this project </h1>
            <p>This project is developed by: UTAS_Ibra</p>
            <p>Email: Ibra@utac.edu.om</p>
            <img src={userImage} alt="devimage"/>
            <button>Connect deveropler</button>
    </div>)
};