import { useState } from "react";
import chessBoardInstance from "../../classes/ChessBoard";
import ChessPiece from "../../classes/ChessPiece";
import "./index.css"

type chessBoardArrayType = {
    color: string,
    currentPiece?: ChessPiece | null,
    isPossibleToMove: boolean,
}

function ChessBoard() {
  const {
    chessBoard, 
    turnOfPlay,
  } = chessBoardInstance;
  const [, setSelectedPiece] = useState<ChessPiece>(null);

  return (
    <>
        <div className='board'>
            { chessBoard.map((line:chessBoardArrayType[], l: number) => (
                line.map((column: chessBoardArrayType, c: number) => (
                    <div 
                        key={'square:' + l + c}
                        className={column.isPossibleToMove ? 'square possibleToMove' : 'square'}
                        style={{ backgroundColor: column.color === 'white' ? '#fff': '#555', border: (chessBoardInstance.selectedPiece && chessBoardInstance.selectedPiece.c === c && chessBoardInstance.selectedPiece.l === l) ? '4px red solid ' : '' }}
                        onClick={()=> {
                            if (chessBoardInstance.mode === 'selectPiece') {
                                chessBoardInstance.selectPiece(l, c)
                                setSelectedPiece(chessBoardInstance.chessBoard[l][c].currentPiece);
                            } else if (chessBoardInstance.mode === 'movePiece' && chessBoard[l][c].isPossibleToMove) {
                                chessBoardInstance.movePiece(l, c)
                                setSelectedPiece(null);
                            } else {
                                chessBoardInstance.changeModeToSelectMode();
                                setSelectedPiece(null);
                            }
                        }}
                    >
                        {column.currentPiece && (
                            <img className={column.currentPiece.color === chessBoardInstance.turnOfPlay ? 'possible-to-click' : ''} src={column.currentPiece.piece.svgFile} />
                        )}
                    </div>
                )
                )
            )) }
        </div>
        <h3>Vez das peças {turnOfPlay === 'white' ? 'brancas': 'pretas'}</h3>
    </>
  )
}

export default ChessBoard;