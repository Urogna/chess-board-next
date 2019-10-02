import React from 'react'
import Square from './Square'

class Board extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            board: setUpBoard(this.props.boardStr),
            sel: {
                piece: null,
                pos: null,
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
                        sel={this.state.board[i][j].sel}
                        handleClick={this.handleClick}
                    />
                )
            }
            this.props.turn === "w"? all.unshift(row) : all.push(row);
        }
        return all;
    }

    render() {
        return this.renderSquares();
    }

    handleClick = (pos, piece) => {
        let board = setUpBoard(toString(this.state.board));
        if(piece && piece[1] === this.props.turn) {
            this.captureOrSel(board, pos, piece);
        } else {
            this.moveOrUnsel(board, pos)
        }
    }

    movePiece(board, pos) {
        let temp = board[pos.x][pos.y].piece;
        board[pos.x][pos.y].piece = "";
        board[this.state.sel.pos.x][this.state.sel.pos.y].piece = "";
        board[pos.x][pos.y].piece += this.state.sel.piece;
        removeEnpassant(board);
        this.handleEnpassant(board, pos, temp);
    }

    captureOrSel(board, pos, piece) {
        if(this.state.sel.piece && this.state.board[pos.x][pos.y].sel) {
            this.movePiece(board, pos);
            this.props.handleClick(toString(board));
        } else {
            let possible = getPossible(board, pos);
            possible.forEach((poss) => {
                board[poss.x][poss.y].sel = true;
            })
            this.setState({
                board: board,
                sel: {piece: piece, pos: pos},
            })
        }
    }

    moveOrUnsel(board, pos) {
        if(this.state.board[pos.x][pos.y].sel){
            this.movePiece(board, pos);
            this.props.handleClick(toString(board));
        } else {
            this.setState({
                board: board,
                sel: {piece: null, pos: null},
            });
        }
    }

    handleEnpassant(board, pos, piece) {
        if(board[pos.x][pos.y].piece[0] === "p") {
            if(Math.abs(this.state.sel.pos.x - pos.x) % 2 === 0) {
                board[pos.x][pos.y].piece += "e";
            }
            let i = this.props.turn === "w"? -1 : 1;
            if(!piece && board[pos.x + i][pos.y].piece) {
                board[pos.x + i][pos.y].piece = "";
            }
        }   
    }
}

function removeEnpassant(board) {
    for(let i=0; i<8; i++) {
        for(let j=0; j<8; j++) {
            if(board[i][j].piece.length === 3) {
                board[i][j].piece = board[i][j].piece.slice(0, -1);
            }
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
                color: (i + j)%2 === 0? "b" : "w",
                sel: false
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
    let temp = [];
    if(color === "w") {
        if(!board[pos.x + 1][pos.y].piece) {
            temp.push({x: pos.x + 1, y: pos.y});
            if(pos.x === 1 && !board[pos.x + 2][pos.y].piece) {
                temp.push({x: pos.x + 2, y: pos.y});
            }
        }
        if(board[pos.x + 1][pos.y + 1] &&
            board[pos.x + 1][pos.y + 1].piece &&
            board[pos.x + 1][pos.y + 1].piece[1] != color) {
                temp.push({x: pos.x + 1, y: pos.y + 1});
        }
        if(board[pos.x + 1][pos.y - 1] &&
            board[pos.x + 1][pos.y - 1].piece &&
            board[pos.x + 1][pos.y - 1].piece[1] != color) {
                temp.push({x: pos.x + 1, y: pos.y - 1});
        }
        if(board[pos.x][pos.y + 1] &&
            board[pos.x][pos.y + 1].piece &&
            board[pos.x][pos.y + 1].piece[2] === "e") {
                temp.push({x: pos.x + 1, y: pos.y + 1})
        }
        if(board[pos.x][pos.y - 1] &&
            board[pos.x][pos.y - 1].piece &&
            board[pos.x][pos.y - 1].piece[2] === "e") {
                temp.push({x: pos.x + 1, y: pos.y - 1})
        }
    } else {
        if(!board[pos.x - 1][pos.y].piece) {
            temp.push({x: pos.x - 1, y: pos.y});
            if(pos.x === 6 && !board[pos.x - 2][pos.y].piece) {
                temp.push({x: pos.x - 2, y: pos.y});
            }
        }
        if(board[pos.x - 1][pos.y - 1] &&
            board[pos.x - 1][pos.y - 1].piece &&
            board[pos.x - 1][pos.y - 1].piece[1] != color) {
                temp.push({x: pos.x - 1, y: pos.y - 1});
        }
        if(board[pos.x - 1][pos.y + 1] &&
            board[pos.x - 1][pos.y + 1].piece &&
            board[pos.x - 1][pos.y + 1].piece[1] != color) {
                temp.push({x: pos.x - 1, y: pos.y + 1});
        }
        if(board[pos.x][pos.y + 1] &&
            board[pos.x][pos.y + 1].piece &&
            board[pos.x][pos.y + 1].piece[2] === "e") {
                temp.push({x: pos.x - 1, y: pos.y + 1})
        }
        if(board[pos.x][pos.y - 1] &&
            board[pos.x][pos.y - 1].piece &&
            board[pos.x][pos.y - 1].piece[2] === "e") {
                temp.push({x: pos.x - 1, y: pos.y - 1})
        }
    }
    return temp;
}

function knight(board, pos, color) {
    let temp = [];
    temp.push({x: pos.x + 2, y: pos.y + 1});
    temp.push({x: pos.x + 2, y: pos.y - 1});
    temp.push({x: pos.x + 1, y: pos.y + 2});
    temp.push({x: pos.x + 1, y: pos.y - 2});
    temp.push({x: pos.x - 1, y: pos.y + 2});
    temp.push({x: pos.x - 1, y: pos.y - 2});
    temp.push({x: pos.x - 2, y: pos.y + 1});
    temp.push({x: pos.x - 2, y: pos.y - 1});
    temp = removeIlligal(temp, board, color);
    return temp
}

function rook(board, pos, color) {
    let temp = [];
    for(let i=pos.x+1; i<8; i++) {
        if(board[i][pos.y].piece) {
            if(board[i][pos.y].piece[1] != color) {
                temp.push({x: i, y: pos.y});
                break;
            } else if(board[i][pos.y].piece[1] === color) break;
        }
        temp.push({x: i, y: pos.y});
    }
    for(let i=pos.x-1; i>=0; i--) {
        if(board[i][pos.y].piece) {
            if(board[i][pos.y].piece[1] != color) {
                temp.push({x: i, y: pos.y});
                break;
            } else if(board[i][pos.y].piece[1] === color) break;
        }
        temp.push({x: i, y: pos.y});
    }
    for(let i=pos.y+1; i<8; i++) {
        if(board[pos.x][i].piece) {
            if(board[pos.x][i].piece[1] != color) {
                temp.push({x: pos.x, y: i});
                break;
            } else if(board[pos.x][i].piece[1] === color) break;
        }
        temp.push({x: pos.x, y: i});
    }
    for(let i=pos.y-1; i>=0; i--) {
        if(board[pos.x][i].piece) {
            if(board[pos.x][i].piece[1] != color) {
                temp.push({x: pos.x, y: i});
                break;
            } else if(board[pos.x][i].piece[1] === color) break;
        }
        temp.push({x: pos.x, y: i});
    }
    return temp;
}

function bishop(board, pos, color) {
    let temp = [];
    for(let i=1; i<8-Math.max(pos.x,pos.y); i++) {
        if(board[pos.x + i][pos.y + i].piece) {
            if(board[pos.x + i][pos.y + i].piece[1] != color) {
                temp.push({x: pos.x + i, y: pos.y + i});
                break;
            } else if(board[pos.x + i][pos.y + i].piece[1] === color) break;
        }
        temp.push({x: pos.x + i, y: pos.y + i});
    }
    for(let i=1; i<Math.min(pos.x + 1, 8 - pos.y); i++) {
        if(board[pos.x - i][pos.y + i].piece) {
            if(board[pos.x - i][pos.y + i].piece[1] != color) {
                temp.push({x: pos.x - i, y: pos.y + i});
                break;
            } else if(board[pos.x - i][pos.y + i].piece[1] === color) break;
        }
        temp.push({x: pos.x - i, y: pos.y + i});
    }
    for(let i=1; i<Math.min(pos.x,pos.y) + 1; i++) {
        if(board[pos.x - i][pos.y - i].piece) {
            if(board[pos.x - i][pos.y - i].piece[1] != color) {
                temp.push({x: pos.x - i, y: pos.y - i});
                break;
            } else if(board[pos.x - i][pos.y - i].piece[1] === color) break;
        }
        temp.push({x: pos.x - i, y: pos.y - i});
    }
    for(let i=1; i<Math.min(8 - pos.x, pos.y + 1); i++) {
        if(board[pos.x + i][pos.y - i].piece) {
            if(board[pos.x + i][pos.y - i].piece[1] != color) {
                temp.push({x: pos.x + i, y: pos.y - i});
                break;
            } else if(board[pos.x + i][pos.y - i].piece[1] === color) break;
        }
        temp.push({x: pos.x + i, y: pos.y - i});
    }
    return temp;
}

function queen(board, pos, color) {
    return rook(board, pos, color).concat(bishop(board, pos, color));
}

function king(board, pos, color) {
    let temp = [];
    temp.push({x: pos.x + 1, y: pos.y + 1});
    temp.push({x: pos.x, y: pos.y + 1});
    temp.push({x: pos.x - 1, y: pos.y + 1});
    temp.push({x: pos.x + 1, y: pos.y});
    temp.push({x: pos.x + 1, y: pos.y - 1});
    temp.push({x: pos.x, y: pos.y - 1});
    temp.push({x: pos.x - 1, y: pos.y});
    temp.push({x: pos.x - 1, y: pos.y - 1});
    temp = removeIlligal(temp, board, color);
    return temp;
}

function removeOutside(array) {
    let temp = [];
    array.forEach((pos) => {
        if(pos.x < 8 && pos.x >= 0 && pos.y < 8 && pos.y >= 0) {
            temp.push(pos);
        }
    })
    return temp
}

function removeIlligal(array, board, color) {
    let temp = removeOutside(array);
    let final = [];
    temp.forEach((pos) => {
        if(!board[pos.x][pos.y].piece || board[pos.x][pos.y].piece[1] != color) {
            final.push(pos);
        }
    })
    return final
}

export default Board;