import WhiteKnight from "../assets/svg/white_knight.svg";
import BlackKnight from "../assets/svg/black_knight.svg";
import { chessBoardArrayType } from "./types";


export default class ChessPieceKnight {
    constructor(color: 'white' | 'black') {
        this.color = color;
        this.svgFile = color === 'white' ? WhiteKnight : BlackKnight;
    }
    svgFile: string;

    color: 'white' | 'black';

    possibleMoves(chessBoard: chessBoardArrayType, l:number, c: number) {
        (chessBoard[l + 2][c + 1] && chessBoard[l + 2][c + 1].currentPiece?.color !== this.color) && (chessBoard[l + 2][c + 1].isPossibleToMove = true);
        (chessBoard[l + 2][c - 1] && chessBoard[l + 2][c - 1].currentPiece?.color !== this.color) && (chessBoard[l + 2][c - 1].isPossibleToMove = true);
        (chessBoard[l - 2][c + 1] && chessBoard[l - 2][c + 1].currentPiece?.color !== this.color) && (chessBoard[l - 2][c + 1].isPossibleToMove = true);
        (chessBoard[l - 2][c - 1] && chessBoard[l - 2][c - 1].currentPiece?.color !== this.color) && (chessBoard[l - 2][c - 1].isPossibleToMove = true);
        
        (chessBoard[l + 1][c + 2] && chessBoard[l + 1][c + 2].currentPiece?.color !== this.color) && (chessBoard[l + 1][c + 2].isPossibleToMove = true);
        (chessBoard[l + 1][c - 2] && chessBoard[l + 1][c - 2].currentPiece?.color !== this.color) && (chessBoard[l + 1][c - 2].isPossibleToMove = true);
        (chessBoard[l - 1][c + 2] && chessBoard[l - 1][c + 2].currentPiece?.color !== this.color) && (chessBoard[l - 1][c + 2].isPossibleToMove = true);
        (chessBoard[l - 1][c - 2] && chessBoard[l - 1][c - 2].currentPiece?.color !== this.color) && (chessBoard[l - 1][c - 2].isPossibleToMove = true);
    }

}
