import apiClient from './client';

export const getNewsFeed = async () => {
    return apiClient.get('/feed');
};
