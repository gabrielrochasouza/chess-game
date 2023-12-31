import ChessPiece from "./ChessPiece";

export type chessBoardType = {
    color: string,
    currentPiece?: ChessPiece | null,
    isPossibleToMove: boolean,
}

export type possibleMovesType = boolean[][]

export type chessBoardArrayType = chessBoardType[][];
