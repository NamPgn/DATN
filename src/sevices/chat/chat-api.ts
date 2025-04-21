import { token_auth } from "../../common/auth/getToken";
import { intancesLocal, intancesLogout } from "../instances";


export const chatApi = {
	getChatConversation: async (guest_id: string) => {
		const token_ = token_auth()
		const headers = {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${token_}`
		}
		return (await intancesLocal.get(`/chat/conversation/active?guest_id=${guest_id}`, !guest_id ? { headers } : {}));
	},

	getChatConversationMessages: async (id: string | number) => {
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
		const token_ = token_auth();

		const headers: any = {};

		if (token_) {
			headers.Authorization = `Bearer ${token_}`;
		}
		return (await intancesLocal.post(`/chat/messages/send`, data, { headers }));
	},



	// Admin Chat
	getChatConversations: async () => {
		return (await intancesLogout.get(`chat/my-conversations`)).data;
	},

	getChatUnassigned: async () => {
		const token_ = token_auth();

		const headers: any = {};

		if (token_) {
			headers.Authorization = `Bearer ${token_}`;
		}
		return (await intancesLogout.get(`/chat/conversations/unassigned`, { headers })).data;
	},

	claimChat: async (id: any) => {
		const token_ = token_auth();

		const headers: any = {};

		if (token_) {
			headers.Authorization = `Bearer ${token_}`;
		}
		return (await intancesLogout.post(`chat/conversation/${id}/claim`, null, { headers }));
	},

	closeChat: async (data: any) => {
		const token_ = token_auth();

		const headers: any = {};

		if (token_) {
			headers.Authorization = `Bearer ${token_}`;
		}
		return (await intancesLogout.post(`chat/conversation/${data?.id}/close`, data, { headers }));
	},

	chatAll: async () => {
		const token_ = token_auth();
		const headers: any = {};

		if (token_) {
			headers.Authorization = `Bearer ${token_}`;
		}
		return (await intancesLogout.get(`chat/admin-conversations`, { headers })).data;
	},


	getEmployee: async () => {
		const token_ = token_auth();

		const headers: any = {};

		if (token_) {
			headers.Authorization = `Bearer ${token_}`;
		}
		return (await intancesLogout.get(`chat/staff/online`, { headers })).data;
	},

	changeEmployee: async ({ id, employeeId }: any) => {
		const token_ = token_auth();

		const headers: any = {};

		if (token_) {
			headers.Authorization = `Bearer ${token_}`;
		}
		return (await intancesLogout.post(`chat/conversation/${id}/assign`, {
			staff_id: employeeId
		}, { headers }));
	},

	changeEmployeeChat: async (data: any) => {
		const token_ = token_auth();

		const headers: any = {};

		if (token_) {
			headers.Authorization = `Bearer ${token_}`;
		}
		return (await intancesLogout.post(`chat/conversation/${data?.id}/transfer/request`, {
			to_staff_id: data?.employeeId,
			...data
		}, { headers }));
	},

	acceptTranferChat: async (transferId: any) => {
		const token_ = token_auth();

		const headers: any = {};

		if (token_) {
			headers.Authorization = `Bearer ${token_}`;
		}
		return (await intancesLogout.post(`chat/conversation/transfer/${transferId}/accept`, null, { headers }));
	},

	rejectTranferChat: async (transferId: any) => {
		const token_ = token_auth();

		const headers: any = {};

		if (token_) {
			headers.Authorization = `Bearer ${token_}`;
		}
		return (await intancesLogout.post(`chat/conversation/transfer/${transferId}/reject`, null, { headers }));
	},
};
