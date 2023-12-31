import ChessPiece from "./ChessPiece";

export type chessBoardArrayType = {
    color: string,
    currentPiece?: ChessPiece | null,
    isPossibleToMove: boolean,
}[][];
