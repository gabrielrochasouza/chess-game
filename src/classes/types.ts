import ChessPiece from "./ChessPiece";

export type chessBoardType = {
    color: string,
    currentPiece?: ChessPiece | null,
    isPossibleToMove: boolean,
    isSelected: boolean,
}

export type possibleMovesType = boolean[][]

export type chessBoardArrayType = chessBoardType[][];
