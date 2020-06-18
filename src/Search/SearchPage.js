import React, { useState, useEffect } from "react";
import PokeDisplay from "./../Components/PokeDisplay";
import SearchPoke from "./SearchPoke";

const SearchPage = ({
	setSearchText,
	setSearchMode,
	searchText,
	searchMode,
}) => {
	//get list of all poke.mon
	const [currUrl, setCurrUrl] = useState("https://pokeapi.co/api/v2/pokemon");
	const [nextUrl, setNextUrl] = useState(null);
	const [prevUrl, setPrevUrl] = useState(null);

	const [pokeNames, setPokeNames] = useState([]);

	useEffect(() => {
		(async () => {
			//Fetch API data
			if (searchText === "") {
				const result = await fetch(currUrl);
				if (!result.ok) {
					return;
				}
				const jsonResult = await result.json();
				setPokeNames(jsonResult.results.map((item) => item.name));
				setNextUrl(jsonResult.next);
				setPrevUrl(jsonResult.previous);
			} else {
				if (searchMode === "name") {
					setPokeNames([searchText]);
				} else {
					const result = await fetch(
						`https://pokeapi.co/api/v2/type/${searchText}`
					);
					if (!result.ok) {
						return;
					}
					const jsonResult = await result.json();
					console.log(jsonResult.pokemon.map((item) => item.name));
					setPokeNames(
						jsonResult.pokemon.map((item) => item.pokemon.name)
					);
				}
				setNextUrl(null);
				setPrevUrl(null);
			}
		})(); //defines function, immediately calls -> "iffy"
	}, [searchText, searchMode, currUrl]);

	const body =
		pokeNames.length > 0 ? (
			<div>
				<div style={myStyle}>
					{pokeNames.map((x, i) => (
						<PokeDisplay
							pokemonName={x}
							key={i} //if you make an array in JSX you need to add a key
						/>
					))}
				</div>
				<div style={inputAreaStyle}>
					<div
						className="button"
						style={
							prevUrl === null
								? {cursor: "default" }
								: {}
						}
						onClick={() => {
							if (prevUrl !== null) {
								setCurrUrl(prevUrl);
							}
						}}
					>
						Previous
					</div>
					<div
						className="button"
						style={
							nextUrl === null
								? { cursor: "default" }
								: {}
						}
						onClick={() => {
							if (nextUrl !== null) {
								setCurrUrl(nextUrl);
							}
						}}
					>
						Next
					</div>
				</div>
			</div>
		) : null;

	return (
		<div>
			<SearchPoke
				setSearchText={setSearchText}
				setSearchMode={setSearchMode}
				searchText={searchText}
				searchMode={searchMode}
			/>
			{body}
		</div>
	);
};

const inputAreaStyle = {
	display: "grid",
	placeContent: "center",
	gridTemplateColumns: "200px 200px",
	gap: "10px",
};

const myStyle = {
	display: "grid",
	gridTemplateColumns: "repeat(auto-fill, 300px)",
	placeContent: "center",
	gap: "5px",
	padding: "5px",
};

export default SearchPage;
