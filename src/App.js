import React, { useState } from "react";
import SearchPage from "./Search/SearchPage";
import TitleBar from "./Components/TitleBar";
import context from "./CollectionContext";
import CollectionPage from "./Collection/CollectionPage";
import DetailModal from "./Components/DetailModal";
import BattlePage from "./Battle/BattlePage";
import "./main.css";

function App() {
	const contextData = {};
	const [page, setPage] = useState("SearchPage");
	const [searchParam, setsearchParam] = useState("");
	contextData.collectionState = useState([]);
	contextData.modalState = useState("");

	return (
		<context.Provider value={contextData}>
			{contextData.modalState[0] !== "" ? (
				<DetailModal
					searchParam={searchParam}
					setsearchParam={setsearchParam}
					pokemonName={contextData.modalState[0]}
				/>
			) : null}
			<div style={contentStyle}>
				<TitleBar setPage={setPage} />
				{page === "SearchPage" ? (
					<SearchPage
						searchParam={searchParam}
						setsearchParam={setsearchParam}
					/>
				) : null}
				{page === "BattlePage" ? <BattlePage /> : null}
				{page === "CollectionPage" ? <CollectionPage /> : null}
			</div>
		</context.Provider>
	);
}

const contentStyle = {
	height: "100%",
};

export default App;
