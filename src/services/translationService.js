import api from './api';

export const translationService = {
    fetch: async (params) => {
        const response = await api.get(`/api/crud/translations`, { params });
        return response.data;
    },
    get: async (id) => {
        const response = await api.get(`/api/crud/translations/${id}`);
        return response.data;
    },
    create: async (data) => {
        const response = await api.post(`/api/crud/translations`, data);
        return response.data;
    },
    update: async (id, data) => {
        const response = await api.put(`/api/crud/translations/${id}`, data);
        return response.data;
    },
    delete: async (id) => {
        const response = await api.delete(`/api/crud/translations/${id}`);
        return response.data;
    },
};
