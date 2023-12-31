import ChessPiece from "./ChessPiece";
import ChessPiecePawn from "./ChessPiecePawn";
import ChessPieceBishop from "./ChessPieceBishop";
import ChessPieceKing from "./ChessPieceKing";
import ChessPieceKnight from "./ChessPieceKnight";

import { chessBoardArrayType } from "./types";
import ChessPieceRook from "./ChessPieceRook";

class ChessBoard {
    constructor() {
        this.createInitialChessBoardArray();
        this.setPiecesInBoard();
    }

    chessBoard: chessBoardArrayType = [];

    turnOfPlay:'black'|'white' = 'white';

    selectedPiece?: ChessPiece | null;

    mode?: 'movePiece' | 'selectPiece'; 

    setPiecesInBoard() {
        this.chessBoard[1][0].currentPiece = new ChessPiece(1, 0, 'white', new ChessPiecePawn('white'));
        this.chessBoard[1][1].currentPiece = new ChessPiece(1, 1, 'white', new ChessPiecePawn('white'));
        this.chessBoard[1][2].currentPiece = new ChessPiece(1, 2, 'white', new ChessPiecePawn('white'));
        this.chessBoard[1][3].currentPiece = new ChessPiece(1, 3, 'white', new ChessPiecePawn('white'));
        this.chessBoard[1][4].currentPiece = new ChessPiece(1, 4, 'white', new ChessPiecePawn('white'));
        this.chessBoard[1][5].currentPiece = new ChessPiece(1, 5, 'white', new ChessPiecePawn('white'));
        this.chessBoard[1][6].currentPiece = new ChessPiece(1, 6, 'white', new ChessPiecePawn('white'));
        this.chessBoard[1][7].currentPiece = new ChessPiece(1, 7, 'white', new ChessPiecePawn('white'));

        this.chessBoard[1][0].currentPiece = new ChessPiece(0, 0, 'white', new ChessPieceRook('white'));
        this.chessBoard[1][1].currentPiece = new ChessPiece(0, 1, 'white', new ChessPieceKnight('white'));
        this.chessBoard[1][2].currentPiece = new ChessPiece(0, 2, 'white', new ChessPieceBishop('white'));
        this.chessBoard[1][3].currentPiece = new ChessPiece(0, 3, 'white', new ChessPiecePawn('white'));
        this.chessBoard[1][4].currentPiece = new ChessPiece(0, 4, 'white', new ChessPieceKing('white'));
        this.chessBoard[1][5].currentPiece = new ChessPiece(0, 5, 'white', new ChessPieceBishop('white'));
        this.chessBoard[1][6].currentPiece = new ChessPiece(0, 6, 'white', new ChessPieceKnight('white'));
        this.chessBoard[1][7].currentPiece = new ChessPiece(0, 7, 'white', new ChessPieceRook('white'));
        
        this.chessBoard[6][0].currentPiece = new ChessPiece(6, 0, 'black', new ChessPiecePawn('black'));
        this.chessBoard[6][1].currentPiece = new ChessPiece(6, 1, 'black', new ChessPiecePawn('black'));
        this.chessBoard[6][2].currentPiece = new ChessPiece(6, 2, 'black', new ChessPiecePawn('black'));
        this.chessBoard[6][3].currentPiece = new ChessPiece(6, 3, 'black', new ChessPiecePawn('black'));
        this.chessBoard[6][4].currentPiece = new ChessPiece(6, 4, 'black', new ChessPiecePawn('black'));
        this.chessBoard[6][5].currentPiece = new ChessPiece(6, 5, 'black', new ChessPiecePawn('black'));
        this.chessBoard[6][6].currentPiece = new ChessPiece(6, 6, 'black', new ChessPiecePawn('black'));
        this.chessBoard[6][7].currentPiece = new ChessPiece(6, 7, 'black', new ChessPiecePawn('black'));

        this.chessBoard[7][0].currentPiece = new ChessPiece(7, 0, 'black', new ChessPieceRook('black'));
        this.chessBoard[7][1].currentPiece = new ChessPiece(7, 1, 'black', new ChessPieceKnight('black'));
        this.chessBoard[7][2].currentPiece = new ChessPiece(7, 2, 'black', new ChessPieceBishop('black'));
        this.chessBoard[7][3].currentPiece = new ChessPiece(7, 3, 'black', new ChessPiecePawn('black'));
        this.chessBoard[7][4].currentPiece = new ChessPiece(7, 4, 'black', new ChessPieceKing('black'));
        this.chessBoard[7][5].currentPiece = new ChessPiece(7, 5, 'black', new ChessPieceBishop('black'));
        this.chessBoard[7][6].currentPiece = new ChessPiece(7, 6, 'black', new ChessPieceKnight('black'));
        this.chessBoard[7][7].currentPiece = new ChessPiece(7, 7, 'black', new ChessPieceRook('black'));
    }

    seePossibleMoves(l: number, c: number) {
        this.chessBoard[l][c].currentPiece && this.chessBoard[l][c].currentPiece?.piece.possibleMoves(this.chessBoard, l, c);
    }

    movePiece(l: number, c: number) {
        if (this.selectedPiece) {
            this.chessBoard[this.selectedPiece.l][this.selectedPiece.c].currentPiece = null; 
            this.chessBoard[l][c].currentPiece = this.selectedPiece;
            this.updateBoard();
            this.mode = 'selectPiece';
            this.turnOfPlay = this.turnOfPlay === 'white' ? 'black' : 'white';
        }
    }

    selectPiece(l: number, c: number) {
        this.selectedPiece = this.chessBoard[l][c].currentPiece;
        this.seePossibleMoves(l, c);
        this.mode = 'movePiece';
    }

    createInitialChessBoardArray() {
        this.chessBoard = new Array(8).fill(0).map((_, i) => new Array(8).fill(0).map((_,j) => ({
            color: (i + j) % 2 === 1 ? 'black' : 'white',
            currentPiece: null,
            isPossibleToMove: false,
        }) ));
    }

    updateBoard() {
        this.chessBoard = this.chessBoard.map((line) => line.map(column => ({ ...column, isPossibleToMove: false })) );
    }

    restartGame() {
        this.createInitialChessBoardArray();
        this.setPiecesInBoard();
    }

}

const chessBoard = new ChessBoard();

export default chessBoard;