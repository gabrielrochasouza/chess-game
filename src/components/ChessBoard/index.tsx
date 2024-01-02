import { useState, useCallback } from "react";
import chessBoardInstance from "../../classes/ChessBoard";
import "./index.css"
import { chessBoardType } from "../../classes/types";


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
                            backgroundColor: column.squareColor === 'white' ? '#ffd2b8': '#512c16', 
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
    </>
  )
}

export default ChessBoard;