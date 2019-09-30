import React from 'react';
import RenderPiece from './RenderPiece'
import '../static/style.css';

class RenderSquare extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            color: this.props.color
        }
    }

    render() {
        return (
            <button className={this.state.color + "_square" + " square"}
                    onClick={this.handleClicks}>
                {this.renderPiece()}
            </button>
        )
    }

    handleClicks = () => {
        if(this.props.piece) {
            this.props.handleClick(this.props.pos);
        }
    }

    renderPiece() {
        if(this.props.piece) {
            return (
                <RenderPiece piece={this.props.piece}/>
            )
        } else return null;
    }

    componentWillReceiveProps(newProps) {
        this.setState({color: newProps.color})
    }
}

export default RenderSquare;