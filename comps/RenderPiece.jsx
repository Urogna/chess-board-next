import React from 'react';
import '../static/style.css';

class RenderPiece extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: getPieceName(this.props.piece),
            color: this.props.piece[1],
        }
    }

    render() {
        return (
            <img src={require("../sprites/" + this.state.color + "_" + this.state.name + ".png")}/>
        )
    }
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

export default RenderPiece;