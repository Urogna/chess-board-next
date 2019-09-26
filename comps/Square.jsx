import React from 'react';

class Square extends React.Component {
    render() {
        return (
            <button>
                {this.renderPiece(this.props.piece)}
            </button>
        )
    }

    renderPiece(piece) {
        if(piece) {
            return (
                <img src={require("../sprites/" + piece.color + piece.name + ".png")}/>
            )
        } else return null;
    }
}