import { useState, useCallback } from "react";
import chessBoardInstance from "../../classes/ChessBoard";
import "./index.css"
import { chessBoardType, pieceNamesType } from "../../classes/types";

import BlackBishop from "../../assets/svg/black_bishop.svg";
import BlackRook from "../../assets/svg/black_rook.svg";
import BlackKnight from "../../assets/svg/black_knight.svg";
import BlackQueen from "../../assets/svg/black_queen.svg";

import WhiteBishop from "../../assets/svg/white_bishop.svg";
import WhiteRook from "../../assets/svg/white_rook.svg";
import WhiteKnight from "../../assets/svg/white_knight.svg";
import WhiteQueen from "../../assets/svg/white_queen.svg";

function ChessBoard() {
  const {
    chessBoard, 
    turnOfPlay,
    blackPlayerOnCheck,
    whitePlayerOnCheck,
    checkMate,
  } = chessBoardInstance;
  const [, updateState] = useState();
  const forceUpdate = useCallback(() => updateState({} as undefined), []);

  const clickOnCellHandler = (l: number, c: number)=> {
    if (!checkMate) {
        if (chessBoardInstance.mode === 'selectPiece') {
            chessBoardInstance.selectPiece(l, c)
        } else if (chessBoardInstance.mode === 'movePiece' && chessBoard[l][c].isPossibleToMove) {
            chessBoardInstance.movePiece(l, c)
        } else if (chessBoardInstance.mode === 'movePiece' && chessBoard[l][c].currentPiece?.color === turnOfPlay) {
            chessBoardInstance.selectPiece(l, c)
        } else {
            chessBoardInstance.changeModeToSelectMode();
        }
        forceUpdate()
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

  return (
    <>
        <div className='board'>
            { chessBoard.map((line:chessBoardType[], l: number) => (
                line.map((column: chessBoardType, c: number) => (
                    <div 
                        key={'square:' + l + c}
                        className={column.isPossibleToMove ? 'square possibleToMove' : 'square'}
                        onClick={() => clickOnCellHandler(l, c)}
                        style={{ 
                            backgroundColor: column.squareColor === 'white' ? '#ffd2b8': '#9d4c1c', 
                            border: column.isSelected ? '4px red solid ' : ''

                        }}
                    >
                        {column.currentPiece && (
                            <img draggable={false} className={column.currentPiece.color === chessBoardInstance.turnOfPlay ? 'possible-to-click' : ''} src={column.currentPiece.piece.svgFile} />
                        )}
                        {(
                            column.currentPiece && 
                            column.currentPiece.piece.kingPiece &&
                            (
                                (column.currentPiece.color === 'black' && blackPlayerOnCheck) ||
                                (column.currentPiece.color === 'white' && whitePlayerOnCheck)
                            )
                        ) && (
                            <div className="square-check-mark"></div>
                        )}
                    </div>
                )
                )
            )) }
        </div>
        <div className="info-block">
            <div className="turn-indicator">
                <svg height="28" width="28">
                    <circle cx="14" cy="14" r="12" stroke="red" strokeWidth="2" fill={turnOfPlay} />
                </svg>
                <h3>
                    Vez das peças {turnOfPlay === 'white' ? 'brancas': 'pretas'}
                </h3>
            </div>
            { (!checkMate && blackPlayerOnCheck) && <span>Peças pretas estão em check!</span>}
            { (!checkMate && whitePlayerOnCheck) && <span>Peças brancas estão em check!</span>}
            { checkMate && <button onClick={restartGameHandler}>Restart Game</button> }
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
    </>
  )
}

export default ChessBoard;