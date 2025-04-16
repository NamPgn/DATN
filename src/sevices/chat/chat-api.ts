import { token_auth } from "../../common/auth/getToken";
import intances, { intancesLocal, intancesLogout } from "../instances";


export const chatApi = {
    getChatConversation: async (guest_id: string) => {
        const token_ = token_auth()
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token_}`
        }
        return (await intancesLocal.get(`/chat/conversation/active?guest_id=${guest_id}`, !guest_id ? { headers } : {}));
    },

    getChatConversationMessages: async (id: string) => {
        return (await intancesLocal.get(`chat/conversation/${id}/messages`)).data;
    },

    createChatConversation: async (data: any) => {
        const token_ = token_auth()
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token_}`
        }

        return (await intancesLocal.post(`/chat/new_conversation`, data, token_ ? { headers } : {}));
    },

    sendMessage: async (data: any) => {
        return (await intancesLocal.post(`/chat/messages/send`, data));
    },



    // Admin Chat
    getChatConversations: async () => {
        return (await intancesLogout.get(`chat/my-conversations`)).data;
    },



};
