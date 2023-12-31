import WhiteKing from "../assets/svg/white_king.svg";
import BlackKing from "../assets/svg/black_king.svg";
import { chessBoardArrayType, chessBoardType, possibleMovesType } from "./types";


export default class ChessPieceKing {
    constructor(color: 'white' | 'black') {
        this.color = color;
        this.svgFile = color === 'white' ? WhiteKing : BlackKing;
    }
    svgFile: string;
    kingPiece: boolean = true;
    color: 'white' | 'black';
    allPossibleMoves: possibleMovesType = new Array(8).fill(false).map(() => new Array(8).fill(false));

    resetPossibleMoves() {
        this.allPossibleMoves = new Array(8).fill(false).map(() => new Array(8).fill(false));
    }

    kingPossibleMoves(chessBoard: chessBoardArrayType, l: number, c: number): boolean[][] {
        this.resetPossibleMoves();

        const allPossibleMoves = this.allPossibleMoves;

        if(l + 1 <= 7 && c + 1 <= 7 && (!chessBoard[l + 1][c + 1].currentPiece || chessBoard[l + 1][c + 1].currentPiece?.color !== this.color)) (allPossibleMoves[l + 1][c + 1] = true);
        if(l + 1 <= 7 && c - 1 >= 0 && (!chessBoard[l + 1][c - 1].currentPiece || chessBoard[l + 1][c - 1].currentPiece?.color !== this.color)) (allPossibleMoves[l + 1][c - 1] = true);
        if(l - 1 >= 0 && c + 1 <= 7 && (!chessBoard[l - 1][c + 1].currentPiece || chessBoard[l - 1][c + 1].currentPiece?.color !== this.color)) (allPossibleMoves[l - 1][c + 1] = true);
        if(l - 1 >= 0 && c - 1 >= 0 && (!chessBoard[l - 1][c - 1].currentPiece || chessBoard[l - 1][c - 1].currentPiece?.color !== this.color)) (allPossibleMoves[l - 1][c - 1] = true);
        
        if(c + 1 <= 7 && (!chessBoard[l][c + 1].currentPiece || chessBoard[l][c + 1].currentPiece?.color !== this.color)) (allPossibleMoves[l][c + 1] = true);
        if(c - 1 >= 0 && (!chessBoard[l][c - 1].currentPiece || chessBoard[l][c - 1].currentPiece?.color !== this.color)) (allPossibleMoves[l][c - 1] = true);
        if(l + 1 <= 7 && (!chessBoard[l + 1][c].currentPiece || chessBoard[l + 1][c].currentPiece?.color !== this.color)) (allPossibleMoves[l + 1][c] = true);
        if(l - 1 >= 0 && (!chessBoard[l - 1][c].currentPiece || chessBoard[l - 1][c].currentPiece?.color !== this.color)) (allPossibleMoves[l - 1][c] = true);
        
        return allPossibleMoves;
    }
    setPossibleMoves(chessBoard: chessBoardArrayType, l: number, c: number) {
        this.allPossibleMoves = this.kingPossibleMoves(chessBoard, l, c);
        return chessBoard.map((line: chessBoardType[], l: number) => line.map((column: chessBoardType, c: number) => ({...column, isPossibleToMove: this.allPossibleMoves[l][c]})))
    }

    checkIfItsAttackingKing (color: 'white' | 'black', chessBoard: chessBoardArrayType, l: number, c: number):boolean {
        this.allPossibleMoves = this.kingPossibleMoves(chessBoard, l, c);
        let result = false;
        chessBoard.map((line: chessBoardType[], l: number) => line.map((column: chessBoardType, c: number) => {
            if(
                this.allPossibleMoves[l][c] &&
                column.currentPiece &&
                column.currentPiece.color !== color &&
                column.currentPiece.piece.kingPiece
            ) {
                result = true;
            }
        }) );
        return result;
    }

}