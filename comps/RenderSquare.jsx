import React from 'react';
import '../static/style.css'

class RenderSquare extends React.Component {

    render() {
        return (
            <button className={this.props.color + "_square" + " square"}>
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