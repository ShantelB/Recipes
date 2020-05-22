import React, { useState } from "react";
import "./App.css";
import { Route, Link } from "react-router-dom";
import AddRecipe from "./components/addRecipe";
import Login from "./components/login";
import Registration from "./components/registration";
import Home from "./components/home";
import {TweenMax} from "gsap";





function App() {
  
  const [recipeList, setRecipeList] = useState([
    {
      id: '',
      name:'',
      ingredients:'',
      prep:'',
      instructions:'',
      category:'',
      }
  ])
  
  const addNewRecipeList = (recipe) => {
    const newRecipe ={
      id:Date.now(),
      name: recipe.name,
      ingredients: recipe.ingredients,
      prep: recipe.prep,
      instructions: recipe.instructions,
      category:recipe.category,
    }
    setRecipeList([...recipeList, newRecipe])
  }

  const [newMember, setNewMember] = useState([
    {
      id: '',
      name:'',
      email:'',
      password:'',
      terms:'',
      }
  ])
  
  const addNewMember = (member) => {
    const newMembers ={
      id:Date.now(),
      name:member.name,
      email:member.email,
      password:member.password,
      terms:member.terms,
    }
    setNewMember([...newMember, newMembers])
  }

  const [login, setLogin] = useState([
    {
      id: '',
      name:'',
      password:'',
      }
  ])
  
  const addLogin = (member) => {
    const newLogin ={
      id:Date.now(),
      name:member.name,
      password:member.password,
    }
    setLogin([...login, newLogin])
  }
  
  
  
TweenMax.to(".link", {duration: 3, rotation: 360, repeat:-1, repeatDelay: 5});


  return (
    <div className="App">
      <header className="App-header">
         
        <h1>Secret Recipes</h1>
         <nav>
        <div className="nav-bar">
        <Link exact to="/Login" className="link">
          Login
        </Link>
        <Link exact to="/Registration" className="link">
          Sign Up
        </Link>
        <Link exact to="/" className="link">
          Home
        </Link>
        
          </div>
          </nav>
      </header>

      

      <Route exact path="/">
        <Home />
      </Route>

      <Route exact path="/Login">
        <Login addLogin={addLogin} />
      </Route>

      <Route exact path="/Registration">
        <Registration addNewMember={addNewMember} />
      </Route>

<Route exact path="/addRecipe">
  <AddRecipe addNewRecipeList={addNewRecipeList} recipeList={recipeList} />
</Route>

    </div>
  );
}

export default App;
