import { SquareValue } from "../Square/models";

export interface IGame {
    type: 'BOT' | 'Player';
    session?: string;
}

export interface IGameStatus {
    squares: SquareValue[],
    currentMoveClientId: string,
    isXNext: boolean,
    isFinished: boolean,
    winner: SquareValue,
    started: boolean,
    status: string,
}