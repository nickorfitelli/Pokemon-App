import React, { useState } from "react";
import PokeDisplay from "./../Components/PokeDisplay";

const SearchBar = ({ searchParam, setsearchParam }) => {

	const handleChange = (event) => {
		setsearchParam(event.target.value);
	};

	return (
		<div>
			<label>
				<input
					placeholder="Type Pokemon here"
					type="text"
					value={searchParam}
					onChange={handleChange}
				/>
			</label>
		</div>
	);
};

export default SearchBar;
