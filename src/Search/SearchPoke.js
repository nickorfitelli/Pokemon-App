import React from "react";

const SearchBar = ({
	setSearchText,
	setSearchMode,
	searchText,
	searchMode,
}) => {
	return (
		<div>
			<input
				placeholder="Type Pokemon here"
				type="text"
				value={searchText}
				onChange={(event) => {
					setSearchText(event.target.value);
				}}
			/>
			<select
				onChange={(event) => {
					setSearchMode(event.target.value);
				}}
				value={searchMode}
			>
				<option value="name">Name</option>
				<option value="type">Type</option>
			</select>
		</div>
	);
};

export default SearchBar;
