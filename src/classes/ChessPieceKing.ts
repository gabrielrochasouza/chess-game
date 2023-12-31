import WhiteKing from "../assets/svg/white_king.svg";
import BlackKing from "../assets/svg/black_king.svg";
import { chessBoardArrayType } from "./types";


export default class ChessPieceKing {
    constructor(color: 'white' | 'black') {
        this.color = color;
        this.svgFile = color === 'white' ? WhiteKing : BlackKing;
    }
    svgFile: string;

    color: 'white' | 'black';

    possibleMoves(chessBoard: chessBoardArrayType, l: number, c: number) {
        (chessBoard[l + 1][c + 1] && chessBoard[l + 1][c + 1].currentPiece?.color !== this.color) && (chessBoard[l + 1][c + 1].isPossibleToMove = true);
        (chessBoard[l + 1][c - 1] && chessBoard[l + 1][c - 1].currentPiece?.color !== this.color) && (chessBoard[l + 1][c - 1].isPossibleToMove = true);
        (chessBoard[l - 1][c + 1] && chessBoard[l - 1][c + 1].currentPiece?.color !== this.color) && (chessBoard[l - 1][c + 1].isPossibleToMove = true);
        (chessBoard[l - 1][c - 1] && chessBoard[l - 1][c - 1].currentPiece?.color !== this.color) && (chessBoard[l - 1][c - 1].isPossibleToMove = true);

        (chessBoard[l][c + 1] && chessBoard[l][c + 1].currentPiece?.color !== this.color) && (chessBoard[l][c + 1].isPossibleToMove = true);
        (chessBoard[l][c - 1] && chessBoard[l][c - 1].currentPiece?.color !== this.color) && (chessBoard[l][c - 1].isPossibleToMove = true);
        (chessBoard[l + 1][c] && chessBoard[l + 1][c].currentPiece?.color !== this.color) && (chessBoard[l + 1][c].isPossibleToMove = true);
        (chessBoard[l - 1][c] && chessBoard[l - 1][c].currentPiece?.color !== this.color) && (chessBoard[l - 1][c].isPossibleToMove = true);
    }

}