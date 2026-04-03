export default [
    {
        path: '/permissions',
        name: 'Permissions',
        component: () => import('@/views/crud/permissions/index.vue'),
        meta: {
            requiresAuth: true,
            permission: 'permissions:read',
        },
    },
    {
        path: '/permissions/new',
        name: 'Permissions[new]',
        component: () => import('@/views/crud/permissions/[id].vue'),
        meta: {
            requiresAuth: true,
            permission: 'permissions:create',
        },
    },
    {
        path: '/permissions/:id',
        name: 'Permissions[id]',
        component: () => import('@/views/crud/permissions/[id].vue'),
        meta: {
            requiresAuth: true,
            permission: 'permissions:update',
        },
    },
];
