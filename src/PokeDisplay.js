import React,{useEffect,useState} from 'react'



const PokeDisplay = ({pokemonName}) => {

    //setPokemonData is a function, whenever called React renders again
   const  [pokemonData, setPokemonData] = useState()

    useEffect(() => {
    
    (async()=>{
        //Fetch API data
       const result = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);

       if(!result.ok){return}

       const jsonResult = await result.json();

       var pokeInfo = {
           pokeSpriteURL: jsonResult.sprites.front_default,
           pokeAbilities: jsonResult.abilities.map(x => x.ability.name).join(", "),
           pokeDescription: "Loading Description ...",
           pokeType: jsonResult.types.map(x => x.type.name).join(", ")
       };

      // setPokemonData(pokeInfo);

       //get the flavor text
       const result2 = await fetch(jsonResult.species.url);

       if(!result2.ok){return}

       const jsonResult2 = await result2.json();

       pokeInfo.pokeDescription = jsonResult2.flavor_text_entries[0].flavor_text.replace(/\n/g, ' ');

       setPokemonData(pokeInfo);
       

    })() //defines function, immediately calls -> "iffy"

      
    }, [pokemonName])
    
    return (
        pokemonData ? 

        <div>
            <h1>{pokemonName}</h1>
            <img src={pokemonData.pokeSpriteURL} alt={pokemonName}/>
            <p>Type: {pokemonData.pokeType}</p>
            <p>Abilities: {pokemonData.pokeAbilities}</p>
            <p>{pokemonData.pokeDescription}</p>
        </div>

        :

        <div>Loading</div>
    )
}

export default PokeDisplay

//Name of pokemon
//Show sprite
//List of Abilities
//Pokemon Species -> form descriptions