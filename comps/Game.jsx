import React from 'react';
import RenderBoard from './RenderBoard';
import '../static/style.css'

class Game extends React.Component {

    render() {
        return (
            <RenderBoard
                className="board"
                handleClick={this.handleClick}
            />
        )
    }

    handleClick = () => {

    }
}

export default Game;