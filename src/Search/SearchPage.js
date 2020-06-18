import React, { useState, useEffect } from "react";
import PokeDisplay from "./../Components/PokeDisplay";
import SearchPoke from "./SearchBar";

const SearchPage = () => {
	//get list of all pokemon
	const [searchParam, setsearchParam] = useState("");
	const [currUrl, setCurrUrl] = useState("https://pokeapi.co/api/v2/pokemon");
	const [nextUrl, setNextUrl] = useState(null);
	const [prevUrl, setPrevUrl] = useState(null);
	const [pokeNames, setPokeNames] = useState([]);

	useEffect(() => {
		(async () => {
			//Fetch API data
			const result = await fetch(currUrl);

			if (!result.ok) {
				return;
			}

			const jsonResult = await result.json();
			setPokeNames(jsonResult.results.map((item) => item.name));
			setNextUrl(jsonResult.next);
			setPrevUrl(jsonResult.previous);
		})(); //defines function, immediately calls -> "iffy"
	}, [currUrl]);

	const body =
		searchParam === "" ? (
			<div>
				<div style={myStyle}>
					{pokeNames.map((x, i) => (
						<PokeDisplay
							onClick={(name) => {
								setsearchParam(name);
							}}
							pokemonName={x}
							key={i}
						/>
					))}
				</div>
				<input
					type="button"
					value="Previous"
					onClick={() => {
						setCurrUrl(prevUrl);
					}}
				/>
				<input
					type="button"
					value="Next"
					onClick={() => {
						setCurrUrl(nextUrl);
					}}
				/>
			</div>
		) : (
			<PokeDisplay
				detailed
				pokemonName={searchParam}
				onClick={() => {}}
			/>
		);

	return (
		<div>
			<SearchPoke
				searchParam={searchParam}
				setsearchParam={setsearchParam}
			/>
			{body}
		</div>
	);
};

const myStyle = {
	display: "grid",
	gridTemplateColumns: "repeat(auto-fill, 300px)",
	gap: "5px",
};

export default SearchPage;
