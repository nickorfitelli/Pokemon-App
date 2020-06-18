import React, { useState, useEffect, useContext } from "react";
import PokeDisplay from "./../Components/PokeDisplay";
import context from "../CollectionContext";

const CollectionPage = () => {
	const { collectionState } = useContext(context);
	const [collection, setCollection] = collectionState;

	return "searchParam" === "" ? (
		<div>
			<div style={myStyle}>
				{collection.map((x, i) => (
					<PokeDisplay
						onClick={(name) => {
							//setsearchParam(name);
						}}
						pokemonName={x}
						key={i}
					/>
				))}
			</div>
		</div>
	) : (
		<PokeDisplay detailed pokemonName={collection} onClick={() => {}} />
	);
};

const myStyle = {
	display: "grid",
	gridTemplateColumns: "repeat(auto-fill, 300px)",
	gap: "5px",
};

export default CollectionPage;
