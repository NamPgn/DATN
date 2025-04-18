import { useMutation, useQuery } from 'react-query'
import { chatApi } from '../../sevices/chat/chat-api'

export const useGetChatConversation = (guest_id: string, options?: any) => {
    return useQuery({
        queryKey: ['conversation', guest_id],
        queryFn: async () => await chatApi.getChatConversation(guest_id),
        staleTime: 5 * 60 * 1000,
        cacheTime: 30 * 60 * 1000,
        ...options
    })
}

export const useGetChatConversationMessages = (id: string | number, options?: any) => {
    return useQuery({
        queryKey: ['conversation-messages', id],
        queryFn: async () => await chatApi.getChatConversationMessages(id),
        ...options
    })
}
export const useCreateChatConversation = (options?: any) => {
    return useMutation({
        mutationFn: async (data: any) => await chatApi.createChatConversation(data),
        ...options
    })
}

export const useSendMessage = (options?: any) => {
    return useMutation({
        mutationFn: async (data: any) => await chatApi.sendMessage(data),
        ...options
    })
}

export const useGetChatConversations = (options?: any) => {
    return useQuery({
        queryKey: ['chat-conversations'],
        queryFn: async () => await chatApi.getChatConversations(),
        ...options
    })
}

export const useGetChatUnassigned = (options: any) => {
    return useQuery({
        queryKey: ['chat-unassigned'],
        queryFn: async () => await chatApi.getChatUnassigned(),
        ...options
    })
}

export const useChatClaimMsg = (options: any) => {
    return useMutation({
        queryKey: ['chat-claim'],
        mutationFn: async (id: any) => await chatApi.claimChat(id),
        ...options,

    })
}

export const useCloseChatMsg = (options: any) => {
    return useMutation({
        queryKey: ['chat-close'],
        mutationFn: async (data: any) => await chatApi.closeChat(data),
        ...options,
    })
}

export const useChatAll = (options: any) => {
    return useQuery({
        queryKey: ['chat-all'],
        queryFn: async () => await chatApi.chatAll(),
        staleTime: 5 * 60 * 1000,
        cacheTime: 30 * 60 * 1000,
        ...options,
    })
}

export const useGetEmployee = (options: any) => {
    return useQuery({
        queryKey: ['chat-employee'],
        queryFn: async () => await chatApi.getEmployee(),
        staleTime: 5 * 60 * 1000,
        cacheTime: 30 * 60 * 1000,
        ...options,
    })
}

export const useChangeEmployee = (options: any) => {
    return useMutation({
        mutationFn: async (data:any) => await chatApi.changeEmployee(data),
        ...options,
    })
}