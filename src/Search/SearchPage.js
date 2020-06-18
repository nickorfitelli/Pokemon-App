import React, { useState, useEffect } from "react";
import PokeDisplay from "./../Components/PokeDisplay";
import SearchPoke from "./SearchPoke";

// {
// 	nextPage:
// 	prevPage:
// 	currUrl:
// 	textToSearch:
// 	typeToSearch:
// }


const SearchPage = ({searchParam, setsearchParam}) => {
	//get list of all pokemon
	const [currUrl, setCurrUrl] = useState("https://pokeapi.co/api/v2/pokemon");
	const [nextUrl, setNextUrl] = useState(null);
	const [prevUrl, setPrevUrl] = useState(null);
	const [pokeNames, setPokeNames] = useState([]);

	useEffect(() => {
		(async () => {
			//Fetch API data
			if(searchParam.currUrl ){

			}
			const result = await fetch('https://pokeapi.co/api/v2/pokemon');

			if (!result.ok) {
				return;
			}

			const jsonResult = await result.json();
			setPokeNames(jsonResult.results.map((item) => item.name));
			setNextUrl(jsonResult.next);
			setPrevUrl(jsonResult.previous);
		})(); //defines function, immediately calls -> "iffy"
	}, [searchParam]);

	const body =
		searchParam === "" ? (
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
						onClick={() => {
							setCurrUrl(prevUrl);
						}}
					>
						Previous
					</div>
					<div
						className="button"
						value="Next"
						onClick={() => {
							setCurrUrl(nextUrl);
						}}
					>
						Next
					</div>
				</div>
			</div>
		) : (
			<PokeDisplay pokemonName={searchParam} />
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
