import React from "react";
import { Link } from "react-router-dom";

function Home () {

    return (
        <div className="addRecipe">
             <Link exact to="/addRecipe" className="link">
          Recipe List
             </Link>

        </div>
    )
}

export default Home;