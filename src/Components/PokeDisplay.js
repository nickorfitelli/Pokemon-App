import React, { useEffect, useState, useContext } from "react";
import context from "../CollectionContext";

const PokeDisplay = ({ pokemonName, modalDisabled, style, ...rest }) => {
	//setPokemonData is a function, whenever called React renders again
	const [spriteUrl, setSpriteUrl] = useState("");
	const { modalState } = useContext(context);
	const [, setModalText] = modalState;

	useEffect(() => {
		setSpriteUrl("");
		(async () => {
			//Fetch API data
			if (pokemonName === "") return;
			const result = await fetch(
				`https://pokeapi.co/api/v2/pokemon/${pokemonName}`
			);

			if (!result.ok) return;

			const jsonResult = await result.json();
			setSpriteUrl(jsonResult.sprites.front_default);
		})(); //defines function, immediately calls -> "iffy"
	}, [pokemonName]);

	return spriteUrl ? (
		<div
			onClick={() => {
				if (!modalDisabled) setModalText(pokemonName);
			}}
			style={{...myStyle,...style}}
			{...rest}
		>
			<div style={titleStyle}>{pokemonName.toUpperCase()}</div>
			<img src={spriteUrl} alt={pokemonName} />
		</div>
	) : (
		<div style={{ border: "1px solid black" }} {...rest}>Loading...</div>
	);
};

const myStyle = {
	display: "grid",
	placeItems: "center",
	backgroundColor: "lightblue",
	fontFamily: "sans-serif",
	padding: "10px",
};

const titleStyle = {
	fontSize: "2em",
	fontWeight: "bold",
};

export default PokeDisplay;

//Name of pokemon
//Show sprite
//List of Abilities
//Pokemon Species -> form descriptions
