import WhiteBishop from "../assets/svg/white_bishop.svg";
import BlackBishop from "../assets/svg/black_bishop.svg";
import { chessBoardArrayType } from "./types";


export default class ChessPieceBishop {
    constructor(color: 'white' | 'black') {
        this.color = color;
        this.svgFile = color === 'white' ? WhiteBishop : BlackBishop;
    }
    svgFile: string;

    color: 'white' | 'black';

    possibleMoves(chessBoard: chessBoardArrayType, l: number, c: number) {
        let nextLine = l + 1;
        let nextColumn = c + 1;
        let previousLine = l - 1;
        let previousColumn = c - 1;

        while (chessBoard[nextLine][nextColumn]) {
            (
                !chessBoard[nextLine][nextColumn].currentPiece || 
                chessBoard[nextLine][nextColumn].currentPiece?.color !== this.color
            ) && (chessBoard[nextLine][nextColumn].isPossibleToMove = true);
            if(chessBoard[nextLine][nextColumn].currentPiece) break;
            nextLine = nextLine + 1;
            nextColumn = nextColumn + 1;
        }

        nextLine = l + 1;
        nextColumn = c + 1;
        previousLine = l - 1;
        previousColumn = c - 1;
        while (chessBoard[nextLine][previousColumn]) {
            (
                !chessBoard[nextLine][previousColumn].currentPiece || 
                chessBoard[nextLine][previousColumn].currentPiece?.color !== this.color
            ) && (chessBoard[nextLine][previousColumn].isPossibleToMove = true);
            if(chessBoard[nextLine][previousColumn].currentPiece) break;
            nextLine = nextLine + 1;
            previousColumn = previousColumn + 1;
        }

        nextLine = l + 1;
        nextColumn = c + 1;
        previousLine = l - 1;
        previousColumn = c - 1;
        while (chessBoard[previousLine][nextColumn]) {
            (
                !chessBoard[previousLine][nextColumn].currentPiece || 
                chessBoard[previousLine][nextColumn].currentPiece?.color !== this.color
            ) && (chessBoard[previousLine][nextColumn].isPossibleToMove = true);
            if(chessBoard[previousLine][nextColumn].currentPiece) break;
            previousLine = previousLine + 1;
            nextColumn = nextColumn + 1;
        }

        nextLine = l + 1;
        nextColumn = c + 1;
        previousLine = l - 1;
        previousColumn = c - 1;
        while (chessBoard[previousLine][previousColumn]) {
            (
                !chessBoard[previousLine][previousColumn].currentPiece ||
                chessBoard[previousLine][previousColumn].currentPiece?.color !== this.color
            ) && (chessBoard[previousLine][previousColumn].isPossibleToMove = true);
            if(chessBoard[previousLine][previousColumn].currentPiece) break;
            previousLine = previousLine + 1;
            previousColumn = previousColumn + 1;
        }
    }

}