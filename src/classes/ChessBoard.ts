import ChessPiece from "./ChessPiece";
import ChessPiecePawn from "./ChessPiecePawn";
import ChessPieceBishop from "./ChessPieceBishop";
import ChessPieceKing from "./ChessPieceKing";
import ChessPieceKnight from "./ChessPieceKnight";
import ChessPieceRook from "./ChessPieceRook";
import ChessPieceQueen from "./ChessPieceQueen";
import PieceMoveSoundEffect from '../assets/sound/piece_move_sound.mp3';
import ChessCheckSoundEffect from '../assets/sound/check_sound.wav';
import ChessCheckMateSoundEffect from '../assets/sound/check_mate_sound.wav';

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
    public checkMate: boolean = false;

    private whiteKingPiece: ChessPiece;
    private blackKingPiece: ChessPiece;

    private setPiecesInBoard() {
        new Array(8).fill(0).forEach((_, c:number) => {
            this.chessBoard[6][c].currentPiece = new ChessPiece(6, c, 'white', new ChessPiecePawn('white'));
            this.chessBoard[1][c].currentPiece = new ChessPiece(1, c, 'black', new ChessPiecePawn('black'));
        })
        this.whiteKingPiece = new ChessPiece(7, 4, 'white', new ChessPieceKing('white'));
        this.blackKingPiece = new ChessPiece(0, 4, 'black', new ChessPieceKing('black'))

        this.chessBoard[7][0].currentPiece = new ChessPiece(7, 0, 'white', new ChessPieceRook('white'));
        this.chessBoard[7][1].currentPiece = new ChessPiece(7, 1, 'white', new ChessPieceKnight('white'));
        this.chessBoard[7][2].currentPiece = new ChessPiece(7, 2, 'white', new ChessPieceBishop('white'));
        this.chessBoard[7][3].currentPiece = new ChessPiece(7, 3, 'white', new ChessPieceQueen('white'));
        this.chessBoard[7][4].currentPiece = this.whiteKingPiece;
        this.chessBoard[7][5].currentPiece = new ChessPiece(7, 5, 'white', new ChessPieceBishop('white'));
        this.chessBoard[7][6].currentPiece = new ChessPiece(7, 6, 'white', new ChessPieceKnight('white'));
        this.chessBoard[7][7].currentPiece = new ChessPiece(7, 7, 'white', new ChessPieceRook('white'));

        this.chessBoard[0][0].currentPiece = new ChessPiece(0, 0, 'black', new ChessPieceRook('black'));
        this.chessBoard[0][1].currentPiece = new ChessPiece(0, 1, 'black', new ChessPieceKnight('black'));
        this.chessBoard[0][2].currentPiece = new ChessPiece(0, 2, 'black', new ChessPieceBishop('black'));
        this.chessBoard[0][3].currentPiece = new ChessPiece(0, 3, 'black', new ChessPieceQueen('black'));
        this.chessBoard[0][4].currentPiece = this.blackKingPiece;
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

    public movePiece(targetLine: number, targetColumn: number) {
        if (this.selectedPiece && this.chessBoard[targetLine][targetColumn].isPossibleToMove) {
            if (this.verifyIfNextMoveWillBeCheck(this.turnOfPlay, targetLine, targetColumn, this.previousLine, this.previousColumn)) {
                toast.error('Você não pode mover para aí pois está ou estará em Check');
                return;
            }
            const currentPiece = this.chessBoard[this.previousLine][this.previousColumn].currentPiece;
            currentPiece.setChessPiece(this.chessBoard, targetLine, targetColumn);
            
            this.changeModeToSelectMode();
            const playerOnCheck = this.verifyIfPlayerIsOnCheck(this.turnOfPlay);

            this.turnOfPlay = this.turnOfPlay === 'white' ? 'black' : 'white';
            this.blackPlayerOnCheck = playerOnCheck && this.turnOfPlay === 'black';
            this.whitePlayerOnCheck = playerOnCheck && this.turnOfPlay === 'white';
            this.selectedPiece = null;
            new Audio(PieceMoveSoundEffect).play();

            if (playerOnCheck) {
                new Audio(ChessCheckSoundEffect).play();
            }
            if (this.verifyCheckMate(this.turnOfPlay)) {
                new Audio(ChessCheckMateSoundEffect).play();
                toast.success(`Jogador das peças ${this.turnOfPlay === 'white' ? 'Pretas' : 'Brancas'} ganhou!!`);
                console.log(this.chessBoard);
                this.checkMate = true;
            }
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
            squareColor: (i + j) % 2 === 1 ? 'black' : 'white',
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
        this.checkMate = false;
        this.whitePlayerOnCheck = false;
        this.blackPlayerOnCheck = false;
    }

    public changeModeToSelectMode() {
        this.updateBoard();
        this.mode = 'selectPiece'
    }

    public verifyIfPlayerIsOnCheck(color: 'white' | 'black'): boolean {
        let itsOnCheck = false;
        this.chessBoard.map((line, l) => line.map((column, c) => {
            if(column.currentPiece && column.currentPiece.color === color) {
                if(column.currentPiece.piece.checkIfItsAttackingKing(color, this.chessBoard, l, c)) {
                    itsOnCheck = true;
                }
            }
        }))

        return itsOnCheck;
    }

    public verifyIfNextMoveWillBeCheck(
        colorOfPlayerBeeingAttacked: 'white' | 'black',
        targetLine: number,
        targetColumn: number,
        previousLine: number,
        previousColumn: number,
    ): boolean {
        const oldPiece = this.chessBoard[targetLine][targetColumn].currentPiece;
        const selectedPiece = this.chessBoard[previousLine][previousColumn].currentPiece;
        selectedPiece.setChessPiece(this.chessBoard, targetLine, targetColumn);

        let check = false;
        const colorOfAttacker = colorOfPlayerBeeingAttacked === 'white' ? 'black' : 'white';

        if(this.verifyIfPlayerIsOnCheck(colorOfAttacker)) {
            check = true;
        }
        this.revertMove(targetLine, targetColumn, oldPiece, selectedPiece, previousLine, previousColumn);

        return check;
    }

    private revertMove (
        targetLine: number,
        targetColumn: number,
        oldPiece: ChessPiece,
        selectedPiece: ChessPiece,
        previousLine: number,
        previousColumn: number,
    ) {
        this.updateBoard();
        selectedPiece.setChessPiece(this.chessBoard, previousLine, previousColumn);
        this.chessBoard[targetLine][targetColumn].currentPiece = oldPiece;
    }

    public verifyCheckMate(colorOfplayerBeingAttacked: 'white' | 'black'): boolean {
        const possibleResults: boolean[] = [];
        const board = new Array(8).fill(0).map(() => new Array(8).fill(0));
        const pieces: ChessPiece[] = [];

        board.map((line, previousLine: number) => line.map((_, previousColumn: number) => {
                const selectedPiece = this.chessBoard[previousLine][previousColumn].currentPiece;

                if (selectedPiece && selectedPiece.piece.color === colorOfplayerBeingAttacked){
                    
                    const possibleMovesOfAttackedPlayer = selectedPiece.piece.checkPossibleMoves(this.chessBoard, previousLine, previousColumn);
                    
                    pieces.push(selectedPiece);

                    possibleMovesOfAttackedPlayer.map((lineX, targetLine) => lineX.map((isPossibleToMove, targetColumn)=> {
                        if(isPossibleToMove && selectedPiece) {
                            const result = this.verifyIfNextMoveWillBeCheck(colorOfplayerBeingAttacked, targetLine, targetColumn, previousLine, previousColumn);
                            possibleResults.push(result);
                        }
                    }))

                }
            }) 
        );
        const checkMate = possibleResults.every(r => r);
        if (checkMate) {
            console.log(colorOfplayerBeingAttacked);
            console.log(possibleResults);
            console.log('pieces:', pieces);
            console.log('');
        }
        return checkMate;
    }

}

const chessBoard = new ChessBoard();

export default chessBoard;