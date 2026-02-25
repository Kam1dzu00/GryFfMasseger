import apiClient from './client';

// Chats
export const getChats = async () => {
    return apiClient.get('/chats');
};

export const getMessages = async (chatId: number) => {
    return apiClient.get(`/chats/${chatId}/messages`);
};

export const createPrivateChat = async (partnerId: number) => {
    return apiClient.post('/chats/private', { partnerId });
};

export const createGroupChat = async (name: string, participantIds: number[], description?: string) => {
    return apiClient.post('/chats/group', { name, participantIds, description });
};

export const updateChat = async (chatId: number, data: any) => {
    return apiClient.put(`/chats/${chatId}`, data);
};

export const getChatParticipants = async (chatId: number) => {
    return apiClient.get(`/chats/${chatId}/participants`);
};

export const addParticipant = async (chatId: number, userId: number) => {
    return apiClient.post(`/chats/${chatId}/participants`, { userId });
};

export const editMessage = async (messageId: number, content: string) => {
    return apiClient.put(`/chats/messages/${messageId}`, { content });
};

export const deleteMessage = async (messageId: number) => {
    return apiClient.delete(`/chats/messages/${messageId}`);
};
