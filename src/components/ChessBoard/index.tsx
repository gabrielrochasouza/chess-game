import { useState, useCallback, MouseEvent } from "react";
import chessBoardInstance from "../../models/ChessBoard";
import "./index.css"
import { chessBoardType, pieceNamesType } from "../../models/types";

import BlackBishop from "../../assets/svg/black_bishop.svg";
import BlackRook from "../../assets/svg/black_rook.svg";
import BlackKnight from "../../assets/svg/black_knight.svg";
import BlackQueen from "../../assets/svg/black_queen.svg";

import WhiteBishop from "../../assets/svg/white_bishop.svg";
import WhiteRook from "../../assets/svg/white_rook.svg";
import WhiteKnight from "../../assets/svg/white_knight.svg";
import WhiteQueen from "../../assets/svg/white_queen.svg";

import Draggable from 'react-draggable';

interface IControlledPosition {
    x: number;
    y: number;
}

function ChessBoard() {
  const {
    chessBoard, 
    turnOfPlay,
    blackPlayerOnCheck,
    whitePlayerOnCheck,
    checkMate,
    deadPieces,
  } = chessBoardInstance;
  const cPosition = new Array(8).fill([]).map(() => new Array(8).fill({ x:0, y: 0}));

  const [, updateState] = useState();
  const [constrolledPosition] = useState<IControlledPosition[][]>(cPosition as IControlledPosition[][]);
  const forceUpdate = useCallback(() => updateState({} as undefined), []);

  const clickOnCellHandler = (l: number, c: number)=> {
    if (!checkMate) {
        if (chessBoardInstance.mode === 'selectPiece') {
            chessBoardInstance.selectPiece(l, c)
        } else if (chessBoardInstance.mode === 'movePiece' && chessBoard[l][c].isPossibleToMove) {
            chessBoardInstance.movePiece(l, c)
            forceUpdate()
            return true;
        } else if (chessBoardInstance.mode === 'movePiece' && chessBoard[l][c].currentPiece?.color === turnOfPlay) {
            chessBoardInstance.selectPiece(l, c)
        } else {
            chessBoardInstance.changeModeToSelectMode();
        }
        forceUpdate()
        return false;
    }
  }

  const restartGameHandler = ()=> {
    chessBoardInstance.startGame();
    forceUpdate();
  }

  const pieceSelectionHandler = (pieceName: pieceNamesType) => {
    chessBoardInstance.setSelectedPieceInPawnPlace(pieceName);
    forceUpdate();
  }

  const onDragStopHandler = (e: MouseEvent<HTMLElement>, l: number, c: number) => {
    const element = e.target as HTMLInputElement;
    element.style.zIndex = '10'
    const squareSize = document.querySelector('.square').clientWidth;
    const transform = element.style.transform;

    if (transform) {
        const [deltaC, deltaL] = element.style.transform.split('(')[1].replace(')', '').split(',').map(n => Math.round(Number(n.slice(0,-2)) / squareSize) )
        if (((l + deltaL) >= 0 && (l + deltaL) <= 7) && ((c + deltaC) >= 0 && (c + deltaC) <= 7)) {
            clickOnCellHandler(l + deltaL, c + deltaC)
        }
    }
  }

  const onDragStartHandler = (e: MouseEvent<HTMLElement>, l: number, c: number) => {
    clickOnCellHandler(l, c)
    const element = e.target as HTMLInputElement;
    element.style.zIndex = '20'
}

  return (
    <div className='chess-board-component'>
        <div className='dead-pieces'>
            <div>
                {deadPieces.filter(p => p.color === 'black').map((p, i) => <img src={p.piece.svgFile} alt={p.piece.name} key={p.color + i} />)}
            </div>
            <div>
                {deadPieces.filter(p => p.color === 'white').map((p, i) => <img src={p.piece.svgFile} alt={p.piece.name} key={p.color + i} />)}
            </div>
        </div>
        <div className='board'>
            { chessBoard.map((line:chessBoardType[], l: number) => (
                line.map((square: chessBoardType, c: number) => (
                    <div 
                        key={'square:' + l + c}
                        className='square'
                        onClick={() => clickOnCellHandler(l, c)}
                        style={{ backgroundColor: square.squareColor }}
                    >
                        {square.currentPiece && (
                            (
                            <Draggable
                                disabled={turnOfPlay !== square.currentPiece.color || checkMate}
                                position={constrolledPosition[l][c]}
                                onStart={(e: MouseEvent<HTMLElement>) => onDragStartHandler(e, l, c)}
                                onStop={(e: MouseEvent<HTMLElement>) => onDragStopHandler(e, l, c)}
                            >
                                <img draggable={false} className={square.currentPiece.color === chessBoardInstance.turnOfPlay && !checkMate ? 'possible-to-click' : ''} src={square.currentPiece.piece.svgFile} />
                            </Draggable>
                            )
                        )}
                        {(
                            square.currentPiece && 
                            square.currentPiece.piece.kingPiece &&
                            (
                                (square.currentPiece.color === 'black' && blackPlayerOnCheck) ||
                                (square.currentPiece.color === 'white' && whitePlayerOnCheck)
                            )
                        ) && (
                            <div className="square-over square-check-mark"></div>
                        )}
                        { square.isPossibleToMove && <div className="square-over square-possible-move"></div> }
                        { square.isSelected && <div className="square-over square-selected"></div> }
                        { square.isPreviousSelectedSquareMove && <div className="square-over square-previous-move"></div> }
                        { square.isPreviousTargetSquareMove && <div className="square-over square-previous-move"></div> }
                        
                    </div>
                )
                )
            )) }
        </div>
        <div className="info-block">
            <div className="turn-indicator">
                <svg height="28" width="28">
                    <circle cx="14" cy="14" r="12" stroke="#0e857b" strokeWidth="2" fill={turnOfPlay} />
                </svg>
                <h3>
                    Vez das peças {turnOfPlay === 'white' ? 'brancas': 'pretas'}
                </h3>
            </div>
            { (!checkMate && blackPlayerOnCheck) && <p>Peças pretas estão em check!</p>}
            { (!checkMate && whitePlayerOnCheck) && <p>Peças brancas estão em check!</p>}
            <button onClick={restartGameHandler}>Restart Game</button>
        </div>
        { chessBoardInstance.pawnReachedEndOfChessBoard && (
            <div className="select-piece">
                <h2>Select One Piece</h2>
                {chessBoardInstance.turnOfPlay === 'white' ? (
                    <div className="black-pieces">
                        <img src={BlackBishop} onClick={() => pieceSelectionHandler('bishop')} alt="black bishop piece" />
                        <img src={BlackKnight} onClick={() => pieceSelectionHandler('knight')} alt="black knight piece" />
                        <img src={BlackQueen} onClick={() => pieceSelectionHandler('queen')} alt="black queen piece" />
                        <img src={BlackRook} onClick={() => pieceSelectionHandler('rook')} alt="black rook piece" />
                    </div>
                ) : (
                    <div className="white-pieces">
                        <img src={WhiteBishop} onClick={() => pieceSelectionHandler('bishop')} alt="white bishop piece" />
                        <img src={WhiteKnight} onClick={() => pieceSelectionHandler('knight')} alt="white knight piece" />
                        <img src={WhiteQueen} onClick={() => pieceSelectionHandler('queen')} alt="white queen piece" />
                        <img src={WhiteRook} onClick={() => pieceSelectionHandler('rook')} alt="white rook piece" />
                    </div>
                )}

            </div>
        )}
    </div>
  )
}

export default ChessBoard;
