import React from 'react';
import PokeDisplay from './PokeDisplay'
import SearchPoke from './SearchPoke'

function App() {
  //get list of all pokemon
  return (
    <div >
      <h1>Pokedex</h1>
      <input type ="text" placeholder="Enter Pokemon Name ..."/>
      <button onClick = {SearchPoke}>Search</button> 
      <PokeDisplay pokemonName = "ditto"/>
      <PokeDisplay pokemonName = "pikachu"/>
      <PokeDisplay pokemonName = "charmander"/>
    </div>
  );
}

export default App;
