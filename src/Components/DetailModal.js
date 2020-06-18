import React, { useEffect, useState, useContext } from "react";
import context from "../CollectionContext";

const DetailModal = ({ pokemonName }) => {
	//setPokemonData is a function, whenever called React renders again
	const [pokemonData, setPokemonData] = useState();
	const [collection, setCollection] = useContext(context);

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
			style={myStyle}
		>
			<h1>{pokemonName.toUpperCase()}</h1>
			<img src={pokemonData.pokeSpriteURL} alt={pokemonName} />
			<div onClick={() => {}}>Type: {pokemonData.pokeType}</div>
			<div>Abilities: {pokemonData.pokeAbilities}</div>
			<div>{pokemonData.pokeDescription}</div>
			<input
				type="button"
				value="Add to Collection"
				disabled={collection.find(
					(collItem) => pokemonName === collItem
				)}
				onClick={() => {
					setCollection([...collection, pokemonName]);
				}}
			/>
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

export default DetailModal;
