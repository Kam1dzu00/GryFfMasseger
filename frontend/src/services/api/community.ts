import apiClient from './client';

export const getCommunities = async (query?: string) => {
    return apiClient.get(`/communities${query ? `?q=${query}` : ''}`);
};

export const createCommunity = async (data: any) => {
    return apiClient.post('/communities', data);
};

export const getCommunity = async (id: string) => {
    return apiClient.get(`/communities/${id}`);
};

export const toggleCommunityMembership = async (id: string) => {
    return apiClient.post(`/communities/${id}/join`);
};

export const createCommunityPost = async (id: string, content: string, mediaUrl?: string) => {
    return apiClient.post(`/communities/${id}/wall`, { content, mediaUrl });
};

// Discussions
export const getDiscussions = async (communityId: string) => {
    return apiClient.get(`/communities/${communityId}/discussions`);
};

export const createDiscussion = async (communityId: string, title: string, content: string) => {
    return apiClient.post(`/communities/${communityId}/discussions`, { title, content });
};

export const getDiscussionDetails = async (id: string) => {
    return apiClient.get(`/communities/discussions/${id}`);
};

export const addDiscussionComment = async (id: string, content: string) => {
    return apiClient.post(`/communities/discussions/${id}/comments`, { content });
};
