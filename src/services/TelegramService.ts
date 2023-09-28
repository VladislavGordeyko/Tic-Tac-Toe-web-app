import { Api } from "./Api";
import { IApiResponse, ISendMessageChatData, ITelegramService } from "./models";

const APIUrl = 'http://localhost:3000';
const sendGameInvite = `${APIUrl}/inviteToGame`;

export class TelegramService implements ITelegramService {
    private _api = Api.getInstance();

    public async sendGameInviteToChat(message: string, chatId: string, sessionId: string): Promise<ISendMessageChatData | undefined> {
        try {
            const result = <IApiResponse<ISendMessageChatData>>await this._api.post(sendGameInvite, {message, chatId, sessionId});
            return result.data;
        } catch (error) {
            console.log(error);
        }
    }
    public async sendMessage(message: string): Promise<boolean> {
         try {
            const result = <IApiResponse<boolean>>await this._api.post(APIUrl, {message});
            return result.data;
        } catch (error) {
            console.log(error);
            
            return false
        }
    }
    
}