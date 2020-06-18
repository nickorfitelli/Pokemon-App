import React, { useEffect, useState, useContext } from "react";
import context from "../CollectionContext";

const DetailModal = ({ pokemonName, searchParam, setSearchParam }) => {
	//setPokemonData is a function, whenever called React renders again
	const [pokemonData, setPokemonData] = useState();
	const { collectionState, modalState } = useContext(context);
	const [collection, setCollection] = collectionState;
	const [, setModalText] = modalState;

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
				pokeType: jsonResult.types.map((x) => x.type.name),
				//stats
				hp: jsonResult.stats[1].base_stat,
				attack: jsonResult.stats[2].base_stat,
				defense: jsonResult.stats[3].base_stat,
				spattack: jsonResult.stats[4].base_stat,
				spdefense: jsonResult.stats[5].base_stat,
			};

			console.log(pokeInfo.pokeType);
			// setPokemonData(pokeInfo);

			//get the flavor text
			const result2 = await fetch(jsonResult.species.url);

			if (!result2.ok) {
				return;
			}

			const jsonResult2 = await result2.json();

			pokeInfo.pokeDescription =
				jsonResult2.flavor_text_entries[0].flavor_text;

			setPokemonData(pokeInfo);
		})(); //defines function, immediately calls -> "iffy"
	}, [pokemonName]);

	let body = pokemonData ? (
		<React.Fragment>
			<img
				height={300}
				src={pokemonData.pokeSpriteURL}
				alt={pokemonName}
			/>
			<div>Hp: {pokemonData.hp}</div>
			<div>Atk: {pokemonData.attack}</div>
			<div>Sp Atk: {pokemonData.spattack}</div>
			<div>Def: {pokemonData.defense}</div>
			<div>Sp Def: {pokemonData.spdefense}</div>
			<div>Type: </div>
			{pokemonData.pokeType.map((type, i) => {
				return (
					<div key={i} onClick={() => {
						setSearchParam(type);
						setModalText("")
					}}>
						{type}
					</div>
				);
			})}
			<div>Abilities: {pokemonData.pokeAbilities}</div>
			<div>{pokemonData.pokeDescription}</div>
			{collection.find((collItem) => pokemonName === collItem) ? (
				<div
					className="button"
					onClick={() => {
						setCollection(
							collection.filter((item) => pokemonName !== item)
						);
					}}
				>
					Remove from Collection
				</div>
			) : (
				<div
					className="button"
					onClick={() => {
						setCollection([...collection, pokemonName]);
					}}
				>
					Add to Collection
				</div>
			)}
		</React.Fragment>
	) : (
		<div>Loading ....</div>
	);
	return (
		<div
			style={backgroundStyle}
			onClick={() => {
				setModalText("");
			}}
		>
			<div
				onClick={(ev) => {
					ev.stopPropagation();
				}}
				style={modalStyle}
			>
				<div style={titleStyle}>{pokemonName.toUpperCase()}</div>
				{body}
			</div>
		</div>
	);
};
const titleStyle = {
	fontSize: "2em",
	fontWeight: "bold",
};

const modalStyle = {
	display: "grid",
	placeItems: "center",
	gap: "10px",
	backgroundColor: "lightblue",
	padding: "10px",
	borderRadius: "15px",
	border: "1px solid black",
};
const backgroundStyle = {
	position: "fixed",
	display: "grid",
	placeItems: "center",
	backgroundColor: "rgba(0,0,0,0.5)",
	width: "100%",
	height: "100%",
	fontFamily: "sans-serif",
	padding: "10px",
};

export default DetailModal;
