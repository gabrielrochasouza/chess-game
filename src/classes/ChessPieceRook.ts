import WhiteRook from "../assets/svg/white_rook.svg";
import BlackRook from "../assets/svg/black_rook.svg";
import { chessBoardArrayType, chessBoardType, possibleMovesType } from "./types";


export default class ChessPieceRook {
    constructor(color: 'white' | 'black') {
        this.color = color;
        this.svgFile = color === 'white' ? WhiteRook : BlackRook;
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

    public rookPossibleMoves(chessBoard: chessBoardArrayType, l: number, c: number): boolean[][] {
        this.resetPossibleMoves();
        let {nextLine, nextColumn, previousLine, previousColumn} = this.setLinesAndColumns(l, c);

        const allPossibleMoves = this.allPossibleMoves;

        while (nextLine <= 7) {
            if(!chessBoard[nextLine][c].currentPiece || chessBoard[nextLine][c].currentPiece?.color !== this.color) {
                allPossibleMoves[nextLine][c] = true
            }
            if(chessBoard[nextLine][c].currentPiece) break;
            nextLine = nextLine + 1;
        }

        ({nextLine, nextColumn, previousLine, previousColumn} = this.setLinesAndColumns(l, c));
        while (previousLine >= 0) {
            if(!chessBoard[previousLine][c].currentPiece || chessBoard[previousLine][c].currentPiece?.color !== this.color) {
                allPossibleMoves[previousLine][c] = true
            }
            if(chessBoard[previousLine][c].currentPiece) break;
            previousLine = previousLine - 1;
        }

        ({nextLine, nextColumn, previousLine, previousColumn} = this.setLinesAndColumns(l, c));
        while (nextColumn <= 7) {
            if(!chessBoard[l][nextColumn].currentPiece || chessBoard[l][nextColumn].currentPiece?.color !== this.color) {
                allPossibleMoves[l][nextColumn] = true;
            }
            if(chessBoard[l][nextColumn].currentPiece) break;
            nextColumn = nextColumn + 1;
        }

        ({nextLine, nextColumn, previousLine, previousColumn} = this.setLinesAndColumns(l, c));
        while (previousColumn >= 0) {
            if(!chessBoard[l][previousColumn].currentPiece || chessBoard[l][previousColumn].currentPiece?.color !== this.color) {
                allPossibleMoves[l][previousColumn] = true
            }
            if(chessBoard[l][previousColumn].currentPiece) break;
            previousColumn = previousColumn - 1;
        }

        return allPossibleMoves;
    }

    setPossibleMoves(chessBoard: chessBoardArrayType, l: number, c: number) {
        this.allPossibleMoves = this.rookPossibleMoves(chessBoard, l, c);
        return chessBoard.map((line: chessBoardType[], l: number) => line.map((column: chessBoardType, c: number) => ({...column, isPossibleToMove: this.allPossibleMoves[l][c]})))
    }

}