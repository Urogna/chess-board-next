import React from 'react';
import RenderBoard from './RenderBoard';
import Board from '../helpers/Board';
import '../static/style.css'

class Game extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            board: new Board(),
            selected: false
        }
    }
    render() {
        return (
            <RenderBoard
                className="board"
                squares={this.state.board.grid}
                handleClick={this.handleClick}
            />
        )
    }

    handleClick = () => {

    }
}

export default Game;