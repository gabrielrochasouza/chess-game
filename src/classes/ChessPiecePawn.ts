import WhitePawn from "../assets/svg/white_pawn.svg";
import BlackPawn from "../assets/svg/black_pawn.svg";
import { chessBoardArrayType } from "./types";


export default class ChessPiecePawn {
    constructor(color: 'white' | 'black') {
        this.color = color;
        this.svgFile = color === 'white' ? WhitePawn : BlackPawn;
    }
    svgFile: string;
    color: 'white' | 'black'

    possibleMoves(chessBoard: chessBoardArrayType, l:number, c: number) {
        if(this.color === 'white') {
            (chessBoard[l + 1][c] && chessBoard[l + 1][c].currentPiece?.color) !== this.color && (chessBoard[l + 1][c].isPossibleToMove = true);
            (chessBoard[l + 1][c + 1] && chessBoard[l + 1][c + 1].currentPiece && chessBoard[l + 1][c + 1].currentPiece?.color !== this.color) && (chessBoard[l + 1][c + 1].isPossibleToMove = true);
            (chessBoard[l + 1][c - 1] && chessBoard[l + 1][c - 1].currentPiece && chessBoard[l + 1][c - 1].currentPiece?.color !== this.color) && (chessBoard[l + 1][c - 1].isPossibleToMove = true);
        }

        if(this.color === 'black') {
            (chessBoard[l - 1][c] && chessBoard[l - 1][c].currentPiece?.color) !== this.color && (chessBoard[l - 1][c].isPossibleToMove = true);
            (chessBoard[l - 1][c + 1] && chessBoard[l - 1][c + 1].currentPiece && chessBoard[l - 1][c + 1].currentPiece?.color !== this.color) && (chessBoard[l - 1][c + 1].isPossibleToMove = true);
            (chessBoard[l - 1][c - 1] && chessBoard[l - 1][c - 1].currentPiece && chessBoard[l - 1][c - 1].currentPiece?.color !== this.color) && (chessBoard[l - 1][c - 1].isPossibleToMove = true);
        }
    }

}
