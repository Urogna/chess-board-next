import {Square} from './Square';

export function King(square, color) {
    this.name = "king";
    this.square = square;
    this.color = color;
    this.value = Infinity;
    this.string = "K";
    this.moved = false;

    this.possibleSquares = () => {
        let squares;
        squares.push(this.square.r);
        squares.push(this.square.u);
        squares.push(this.square.d);
        squares.push(this.square.l);
        if(this.square.u) {
            squares.push(this.square.u.r);
            squares.push(this.square.u.l);
        } 
        if(this.square.d) {
            squares.push(this.square.d.r);
            squares.push(this.square.d.l);
        }
        
        let final = removeIlligal(squares, this.color);
        return final;
    }
}

export function Pawn(square, color) {
    this.name = "pawn";
    this.square = square;
    this.color = color;
    this.value = 1;
    this.string = "";
    this.moved = false;
    this.protected = false;

    this.possibleSquares = () => {
        let squares;
        if(this.color = "w") {
            squares.push(this.square.u);
            if(this.square.u) {
                if(!this.moved && !this.square.u.piece) {
                    squares.push(this.square.u.u);
                }
                if(this.square.u.r && this.square.u.r.piece && this.square.u.r.piece.color != this.color
                    /*|| square.r.piece === doubleJump*/) {
                    squares.push(this.square.u.r);
                }
                if(this.square.u.l && this.square.u.l.piece && this.square.u.l.piece.color != this.color) {
                    squares.push(this.square.u.l);
                }
            }
        } else {
            squares.push(this.square.d);
            if(this.square.d) {
                if(!this.moved && !this.square.d.piece) {
                    squares.push(this.square.d.d);
                }
                if(this.square.d.r && this.square.d.r.piece && this.square.d.r.piece.color != this.color
                    /*|| square.r.piece === doubleJump*/) {
                    squares.push(this.square.d.r);
                }
                if(this.square.d.l && this.square.d.l.piece && this.square.d.l.piece.color != this.color) {
                    squares.push(this.square.d.l);
                }
            }
        }
        
        let final = removeIlligal(squares, this.color);
        return final;
    }
}

export function Rook(square, color) {
    this.name = "rook";
    this.square = square;
    this.color = color;
    this.value = 5;
    this.string = "R";
    this.moved = false;

    this.possibleSquares = () => {
        return removeIlligal(straight(this.square), this.color);
    }
}

export function Bishop(square, color) {
    this.name = "bishop";
    this.square = square;
    this.color = color;
    this.value = 3;
    this.string = "B";

    this.possibleSquares = () => {
        return removeIlligal(diagonal(this.square), this.color);
    }
}

export function Knight(square, color) {
    this.name = "knight";
    this.square = square;
    this.color = color;
    this.value = 3;
    this.string = "N";

    this.possibleSquares = () => {
        let squares;
        
        if(this.square.u && this.square.u.u) {
            squares.push(this.square.u.u.l);
            squares.push(this.square.u.u.r);
        }
        if(this.square.l && this.square.l.l) {
            squares.push(this.square.l.l.u);
            squares.push(this.square.l.l.d);
        }
        if(this.square.d && this.square.d.d) {
            squares.push(this.square.d.d.l);
            squares.push(this.square.d.d.r);
        }
        if(this.square.r && this.square.r.r) {
            squares.push(this.square.r.r.d);
            squares.push(this.square.r.r.u);
        }
        
        return removeIlligal(squares, this.color);
    }
}

export function Queen(square, color) {
    this.name = "queen";
    this.square = square;
    this.color = color;
    this.value = 9;
    this.string = "Q";

    this.possibleSquares = () => {
        let squares = straight(this.square);
        squares.concat(diagonal(this.square));

        return removeIlligal(squares, this.color);
    }
}

function straight(square) {
    let temp = square.r;
    let squares;
    while(temp) {
        squares.push(temp);
        if(temp.piece) break;
        temp = temp.r;
    }
    temp = square.l;
    while(temp) {
        squares.push(temp);
        if(temp.piece) break;
        temp = temp.l;
    }
    temp = square.u;
    while(temp) {
        squares.push(temp);
        if(temp.piece) break;
        temp = temp.u;
    }
    temp = square.d;
    while(temp) {
        squares.push(temp);
        if(temp.piece) break;
        temp = temp.d;
    }
    return squares;
}

function diagonal(square) {
    let squares;
    let temp = square.r;
    while(temp) {
        temp = temp.u;
        squares.push(temp);
        if(temp) {
            if(temp.piece) break;
            temp = temp.r;
        }
    }
    temp = square.l;
    while(temp) {
        temp = temp.d
        squares.push(temp);
        if(temp) {
            if(temp.piece) break;
            temp = temp.l;
        }
    }
    temp = square.l;
    while(temp) {
        temp = temp.u
        squares.push(temp);
        if(temp) {
            if(temp.piece) break;
            temp = temp.l;
        }
    }
    temp = square.r;
    while(temp) {
        temp = temp.d;
        squares.push(temp);
        if(temp) {
            if(temp.piece) break;
            temp = temp.r;
        }
    }
    return squares;
}

function removeIlligal(squares, color) {
    let final;

    squares.forEach(square => {
        if(square) {
            if(!square.piece) {
                final.push(square);
            }else if(square.piece.color != color) {
                final.push(square);
            }
        }
    });
    return final;
}