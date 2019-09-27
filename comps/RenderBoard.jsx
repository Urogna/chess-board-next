import React from 'react'
import RenderSquare from './RenderSquare'

class RenderBoard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            board: this.props.squares
        }
    }
    setUpSquare() {
        let all = [];
        for(let i = 0; i < 8; i++) {
            let row = [];
            for(let j = 0; j < 8; j++) {
                row.push(
                    <RenderSquare
                        square={this.props.squares[i][j]}
                        handleClick={this.handleClick}
                    />
                )
            }
            all.unshift(row);
        }
        return all;
    }

    render() {
        return this.setUpSquare();
    }

    handleClick = (piece) => {
        let selected = piece.possibleSquares();
        let board = this.state.board;
        selected.forEach((square) => {
            board[square.x][square.y].setColor("g");
        });
        this.setState({board: board})
    }
}

export default RenderBoard;