import apiClient from './client';

export const searchUsers = async (query: string) => {
    return apiClient.get(`/auth/users/search?q=${query}`);
};

export const getProfile = async (userId: string) => {
    return apiClient.get(`/auth/users/${userId}`);
};

export const updateProfile = async (data: any) => {
    return apiClient.put(`/auth/users/profile`, data);
};

export const createWallPost = async (userId: string, content: string, mediaUrl?: string) => {
    return apiClient.post(`/auth/users/${userId}/wall`, { content, mediaUrl });
};

// Friends
export const getFriends = async (userId: string) => {
    return apiClient.get(`/auth/users/${userId}/friends`);
};

export const getFriendshipStatus = async (targetId: number) => {
    return apiClient.get(`/auth/friends/status/${targetId}`);
};

export const sendFriendRequest = async (targetId: number) => {
    return apiClient.post('/auth/friends/request', { targetId });
};

export const acceptFriendRequest = async (requesterId: number) => {
    return apiClient.post('/auth/friends/accept', { requesterId });
};

export const removeFriend = async (targetId: number) => {
    return apiClient.post('/auth/friends/remove', { targetId });
};
