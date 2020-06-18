import React, { useEffect, useState, useContext } from "react";
import context from "../CollectionContext";

const PokeDisplay = ({ pokemonName }) => {
	//setPokemonData is a function, whenever called React renders again
	const [pokemonData, setPokemonData] = useState();
	const { modalState } = useContext(context);
	const [modalText, setModalText] = modalState;

	useEffect(() => {
		(async () => {
			//Fetch API data
			const result = await fetch(
				`https://pokeapi.co/api/v2/pokemon/${pokemonName}`
			);

			if (!result.ok) {
				return;
			}

			const jsonResult = await result.json();
			var pokeInfo = {
				pokeSpriteURL: jsonResult.sprites.front_default,
				pokeAbilities: jsonResult.abilities
					.map((x) => x.ability.name)
					.join(", "),
				pokeDescription: "Loading Description ...",
				pokeType: jsonResult.types.map((x) => x.type.name).join(", "),
			};

			// setPokemonData(pokeInfo);

			//get the flavor text
			const result2 = await fetch(jsonResult.species.url);

			if (!result2.ok) {
				return;
			}

			const jsonResult2 = await result2.json();

			pokeInfo.pokeDescription =
				jsonResult2.flavor_text_entries[1].flavor_text;

			setPokemonData(pokeInfo);
		})(); //defines function, immediately calls -> "iffy"
	}, [pokemonName]);

	return pokemonData ? (
		<div
			onClick={() => {
				setModalText(pokemonName);
			}}
			style={myStyle}
		>
			<h1>{pokemonName.toUpperCase()}</h1>
			<img src={pokemonData.pokeSpriteURL} alt={pokemonName} />
		</div>
	) : (
		<div>Loading</div>
	);
};

const myStyle = {
	backgroundColor: "lightblue",
	fontFamily: "sans-serif",
	padding: "10px",
};

export default PokeDisplay;

//Name of pokemon
//Show sprite
//List of Abilities
//Pokemon Species -> form descriptions
