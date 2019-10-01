import React from 'react';
import Piece from './Piece'
import '../static/style.css';

class Square extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            sel: this.props.sel
        }
    }

    render() {
        return (
            <button className={this.props.color + "_square square"}
                    onClick={this.handleClick}>
                {this.renderSquare()}
            </button>
        )
    }

    handleClick = () => {
        //if(this.state.sel || this.props.piece) {
            this.props.handleClick(this.props.pos, this.props.piece);
        //}
    }

    renderPiece() {
        if(this.props.piece) {
            return (
                <Piece piece={this.props.piece}/>
            )
        } else return;
    }

    renderSquare() {
        if(this.state.sel) {
            return(
                <div className="selection square">
                    {this.renderPiece()}
                </div>
            )
        } else {
            return this.renderPiece()
        }
    }

    componentWillReceiveProps(newProps) {
        this.setState({sel: newProps.sel})
    }
}

export default Square;