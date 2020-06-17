import React, { useState } from "react";
import SearchPage from "./Search/SearchPage";
import TitleBar from "./Components/TitleBar";
import context from "./CollectionContext";
import CollectionPage from "./Collection/CollectionPage";
import DetailModal from "./DetailModal";

function App() {
	const contextData = {};
	const [page, setPage] = useState("SearchPage");
	contextData.collectionState = useState([]);
	contextData.modalState = useState("");

	return (
		<context.Provider value={contextData}>
			<div>
				<TitleBar setPage={setPage} />
				{contextData.modalState[0] !== "" ? (
					<DetailModal pokemonName={contextData.modalState[0]} />
				) : null}
				{page === "SearchPage" ? <SearchPage /> : null}
				{page === "BattlePage" ? <SearchPage /> : null}
				{page === "GroceryPage" ? <SearchPage /> : null}
				{page === "CollectionPage" ? <CollectionPage /> : null}
			</div>
		</context.Provider>
	);
}

export default App;
