import React from 'react'
import Square from './Square'

class Board extends React.Component {
    setUpSquare() {
        let all;
        for(let i = 0; i < 8; i++) {
            let row;
            for(let j = 0; i < 8; j++) {
                rows.push(
                    <Square 
                        name={this.props.square[i][j].name}
                        piece={this.props.square[i][j].piece}
                        color={this.props.square[i][j].color}
                    />
                )
            }
            all.unshift(row);
        }
        return all;
    }
    render() {
        return setUpSquares();
    }
}