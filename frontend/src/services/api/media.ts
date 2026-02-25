import apiClient from './client';

export const uploadFile = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    return apiClient.post('/media/upload', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
};

export const getUserPhotos = async (userId: string) => {
    return apiClient.get(`/media/user/${userId}/photos`);
};

export const getCommunityPhotos = async (communityId: string) => {
    return apiClient.get(`/media/community/${communityId}/photos`);
};
