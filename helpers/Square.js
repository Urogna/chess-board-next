import {Pawn, King, Queen, Bishop, Knight, Rook} from './Piece';

export default function Square(name, color) {
    this.name = name;
    this.color = color;
    this.piece;
    this.u; this.d; this.r; this.l;

    this.add = (piece) => {
            this.piece = piece
    }

    this.remove = () => {
        if(!this.piece) alert("can't remove piece!");
        //this.removed.push(this.piece);
        this.piece = null;
    }
}