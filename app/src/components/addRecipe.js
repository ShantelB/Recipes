import React, {useState} from 'react';
import { Container, Card, CardBody, CardTitle, CardSubtitle, } from 'reactstrap';
import "../App.css";

function AddRecipe(props) {
  const [recipeName, setRecipeName] = useState({
    name:'',
    ingredients:'',
    prep:'',
    instructions:'',
    category:'',
    })  
   
  const changes = event => {
      setRecipeName({...recipeName, [event.target.name]: event.target.value})
  }

const submitRecipe = event => {
    event.preventDefault();
    props.addNewRecipeList(recipeName);
    setRecipeName({ 
    name:'',
    ingredients:'',
    prep:'',
    instructions:'',
    category:'',
})
}

console.log(props.recipeList)

    return (
      <div className="Recipe-List">
      <form className="recipe" onSubmit={submitRecipe}>

      <div className="category">
      <label htmlFor="category">
        Category  
        <select id="category" name="category" onChange={changes}>
        <option></option>
          <option value="appetizer">Appetizer</option>
          <option value="salad">Salad</option>
          <option value="soup">Soup</option>
          <option value="vegetable">Vegetable</option>
          <option value="main">Main Dish</option>
          <option value="dessert">Dessert</option>
          <option value="bread">Bread</option>
          <option value="breakfast">Breakfast</option>
          <option value="sandwich">Sandwich</option>
          <option value="side">Side Dish</option>
          <option value="snack">Snack</option>
        </select>
      </label>
        </div>

         
          <label htmlFor="name">Name </label>
          <input id="name" type="text" name="name" onChange={changes} value= {recipeName.name} required />

           <div className="cooking">
          <label htmlFor="ingredients">Ingredients <textarea name="ingredients" value={recipeName.ingredients} onChange={changes} /></label>

          <label htmlFor="prep">Preparation <textarea name="prep" value={recipeName.prep} onChange={changes} /></label>

          <label htmlFor="instructions">Instructions <textarea name="instructions" value={recipeName.instructions} onChange={changes} /></label>
         </div>

         <button type="submit">Submit</button>
         

      </form>

      <Container className="Recipe-card">
          {props.recipeList.map(recipe => (
              <div className="list" key={recipe.id}>
                
                <Card className="recipeCard" >
                  <CardBody >
             
                  <CardTitle><h2>{recipe.name}</h2></CardTitle>
                  <CardSubtitle><h3>{recipe.category}</h3></CardSubtitle>
                  <CardSubtitle className="subtitle"><h3>{recipe.ingredients}</h3></CardSubtitle>
                  <CardSubtitle><h3>{recipe.prep}</h3></CardSubtitle>
                  <CardSubtitle><h3>{recipe.instructions}</h3></CardSubtitle>
                  
              
                  </CardBody>
                </Card>
                
          </div>
          ))}
    </Container>

      </div>
    );
  }
  
  export default AddRecipe;
  