import { SquareValue } from '@/components/Square/models';

export type GameType = 'Player' | 'BOT' | 'Unnasigned';

export interface IGameStatus {
    squares: SquareValue[],
    currentMoveClientId: string,
    isXNext: boolean,
    isFinished: boolean,
    winner: SquareValue,
    winnerUserName: string,
    started: boolean,
    status: string,
}

export interface IPlayer {
    clientId: string,
    userName: string,
    fistName: string,
    lastName: string,
    isSpectator: boolean,
    score: number,
    isCurrentMove: boolean
}