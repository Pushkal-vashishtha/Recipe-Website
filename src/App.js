
import { useEffect, useState } from 'react';
import './App.css';
import Recipe from './Recipe';

function App() {
 const APP_Id="610fa836";
 const APP_KEY="c5267a054182f5ce299691fead7b5426";

 const[recipes,setRecipies]=useState([])
const[search,setSearch]=useState('')
const[query,setQuery]=useState('noodles')

const getSearch= e=>{
  e.preventDefault()
  setQuery(search)
  setSearch('')
}


useEffect(()=>{
  function getRecipies(){
    fetch('https://api.edamam.com/search?q='+query+"&app_id="+APP_Id+"&app_key="+APP_KEY)
    .then(res =>res.json())
    .then(data=>setRecipies(data.hits))
  }
  
  getRecipies()
},[query])

return (
    <div className="App">
      <form className="search-form" onSubmit={getSearch}>
    <input type="text" className="search-bar" value={search} onChange={e=>setSearch(e.target.value)}/>
    <button type="submit" className="search-button">Search</button>
    </form>
    <div className='recipe'>
      {recipes.map((recipe,idx) =>
      <Recipe 
      key={idx}
      title={recipe.recipe.label}
      calories={recipe.recipe.calories}
      image={recipe.recipe.image}
      ingredients={recipe.recipe.ingredients}/>)}
</div>
   
    </div>
  );
}

export default App;
