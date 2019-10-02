import React from 'react';
import '../static/style.css';

export default function Piece(props) {
    return (
        <img src={require("../sprites/" + props.piece[1] + "_" + getPieceName(props.piece) + ".png")}/>
    )
}

function getPieceName(string) {
    let name = string[0];
    switch(name) {
        case "p": return "pawn";
        case "r": return "rook";
        case "n": return "knight";
        case "b": return "bishop";
        case "q": return "queen";
        case "k": return "king";
    }
}