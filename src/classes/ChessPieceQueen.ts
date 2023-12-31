import WhiteQueen from "../assets/svg/white_queen.svg";
import BlackQueen from "../assets/svg/black_queen.svg";
import { chessBoardArrayType, chessBoardType, possibleMovesType } from "./types";
import ChessPieceBishop from "./ChessPieceBishop";
import ChessPieceRook from "./ChessPieceRook";


export default class ChessPieceQueen {
    constructor(color: 'white' | 'black') {
        this.color = color;
        this.svgFile = color === 'white' ? WhiteQueen : BlackQueen;
    }
    svgFile: string;
    color: 'white' | 'black';
    allPossibleMoves: possibleMovesType = new Array(8).fill(false).map(() => new Array(8).fill(false));
    
    resetPossibleMoves() {
        this.allPossibleMoves = new Array(8).fill(false).map(() => new Array(8).fill(false));
    }

    setLinesAndColumns(l: number, c: number) {
        return {
            nextLine: l + 1,
            nextColumn: c + 1,
            previousLine: l - 1,
            previousColumn: c - 1,
        }
    }

    queenPossibleMoves(chessBoard: chessBoardArrayType, l: number, c: number): boolean[][] {
        this.resetPossibleMoves();
        const allPossibleMoves = this.allPossibleMoves;
        const rookPossibleMoves = new ChessPieceRook(this.color).rookPossibleMoves(chessBoard, l, c);
        const bishopPossibleMoves = new ChessPieceBishop(this.color).bishopPossibleMoves(chessBoard, l, c);

        return allPossibleMoves.map((line, l)=> line.map((_, c) => rookPossibleMoves[l][c] || bishopPossibleMoves[l][c] ) );
    }

    setPossibleMoves(chessBoard: chessBoardArrayType, l: number, c: number) {
        this.allPossibleMoves = this.queenPossibleMoves(chessBoard, l, c);
        return chessBoard.map((line: chessBoardType[], l: number) => line.map((column: chessBoardType, c: number) => ({...column, isPossibleToMove: this.allPossibleMoves[l][c]})))
    }

}