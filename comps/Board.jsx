import React from 'react'
import Square from './Square'
import produce from 'immer'

class Board extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            board: setUpBoard(this.props.boardStr),
            sel: {
                piece: null,
                p: null,
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
                        p={{x: i, y: j}}
                        color={this.state.board[i][j].color}
                        piece={this.state.board[i][j].piece}
                        sel={this.state.board[i][j].sel}
                        handleClick={this.handleClick}
                    />
                )
            }
            all.unshift(row);
            //if(this.props.turn === "b") all = all.reverse();
        }
        return all;
    }

    render() {
        return this.renderSquares();
    }

    handleClick = (p, piece) => {
        let board = setUpBoard(toString(this.state.board));
        if(piece && piece[1] === this.props.turn) {
            this.captureOrSel(board, p, piece);
        } else {
            this.moveOrUnsel(board, p)
        }
    }

    movePiece(board, p) {
        let temp = board[p.x][p.y].piece;
        board[p.x][p.y].piece = "";
        board[this.state.sel.p.x][this.state.sel.p.y].piece = "";
        board[p.x][p.y].piece += this.state.sel.piece;
        removeEnpassant(board);
        this.handleEnpassant(board, p, temp);
    }

    captureOrSel(board, p, piece) {
        if(this.state.sel.piece && this.state.board[p.x][p.y].sel) {
            this.movePiece(board, p);
            this.props.handleClick(toString(board));
        } else {
            let possible = getPossible(board, p);
            possible.forEach((ps) => {
                board[ps.x][ps.y].sel = true;
            })
            this.setState({
                board: board,
                sel: {piece: piece, p: p},
            })
        }
    }

    moveOrUnsel(board, p) {
        if(this.state.board[p.x][p.y].sel){
            this.movePiece(board, p);
            this.props.handleClick(toString(board));
        } else {
            this.setState({
                board: board,
                sel: {piece: null, p: null},
            });
        }
    }

    handleEnpassant(board, p, piece) {
        if(board[p.x][p.y].piece[0] === "p") {
            if(Math.abs(this.state.sel.p.x - p.x) % 2 === 0) {
                board[p.x][p.y].piece += "e";
            }
            let i = this.props.turn === "w"? -1 : 1;
            if(!piece && board[p.x + i][p.y].piece) {
                board[p.x + i][p.y].piece = "";
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
    let board = createArray(8,8);
    let piece = boardStr.split(";");
    let counter = 0;
    for(let i=0; i<8; i++) {
        for(let j=0; j<8; j++) {
            board[i][j] = {
                piece: piece[counter],
                color: (i + j)%2 === 0? "b" : "w",
                sel: false
            }
            counter++;
        }
    }
    return board;
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

function getPossible(board, p) {
    let string = board[p.x][p.y].piece;
    let piece = string[0];
    let color = string[1];

    switch(piece) {
        case "p": return pawn(board, p, color);
        case "r": return rook(board, p, color);
        case "n": return knight(board, p, color);
        case "b": return bishop(board, p, color);
        case "q": return queen(board, p, color);
        case "k": return king(board, p, color);
    }
}

function pawn(board, p, color) {
    let temp = [];
    if(color === "w") {
        if(!board[p.x + 1][p.y].piece) {
            temp.push({x: p.x + 1, y: p.y});
            if(p.x === 1 && !board[p.x + 2][p.y].piece) {
                temp.push({x: p.x + 2, y: p.y});
            }
        }
        if(board[p.x + 1][p.y + 1] 
            && board[p.x + 1][p.y + 1].piece
            && board[p.x + 1][p.y + 1].piece[1] != color) {
                temp.push({x: p.x + 1, y: p.y + 1});
        }
        if(board[p.x + 1][p.y - 1] 
            && board[p.x + 1][p.y - 1].piece 
            && board[p.x + 1][p.y - 1].piece[1] != color) {
                temp.push({x: p.x + 1, y: p.y - 1});
        }
        if(board[p.x][p.y + 1]
            && board[p.x][p.y + 1].piece
            && board[p.x][p.y + 1].piece[2] === "e") {
                temp.push({x: p.x + 1, y: p.y + 1})
        }
        if(board[p.x][p.y - 1]
            && board[p.x][p.y - 1].piece
            && board[p.x][p.y - 1].piece[2] === "e") {
                temp.push({x: p.x + 1, y: p.y - 1})
        }
    } else {
        if(!board[p.x - 1][p.y].piece) {
            temp.push({x: p.x - 1, y: p.y});
            if(p.x === 6 && !board[p.x - 2][p.y].piece) {
                temp.push({x: p.x - 2, y: p.y});
            }
        }
        if(board[p.x - 1][p.y - 1]
            && board[p.x - 1][p.y - 1].piece
            && board[p.x - 1][p.y - 1].piece[1] != color) {
                temp.push({x: p.x - 1, y: p.y - 1});
        }
        if(board[p.x - 1][p.y + 1]
            && board[p.x - 1][p.y + 1].piece
            && board[p.x - 1][p.y + 1].piece[1] != color) {
                temp.push({x: p.x - 1, y: p.y + 1});
        }
        if(board[p.x][p.y + 1]
            && board[p.x][p.y + 1].piece
            && board[p.x][p.y + 1].piece[2] === "e") {
                temp.push({x: p.x - 1, y: p.y + 1})
        }
        if(board[p.x][p.y - 1]
            && board[p.x][p.y - 1].piece
            && board[p.x][p.y - 1].piece[2] === "e") {
                temp.push({x: p.x - 1, y: p.y - 1})
        }
    }
    return temp;
}

function knight(board, p, color) {
    let temp = [];
    temp.push({x: p.x + 2, y: p.y + 1});
    temp.push({x: p.x + 2, y: p.y - 1});
    temp.push({x: p.x + 1, y: p.y + 2});
    temp.push({x: p.x + 1, y: p.y - 2});
    temp.push({x: p.x - 1, y: p.y + 2});
    temp.push({x: p.x - 1, y: p.y - 2});
    temp.push({x: p.x - 2, y: p.y + 1});
    temp.push({x: p.x - 2, y: p.y - 1});
    return removeIlligal(removeOutside(temp), board, color)
}

function rook(board, p, color) {
    let temp = [];
    for(let i=p.x+1; i<8; i++) {
        if(board[i][p.y].piece) {
            if(board[i][p.y].piece[1] != color) {
                temp.push({x: i, y: p.y});
            }
            break;
        }
        temp.push({x: i, y: p.y});
    }
    for(let i=p.x-1; i>=0; i--) {
        if(board[i][p.y].piece) {
            if(board[i][p.y].piece[1] != color) {
                temp.push({x: i, y: p.y});
            }
            break;
        }
        temp.push({x: i, y: p.y});
    }
    for(let i=p.y+1; i<8; i++) {
        if(board[p.x][i].piece) {
            if(board[p.x][i].piece[1] != color) {
                temp.push({x: p.x, y: i});
            }
            break;
        }
        temp.push({x: p.x, y: i});
    }
    for(let i=p.y-1; i>=0; i--) {
        if(board[p.x][i].piece) {
            if(board[p.x][i].piece[1] != color) {
                temp.push({x: p.x, y: i});
            }
            break;
        }
        temp.push({x: p.x, y: i});
    }
    return temp;
}

function bishop(board, p, color) {
    let temp = [];
    for(let i=1; i<8-Math.max(p.x,p.y); i++) {
        if(board[p.x + i][p.y + i].piece) {
            if(board[p.x + i][p.y + i].piece[1] != color) {
                temp.push({x: p.x + i, y: p.y + i});
            }
            break;
        }
        temp.push({x: p.x + i, y: p.y + i});
    }
    for(let i=1; i<Math.min(p.x + 1, 8 - p.y); i++) {
        if(board[p.x - i][p.y + i].piece) {
            if(board[p.x - i][p.y + i].piece[1] != color) {
                temp.push({x: p.x - i, y: p.y + i});
            }
            break;
        }
        temp.push({x: p.x - i, y: p.y + i});
    }
    for(let i=1; i<Math.min(p.x,p.y) + 1; i++) {
        if(board[p.x - i][p.y - i].piece) {
            if(board[p.x - i][p.y - i].piece[1] != color) {
                temp.push({x: p.x - i, y: p.y - i});
            }
            break;
        }
        temp.push({x: p.x - i, y: p.y - i});
    }
    for(let i=1; i<Math.min(8 - p.x, p.y + 1); i++) {
        if(board[p.x + i][p.y - i].piece) {
            if(board[p.x + i][p.y - i].piece[1] != color) {
                temp.push({x: p.x + i, y: p.y - i});
            }
            break;
        }
        temp.push({x: p.x + i, y: p.y - i});
    }
    return temp;
}

function queen(board, p, color) {
    return rook(board, p, color).concat(bishop(board, p, color));
}

function king(board, p, color) {
    let temp = [];
    temp.push({x: p.x + 1, y: p.y + 1});
    temp.push({x: p.x, y: p.y + 1});
    temp.push({x: p.x - 1, y: p.y + 1});
    temp.push({x: p.x + 1, y: p.y});
    temp.push({x: p.x + 1, y: p.y - 1});
    temp.push({x: p.x, y: p.y - 1});
    temp.push({x: p.x - 1, y: p.y});
    temp.push({x: p.x - 1, y: p.y - 1});
    temp = removeIlligal(removeOutside(temp), board, color);

    let final = []

    temp.forEach((pos) => {
        if(!isCheck(moveKing(board, p, pos), color)) {
            final.push(pos);
        }
    })

    /*
    let toRemove = getEnemyPossible(board, color);
    let final = [];
    loop1:
    for(let i=0; i<temp.length; i++) {
        for(let j=0; j<toRemove.length; j++) {
            if(temp[i].x === toRemove[j].x && temp[i].y === toRemove[j].y) {
                continue loop1;
            }
        }
        final.push(temp[i]);
    }
    */

    return final;
}

function isCheck(board, color) {
    let possible = [];
    for(let i=0; i<8; i++) {
        for(let j=0; j<8; j++) {
            if(board[i][j].piece && board[i][j].piece[1] != color && board[i][j].piece[0] != "k") {
                possible = possible.concat(getPossible(board, {x: i, y: j}));
            }
        }
    }
    console.log(possible)
    let is = false
    possible.forEach((pos) => {
        if(board[pos.x][pos.y].piece[1] === color && board[pos.x][pos.y].piece[0] === "k") is = true;
    })
    console.log(is)
    return is;
}

function moveKing(board, from, to) {
    return produce(board, draft => {
        draft[to.x][to.y].piece = draft[from.x][from.y].piece
        draft[from.x][from.y].piece = ""
    })
}

function removeOutside(array) {
    let temp = [];
    array.forEach((p) => {
        if(p.x < 8 && p.x >= 0 && p.y < 8 && p.y >= 0) {
            temp.push(p);
        }
    })
    return temp
}

function removeIlligal(array, board, color) {
    let final = [];
    array.forEach((p) => {
        if(!board[p.x][p.y].piece || board[p.x][p.y].piece[1] != color) {
            final.push(p);
        }
    })
    return final
}

export default Board;