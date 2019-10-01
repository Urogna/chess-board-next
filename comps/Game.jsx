import React from 'react';
import Board from './Board';
import '../static/style.css'

class Game extends React.Component {

    render() {
        return (
            <Board
                className="board"
                handleClick={this.handleClick}
            />
        )
    }

    handleClick = () => {

    }
}

export default Game;