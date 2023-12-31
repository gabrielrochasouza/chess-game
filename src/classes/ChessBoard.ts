import ChessPiece from "./ChessPiece";
import ChessPiecePawn from "./ChessPiecePawn";
import ChessPieceBishop from "./ChessPieceBishop";
import ChessPieceKing from "./ChessPieceKing";
import ChessPieceKnight from "./ChessPieceKnight";

import { chessBoardArrayType } from "./types";
import ChessPieceRook from "./ChessPieceRook";
import ChessPieceQueen from "./ChessPieceQueen";

class ChessBoard {
    constructor() {
        this.startGame();
    }

    public chessBoard: chessBoardArrayType;

    turnOfPlay:'black'|'white' = 'white';

    selectedPiece?: ChessPiece | null;

    public mode?: 'movePiece' | 'selectPiece';

    private previousLine: number;
    private previousColumn: number;

    private setPiecesInBoard() {
        new Array(8).fill(0).forEach((_, c:number) => {
            this.chessBoard[6][c].currentPiece = new ChessPiece(6, c, 'white', new ChessPiecePawn('white'));
            this.chessBoard[1][c].currentPiece = new ChessPiece(1, c, 'black', new ChessPiecePawn('black'));
        })
        this.chessBoard[7][0].currentPiece = new ChessPiece(7, 0, 'white', new ChessPieceRook('white'));
        this.chessBoard[7][1].currentPiece = new ChessPiece(7, 1, 'white', new ChessPieceKnight('white'));
        this.chessBoard[7][2].currentPiece = new ChessPiece(7, 2, 'white', new ChessPieceBishop('white'));
        this.chessBoard[7][3].currentPiece = new ChessPiece(7, 3, 'white', new ChessPieceQueen('white'));
        this.chessBoard[7][4].currentPiece = new ChessPiece(7, 4, 'white', new ChessPieceKing('white'));
        this.chessBoard[7][5].currentPiece = new ChessPiece(7, 5, 'white', new ChessPieceBishop('white'));
        this.chessBoard[7][6].currentPiece = new ChessPiece(7, 6, 'white', new ChessPieceKnight('white'));
        this.chessBoard[7][7].currentPiece = new ChessPiece(7, 7, 'white', new ChessPieceRook('white'));

        this.chessBoard[0][0].currentPiece = new ChessPiece(0, 0, 'black', new ChessPieceRook('black'));
        this.chessBoard[0][1].currentPiece = new ChessPiece(0, 1, 'black', new ChessPieceKnight('black'));
        this.chessBoard[0][2].currentPiece = new ChessPiece(0, 2, 'black', new ChessPieceBishop('black'));
        this.chessBoard[0][3].currentPiece = new ChessPiece(0, 3, 'black', new ChessPieceQueen('black'));
        this.chessBoard[0][4].currentPiece = new ChessPiece(0, 4, 'black', new ChessPieceKing('black'));
        this.chessBoard[0][5].currentPiece = new ChessPiece(0, 5, 'black', new ChessPieceBishop('black'));
        this.chessBoard[0][6].currentPiece = new ChessPiece(0, 6, 'black', new ChessPieceKnight('black'));
        this.chessBoard[0][7].currentPiece = new ChessPiece(0, 7, 'black', new ChessPieceRook('black'));
    }

    private seePossibleMoves(l: number, c: number) {
        if (this.chessBoard[l][c].currentPiece) {
            this.chessBoard = this.chessBoard[l][c].currentPiece?.piece.setPossibleMoves(this.chessBoard, l, c);
        }
    }

    public movePiece(l: number, c: number) {
        if (this.selectedPiece && this.chessBoard[l][c].isPossibleToMove) {
            this.chessBoard[this.previousLine][this.previousColumn].currentPiece = null;
            this.chessBoard[l][c].currentPiece = this.selectedPiece;
            this.updateBoard();
            this.mode = 'selectPiece';
            this.turnOfPlay = this.turnOfPlay === 'white' ? 'black' : 'white';
            this.selectedPiece = null;
        }
    }

    public selectPiece(l: number, c: number) {
        if (this.chessBoard[l][c]?.currentPiece && this.turnOfPlay === this.chessBoard[l][c].currentPiece?.color) {
            this.selectedPiece = this.chessBoard[l][c].currentPiece;
            this.previousLine = l;
            this.previousColumn = c;
            this.seePossibleMoves(l, c);
            this.mode = 'movePiece';
        }
    }

    private createInitialChessBoardArray() {
        this.chessBoard = new Array(8).fill(0).map((_, i) => new Array(8).fill(0).map((_,j) => ({
            color: (i + j) % 2 === 1 ? 'black' : 'white',
            currentPiece: null,
            isPossibleToMove: false,
        }) ));
    }

    private updateBoard() {
        this.chessBoard = this.chessBoard.map((line) => line.map(column => ({ ...column, isPossibleToMove: false })) );
    }

    public startGame() {
        this.createInitialChessBoardArray();
        this.setPiecesInBoard();
        this.mode = 'selectPiece';
        this.turnOfPlay = 'white';
    }

    public changeModeToSelectMode() {
        this.updateBoard();
        this.mode = 'selectPiece'
    }

}

const chessBoard = new ChessBoard();

export default chessBoard;