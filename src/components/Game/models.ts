import { IGameStatus, IPlayer } from '@/entities/game';

export interface IGame {
    sessionId?: string,
    // chatId?: string,
    players?: IPlayer[],
    gameStatusUpdate?: IGameStatus,
    clientId: string,
}
