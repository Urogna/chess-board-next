import React from 'react'
import RenderSquare from './RenderSquare'

class RenderBoard extends React.Component {
    setUpSquare() {
        let all = [];
        for(let i = 0; i < 8; i++) {
            let row = [];
            for(let j = 0; j < 8; j++) {
                console.log(i + "  " + j);
                row.push(
                    <RenderSquare
                        name={this.props.squares[i][j].name}
                        piece={this.props.squares[i][j].piece}
                        color={this.props.squares[i][j].color}
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
}

export default RenderBoard;