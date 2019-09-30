import React from 'react'
import RenderSquare from './RenderSquare'

class RenderBoard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            board: setUpBoard(null),
            turn: "w"
        }
    }

    renderSquares() {
        let string = "abcdefgh";
        let all = [];
        for(let i = 0; i < 8; i++) {
            let row = [];
            for(let j = 0; j < 8; j++) {
                row.push(
                    <RenderSquare
                        tag={string[i] + (j + 1)}
                        pos={{x: i, y: j}}
                        color={this.state.board[i][j].color}
                        piece={this.state.board[i][j].piece}
                        handleClick={this.handleClick}
                    />
                )
            }
            all.unshift(row);
        }
        return all;
    }

    render() {
        return this.renderSquares();
    }

    handleClick = (pos) => {
        let board = setUpBoard(toString(this.state.board));
        let possible = getPossible(board, pos);
        //board[pos.x][pos.y].piece = "";
        possible.forEach((poss) => {
            board[poss.x][poss.y].color = "sel";
        })
        this.setState({board: board})
    }
}

function toString(board) {
    let string = "";
    for(let i=0; i<8; i++) {
        for(let j=0; j<8; j++) {
            string += board[i][j].piece;
            string += ";";
        }
    }
    return string;
}

function setUpBoard(boardStr) {
    if(!boardStr) {
        boardStr = "rw;nw;bw;qw;kw;bw;nw;rw;pw;pw;pw;pw;pw;pw;pw;pw;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;pb;pb;pb;pb;pb;pb;pb;pb;rb;nb;bb;qb;kb;bb;nb;rb";
    }
    let grid = createArray(8,8);
    let piece = boardStr.split(";");
    let counter = 0;
    for(let i=0; i<8; i++) {
        for(let j=0; j<8; j++) {
            grid[i][j] = {
                piece: piece[counter],
                color: (i + j)%2 === 0? "b" : "w"
            }
            counter++;
        }
    }
    return grid;
}

function createArray(length) {
    var arr = new Array(length || 0),
        i = length;

    if (arguments.length > 1) {
        var args = Array.prototype.slice.call(arguments, 1);
        while(i--) arr[length-1 - i] = createArray.apply(this, args);
    }

    return arr;
}

function getPossible(board, pos) {
    let string = board[pos.x][pos.y].piece;
    let piece = string[0];
    let color = string[1];

    switch(piece) {
        case "p": return pawn(board, pos, color);
        case "r": return rook(board, pos, color);
        case "n": return knight(board, pos, color);
        case "b": return bishop(board, pos, color);
        case "q": return queen(board, pos, color);
        case "k": return king(board, pos, color);
    }
}

function pawn(board, pos, color) {
    let possible = [];
    if(color === "w") {
        if(!board[pos.x + 1][pos.y].piece) {
            possible.push({x: pos.x + 1, y: pos.y});
            if(pos.x === 1 && !board[pos.x + 2][pos.y].piece) {
                possible.push({x: pos.x + 2, y: pos.y});
            }
        }
        if(board[pos.x + 1][pos.y + 1] &&
            board[pos.x + 1][pos.y + 1].piece &&
            board[pos.x + 1][pos.y + 1].piece[1] != color) {
                possible.push({x: pos.x + 1, y: pos.y + 1});
            }
        if(board[pos.x + 1][pos.y - 1] &&
            board[pos.x + 1][pos.y - 1].piece &&
            board[pos.x + 1][pos.y - 1].piece[1] != color) {
            possible.push({x: pos.x + 1, y: pos.y - 1});
        }
    } else {
        if(!board[pos.x - 1][pos.y].piece) {
            possible.push({x: pos.x - 1, y: pos.y});
            if(pos.x === 6 && !board[pos.x - 2][pos.y].piece) {
                possible.push({x: pos.x - 2, y: pos.y});
            }
        }
        if(board[pos.x - 1][pos.y - 1] &&
            board[pos.x - 1][pos.y - 1].piece &&
            board[pos.x - 1][pos.y - 1].piece[1] != color) {
                possible.push({x: pos.x - 1, y: pos.y - 1});
            }
        if(board[pos.x - 1][pos.y + 1] &&
            board[pos.x - 1][pos.y + 1].piece &&
            board[pos.x - 1][pos.y + 1].piece[1] != color) {
            possible.push({x: pos.x - 1, y: pos.y + 1});
        }
    }
    return possible;
}

export default RenderBoard;