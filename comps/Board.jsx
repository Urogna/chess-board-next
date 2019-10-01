import React from 'react'
import Square from './Square'

class Board extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            board: setUpBoard(null), //eventually instead of null => this.props.boardStr
            turn: "w",
            sel: {
                piece: null,
                pos: null
            }
        }
    }

    renderSquares() {
        let string = "abcdefgh";
        let all = [];
        for(let i = 0; i < 8; i++) {
            let row = [];
            for(let j = 0; j < 8; j++) {
                row.push(
                    <Square
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

    handleClick = (pos, piece) => {
        let board = setUpBoard(toString(this.state.board));
        if(piece) {
            let possible = getPossible(board, pos);
            possible.forEach((poss) => {
                board[poss.x][poss.y].color = "sel";
            })
            this.setState({board: board, sel: {piece: piece, pos: pos}})
        } else {
            board[pos.x][pos.y].piece = this.state.sel.piece;
            board[this.state.sel.pos.x][this.state.sel.pos.y].piece = "";
            this.setState({board: board, sel: {piece: null, pos: null}});
        }
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
        boardStr = "rw;nw;bw;qw;kw;bw;nw;rw;pw;pw;pw;pw;pw;pw;pw;pw;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;pb;pb;pb;pb;pb;pb;pb;pb;rb;nb;bb;qb;kb;bb;nb;rb;";
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

export default Board;