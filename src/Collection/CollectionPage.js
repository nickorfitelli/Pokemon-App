import React, { useState, useEffect, useContext } from "react";
import PokeDisplay from "./../Components/PokeDisplay";
import context from "../CollectionContext";

const CollectionPage = () => {
	const { collectionState } = useContext(context);
	const [collection, setCollection] = collectionState;
	console.log(collection);

	let body =
		collection.length > 0 ? (
			<div style={myStyle}>
				{collection.map((x, i) => (
					<PokeDisplay pokemonName={x} key={i} />
				))}
			</div>
		) : (
			<div style={noPokemonStyle}>No Pokemon in your collection</div>
		);
	return <div >{body}</div>;
};

const myStyle = {
	display: "grid",
	gridTemplateColumns: "repeat(auto-fill, 300px)",
	gap: "5px",
};
const noPokemonStyle = {
	marginTop: "30px",
	fontSize: "xx-large",
	display: "grid",
	placeContent: "center"
};

export default CollectionPage;
