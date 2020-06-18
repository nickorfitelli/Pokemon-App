import React, { useState, useEffect, useContext } from "react";
import PokeDisplay from "./../Components/PokeDisplay";
import context from "../CollectionContext";

function BattlePage() {
	const { collectionState } = useContext(context);
	const [collection] = collectionState;

	const [leftPoke, setleftPoke] = useState("");
	const [rightPoke, setRightPoke] = useState("");
	const [selectPoke, setSelectPoke] = useState("");
	const [winner, setWinner] = useState("None");

	useEffect(() => {
		if (leftPoke === "" || rightPoke === "") return;

		(async () => {
			const getPokeData = async (pokeName) => {
				const result = await fetch(
					`https://pokeapi.co/api/v2/pokemon/${pokeName}`
				);
				if (!result.ok) throw new Error();
				const jsonResult = await result.json();

				return {
					hp: jsonResult.stats[1].base_stat,
					attack: jsonResult.stats[2].base_stat,
					defense: jsonResult.stats[3].base_stat,
					spattack: jsonResult.stats[4].base_stat,
					spdefense: jsonResult.stats[5].base_stat,
				};
			};
			try {
				const results = await Promise.all([
					getPokeData(leftPoke),
					getPokeData(rightPoke),
				]);

				if (results[0].hp > results[1].hp) {
					setWinner("Left");
				} else {
					setWinner("Right");
				}
			} catch {
				setWinner("None");
			}
		})(); //defines function, immediately calls -> "iffy"
	}, [leftPoke, rightPoke]);

	return collection.length > 0 ? (
		<div style={battlePageStyle}>
			<div style={sideBarStyle}>
				{collection.map((pokeName, i) => (
					<PokeDisplay
						style={{
							backgroundColor:
								pokeName === selectPoke
									? "lightgreen"
									: "lightblue",
							cursor: "pointer",
						}}
						modalDisabled
						pokemonName={pokeName}
						key={i}
						onClick={() => {
							setSelectPoke(pokeName);
						}}
					/>
				))}
			</div>
			<div style={fightStyle}>
				<PokeDisplay
					pokemonName={leftPoke}
					onClick={() => {
						console.log("called");
						setleftPoke(selectPoke);
					}}
				/>

				<div>VS</div>
				<PokeDisplay
					pokemonName={rightPoke}
					onClick={() => {
						setRightPoke(selectPoke);
					}}
				/>
				<div>{winner === "Left" ? "Winner!" : " "}</div>
				<div></div>
				<div>{winner === "Right" ? "Winner!" : " "}</div>
			</div>
		</div>
	) : (
		<div style={noPokemonStyle}>
			Please add Pokemon to your collection to battle!
		</div>
	);
}

const battlePageStyle = {
	height: "90%",
	display: "grid",
	gridTemplateColumns: "300px auto",
	gap: "5px",
};
const noPokemonStyle = {
	marginTop: "30px",
	fontSize: "xx-large",
	display: "grid",
	placeContent: "center",
};
const sideBarStyle = {
	display: "grid",
	padding: "5px",
	gap: "5px",
	gridAutoRows: "200px",
	overflow: "auto",
};

const fightStyle = {
	placeContent: "center",
	display: "grid",
	gridTemplateColumns: "300px auto 300px",
	gridTemplateRows: "200px auto 100px",
};

export default BattlePage;
