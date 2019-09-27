import React from 'react';
//import {King, Queen, Bishop, Rook, Knight, Pawn} from '../helpers/Piece'
import '../static/style.css'

class RenderSquare extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            square: this.props.square,
        }
    }

    render() {
        return (
            <button className={this.state.square.color + "_square" + " square"}
                    onClick={() => {this.handleClicks()}}>
                {this.renderPiece(this.state.square.piece)}
            </button>
        )
    }

    handleClicks = () => {
        let piece = this.state.square.piece;
        let square = this.state.square;
        square.setColor("g");
        if(piece) {
            this.setState({square: square});
            this.props.handleClick(piece);
        }       
        
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