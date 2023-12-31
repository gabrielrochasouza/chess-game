import ChessPieceBishop from "./ChessPieceBishop";
import ChessPieceKing from "./ChessPieceKing";
import ChessPiecePawn from "./ChessPiecePawn";

type PieceType = ChessPiecePawn | ChessPieceBishop | ChessPieceKing;

export default class ChessPiece {
    constructor(l: number, c: number, color: 'white' | 'black', piece: PieceType){
        this.c = c;
        this.l = l;
        this.color = color;
        this.piece = piece;
    }
    l:number
    c:number
    color:string
    piece: PieceType;
}