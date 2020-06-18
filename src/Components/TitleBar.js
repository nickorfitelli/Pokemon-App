import React from "react";

const TitleBar = ({setPage}) => {
	return (<div style={myStyle}>
        <div style={{cursor: "pointer"}} onClick = {() => {
            setPage("SearchPage")
        }}>Pokedex</div>
        <div/>
        <div style={{cursor: "pointer"}} onClick = {() => {
            setPage("BattlePage")
        }}>Battle!</div>

        <div style={{cursor: "pointer"}} onClick = {() => {
            setPage("GroceryPage")
        }}>Grocery List</div>

        <div style={{cursor: "pointer"}} onClick = {() => {
            setPage("CollectionPage")
        }}>My Collection</div>

    </div>);
};

const myStyle = {
    backgroundColor: "grey",
    color: "white",
    display: "grid",
    gridTemplateColumns: "min-content auto min-content min-content min-content",
    placeItems: "center",
    padding: "10px",
    gap: "30px",
    whiteSpace: 'nowrap',
    fontSize: "xx-large",
}

export default TitleBar;
