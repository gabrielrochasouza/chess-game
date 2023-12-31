import WhitePawn from "../assets/svg/white_pawn.svg";
import BlackPawn from "../assets/svg/black_pawn.svg";
import { chessBoardArrayType, chessBoardType, possibleMovesType } from "./types";


export default class ChessPiecePawn {
    constructor(color: 'white' | 'black') {
        this.color = color;
        this.svgFile = color === 'white' ? WhitePawn : BlackPawn;
    }
    svgFile: string;
    color: 'white' | 'black'
    allPossibleMoves: possibleMovesType = new Array(8).fill(false).map(() => new Array(8).fill(false));

    resetPossibleMoves() {
        this.allPossibleMoves = new Array(8).fill(false).map(() => new Array(8).fill(false));
    }

    pawnPossibleMoves(chessBoard: chessBoardArrayType, l:number, c: number): boolean[][] {
        this.resetPossibleMoves();

        const allPossibleMoves = this.allPossibleMoves;
        if(this.color === 'black') {
            if(l == 1) {
                allPossibleMoves[l + 1][c] = true;
                allPossibleMoves[l + 2][c] = true;
            }
            if(l + 1 <= 7 && !chessBoard[l + 1][c].currentPiece) allPossibleMoves[l + 1][c] = true;
            if(l + 1 <= 7 && c + 1 <= 7) (chessBoard[l + 1][c + 1].currentPiece && chessBoard[l + 1][c + 1].currentPiece?.color !== this.color) && (allPossibleMoves[l + 1][c + 1] = true);
            if(l + 1 <= 7 && c - 1 >= 0) (chessBoard[l + 1][c - 1].currentPiece && chessBoard[l + 1][c - 1].currentPiece?.color !== this.color) && (allPossibleMoves[l + 1][c - 1] = true);
        }

        if(this.color === 'white') {
            if(l == 6) {
                allPossibleMoves[l - 1 ][c] = true;
                allPossibleMoves[l - 2][c] = true;
            }
            if(l - 1 >= 0 && !chessBoard[l - 1][c].currentPiece)  allPossibleMoves[l - 1][c] = true;
            if(l - 1 >= 0 && c + 1 <= 7) (chessBoard[l - 1][c + 1].currentPiece && chessBoard[l - 1][c + 1].currentPiece?.color !== this.color) && (allPossibleMoves[l - 1][c + 1] = true);
            if(l - 1 >= 0 && c - 1 >= 0) (chessBoard[l - 1][c - 1].currentPiece && chessBoard[l - 1][c - 1].currentPiece?.color !== this.color) && (allPossibleMoves[l - 1][c - 1] = true);
        }
        return allPossibleMoves;
    }
    setPossibleMoves(chessBoard: chessBoardArrayType, l: number, c: number) {
        this.allPossibleMoves = this.pawnPossibleMoves(chessBoard, l, c);
        return chessBoard.map((line: chessBoardType[], lIndex: number) => line.map((column: chessBoardType, cIndex: number) => ({...column, isPossibleToMove: this.allPossibleMoves[lIndex][cIndex]})))
    }

}
