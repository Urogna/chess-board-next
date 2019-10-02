import React from 'react';
import Board from './Board';
import '../static/style.css'

class Game extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            boardStr: null,
            turn: "w",
            key: 0
        }
    }

    render() {
        return (
            <Board
                key={this.state.key}
                className="board"
                boardStr={this.state.boardStr}
                turn={this.state.turn}
                handleClick={this.handleClick}
            />
        )
    }

    handleClick = (boardStr) => {
        this.setState({
            boardStr: boardStr,
            turn: this.state.turn === "b"? "w" : "b",
            key: (this.state.key + 1)
        })
    }
}

export default Game;