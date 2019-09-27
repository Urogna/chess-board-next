import React from 'react';

class RenderSquare extends React.Component {

    render() {
        return (
            <button className={this.color + "_square"}>
                {this.renderPiece(this.props.piece)}
            </button>
        )
    }

    renderPiece(piece) {
        if(piece) {
            return (
                <img src={require("../sprites/" + piece.color + "_" + piece.name + ".png")}/>
            )
        } else return null;
    }
}

export default RenderSquare;