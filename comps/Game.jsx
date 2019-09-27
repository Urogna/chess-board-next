import React from 'react';
import RenderBoard from './RenderBoard';
import Board from '../helpers/Board';

class Game extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            board: new Board()
        }
    }
    render() {
        console.log(this.state.board.grid[0][0].name)
        return <RenderBoard squares={this.state.board.grid}/>
    }
}

export default Game;