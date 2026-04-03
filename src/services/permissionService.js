import api from './api';

export const permissionService = {
    fetch: async (params) => {
        const response = await api.get(`/api/crud/permissions`, { params });
        return response.data;
    },
    get: async (id) => {
        const response = await api.get(`/api/crud/permissions/${id}`);
        return response.data;
    },
    create: async (data) => {
        const response = await api.post(`/api/crud/permissions`, data);
        return response.data;
    },
    update: async (id, data) => {
        const response = await api.put(`/api/crud/permissions/${id}`, data);
        return response.data;
    },
    delete: async (id) => {
        const response = await api.delete(`/api/crud/permissions/${id}`);
        return response.data;
    },
};
