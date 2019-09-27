import {Pawn, King, Queen, Bishop, Knight, Rook} from './Piece';
import Square from './Square'

function Board() {
    
    this.root = new Square("a1", "b");
    
    this.switchColor = (color) => {
        if(color === "w") {
            return "b";
        } else {
            return "w";
        }
    }
    

    this.createCol = (square, column, color) => {
        for(let i = 2; i<=8; i++) {
            //console.log(node.name);
            color = this.switchColor(color);
            square.u = new Square(column + i, color);
            square.u.d = square;
            square = square.u;
        }
    }
    
    this.createRow = (left, right) => {
        let tempRoot = right;
        while(left.u) {
            left.u.r = right.u;
            right.u.l = left.u;
            left = left.u;
            right = right.u;
        }
        if(tempRoot.r) {
            this.createRow(tempRoot, tempRoot.r);
        }
    }
    
    
    this.setPieces = (square) => {
        let root = square;
        square.add(new Rook(square, "w"));
        square.r.add(new Knight(square.r, "w"));
        square.r.r.add(new Bishop(square.r.r, "w"));
        square.r.r.r.add(new Queen(square.r.r.r, "w"));
        square.r.r.r.r.add(new King(square.r.r.r.r, "w"));
        square.r.r.r.r.r.add(new Bishop(square.r.r.r.r.r, "w"));
        square.r.r.r.r.r.r.add(new Knight(square.r.r.r.r.r.r, "w"));
        square.r.r.r.r.r.r.r.add(new Rook(square.r.r.r.r.r.r.r, "w"));
        square = square.u;
        while(square) {
            square.add(new Pawn(square, "w"));
            square = square.r;
        }
        square = root.u.u.u.u.u.u.u;
        square.add(new Rook(square, "b"));
        square.r.add(new Knight(square.r, "b"));
        square.r.r.add(new Bishop(square.r.r, "b"));
        square.r.r.r.add(new Queen(square.r.r.r, "b"));
        square.r.r.r.r.add(new King(square.r.r.r.r, "b"));
        square.r.r.r.r.r.add(new Bishop(square.r.r.r.r.r, "b"));
        square.r.r.r.r.r.r.add(new Knight(square.r.r.r.r.r.r, "b"));
        square.r.r.r.r.r.r.r.add(new Rook(square.r.r.r.r.r.r.r, "b"));
        square = square.d;
        while(square) {
            square.add(new Pawn(square, "b"));
            square = square.r;
        }
    }

    this.setGrid = () => {
        let s1 = this.root;
        let s2 = this.root;
        let grid = createArray(8, 8);
        let i = 0;
        while(s1) {
            let j = 0;
            while(s2) {
                grid[i][j] = s2;
                s2.setPosition(i, j);
                s2 = s2.r;
                j++;
            }
            i++;
            s1 = s1.u;
            s2 = s1;
        }
        return grid;
    }

    let tempRoot = this.root;
    this.createCol(tempRoot, "a", "b");
    tempRoot.r = new Square("b1", "w");
    tempRoot = tempRoot.r;
    this.createCol(tempRoot, "b", "w");
    tempRoot.r = new Square("c1", "b");
    tempRoot = tempRoot.r;
    this.createCol(tempRoot, "c", "b");
    tempRoot.r = new Square("d1", "w");
    tempRoot = tempRoot.r;
    this.createCol(tempRoot, "d", "w");
    tempRoot.r = new Square("e1", "b");
    tempRoot = tempRoot.r;
    this.createCol(tempRoot, "e", "b");
    tempRoot.r = new Square("f1", "w");
    tempRoot = tempRoot.r;
    this.createCol(tempRoot, "f", "w");
    tempRoot.r = new Square("g1", "b");
    tempRoot = tempRoot.r;
    this.createCol(tempRoot, "g", "b");
    tempRoot.r = new Square("h1", "w");
    tempRoot = tempRoot.r;
    this.createCol(tempRoot, "h", "w");
    this.createRow(this.root, this.root.r);
    this.setPieces(this.root);
    this.grid = this.setGrid();
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


export default Board;