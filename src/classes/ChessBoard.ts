import ChessPiece from "./ChessPiece";
import ChessPiecePawn from "./ChessPiecePawn";
import ChessPieceBishop from "./ChessPieceBishop";
import ChessPieceKing from "./ChessPieceKing";
import ChessPieceKnight from "./ChessPieceKnight";
import ChessPieceRook from "./ChessPieceRook";
import ChessPieceQueen from "./ChessPieceQueen";
import PieceMoveSoundEffect from '../assets/sound/piece_move_sound.mp3';
import ChessCheckSoundEffect from '../assets/sound/check_sound.wav';

import { chessBoardArrayType } from "./types";
import { toast } from "react-toastify";

class ChessBoard {
    constructor() {
        this.startGame();
    }
    public chessBoard: chessBoardArrayType;
    public turnOfPlay:'black'|'white' = 'white';
    public selectedPiece?: ChessPiece | null;
    public mode?: 'movePiece' | 'selectPiece';
    private previousLine: number;
    private previousColumn: number;
    public whitePlayerOnCheck: boolean = false;
    public blackPlayerOnCheck: boolean = false;

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
            this.chessBoard[l][c].isSelected = true;
            this.chessBoard = this.chessBoard[l][c].currentPiece?.piece.setPossibleMoves(this.chessBoard, l, c);
        }
    }

    public movePiece(l: number, c: number) {
        if (this.selectedPiece && this.chessBoard[l][c].isPossibleToMove) {
            if (this.verifyIfNextMoveWillBeCheck(this.turnOfPlay, l, c)) {
                toast.error('Você não pode mover para aí pois está ou estará em Check', )
                return
            }
            
            this.chessBoard[this.previousLine][this.previousColumn].currentPiece = null;
            this.chessBoard[l][c].currentPiece = this.selectedPiece;
            this.updateBoard();
            this.mode = 'selectPiece';
            const playerOnCheck = this.verifyIfPlayerIsOnCheck(this.turnOfPlay);
            if (playerOnCheck) {
                new Audio(ChessCheckSoundEffect).play();
            }
            this.turnOfPlay = this.turnOfPlay === 'white' ? 'black' : 'white';
            this.blackPlayerOnCheck = playerOnCheck && this.turnOfPlay === 'black';
            this.whitePlayerOnCheck = playerOnCheck && this.turnOfPlay === 'white';
            this.selectedPiece = null;
            new Audio(PieceMoveSoundEffect).play();
        }
    }

    public selectPiece(l: number, c: number) {
        if (this.chessBoard[l][c]?.currentPiece && this.turnOfPlay === this.chessBoard[l][c].currentPiece?.color) {
            this.updateBoard();
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
            isSelected: false,
        }) ));
    }

    private updateBoard() {
        this.chessBoard = this.chessBoard.map((line) => line.map(column => ({ ...column, isPossibleToMove: false, isSelected: false })) );
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

    public verifyIfPlayerIsOnCheck(color: 'white' | 'black'): boolean {
        let result = false;
        this.chessBoard.map((line, l) => line.map((column, c) => {
            if(column.currentPiece && column.currentPiece.color === color) {
                if(column.currentPiece.piece.checkIfItsAttackingKing(color, this.chessBoard, l, c)) {
                    result = true;
                }
            }
        }))
        return result
    }

    public verifyIfNextMoveWillBeCheck(color: 'white' | 'black', l: number, c: number): boolean {
        this.chessBoard[this.previousLine][this.previousColumn].currentPiece = null;
        const oldPiece = this.chessBoard[l][c].currentPiece;
        this.chessBoard[l][c].currentPiece = this.selectedPiece;
        let result = false;
        color = color === 'white' ? 'black' : 'white';

        if(this.verifyIfPlayerIsOnCheck(color)) {
            result = true;
            this.revertMove(l, c, oldPiece);
        }

        return result;
    }

    private revertMove (l: number, c: number, oldPiece: ChessPiece) {
        this.updateBoard();
        this.chessBoard[this.previousLine][this.previousColumn].currentPiece = this.selectedPiece;
        this.chessBoard[l][c].currentPiece = oldPiece;
    }

}

const chessBoard = new ChessBoard();

export default chessBoard;