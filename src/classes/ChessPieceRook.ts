import WhiteRook from "../assets/svg/white_rook.svg";
import BlackRook from "../assets/svg/black_rook.svg";
import { chessBoardArrayType } from "./types";


export default class ChessPieceRook {
    constructor(color: 'white' | 'black') {
        this.color = color;
        this.svgFile = color === 'white' ? WhiteRook : BlackRook;
    }
    svgFile: string;

    color: 'white' | 'black';

    possibleMoves(chessBoard: chessBoardArrayType, l: number, c: number) {
        let nextLine = l + 1;
        let nextColumn = c + 1;
        let previousLine = l - 1;
        let previousColumn = c - 1;

        while (chessBoard[nextLine][c]) {
            (
                !chessBoard[nextLine][c].currentPiece || 
                chessBoard[nextLine][c].currentPiece?.color !== this.color
            ) && (chessBoard[nextLine][c].isPossibleToMove = true);
            if(chessBoard[nextLine][c].currentPiece) break;
            nextLine = nextLine + 1;
        }

        nextLine = l + 1;
        nextColumn = c + 1;
        previousLine = l - 1;
        previousColumn = c - 1;
        while (chessBoard[previousLine][c]) {
            (
                !chessBoard[previousLine][c].currentPiece || 
                chessBoard[previousLine][c].currentPiece?.color !== this.color
            ) && (chessBoard[previousLine][c].isPossibleToMove = true);
            if(chessBoard[previousLine][c].currentPiece) break;
            previousLine = previousLine - 1;
        }

        nextLine = l + 1;
        nextColumn = c + 1;
        previousLine = l - 1;
        previousColumn = c - 1;
        while (chessBoard[l][nextColumn]) {
            (
                !chessBoard[l][nextColumn].currentPiece || 
                chessBoard[l][nextColumn].currentPiece?.color !== this.color
            ) && (chessBoard[l][nextColumn].isPossibleToMove = true);
            if(chessBoard[l][nextColumn].currentPiece) break;
            nextColumn = nextColumn + 1;
        }

        nextLine = l + 1;
        nextColumn = c + 1;
        previousLine = l - 1;
        previousColumn = c - 1;
        while (chessBoard[l][previousColumn]) {
            (
                !chessBoard[l][previousColumn].currentPiece ||
                chessBoard[l][previousColumn].currentPiece?.color !== this.color
            ) && (chessBoard[l][previousColumn].isPossibleToMove = true);
            if(chessBoard[l][previousColumn].currentPiece) break;
            previousColumn = previousColumn - 1;
        }
    }

}