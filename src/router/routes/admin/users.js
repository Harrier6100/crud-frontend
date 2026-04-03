export default [
    {
        path: '/users',
        name: 'Users',
        component: () => import('@/views/crud/users/index.vue'),
        meta: {
            requiresAuth: true,
            permission: 'users:read',
        },
    },
    {
        path: '/users/new',
        name: 'Users[new]',
        component: () => import('@/views/crud/users/[id].vue'),
        meta: {
            requiresAuth: true,
            permission: 'users:create',
        },
    },
    {
        path: '/users/:id',
        name: 'Users[id]',
        component: () => import('@/views/crud/users/[id].vue'),
        meta: {
            requiresAuth: true,
            permission: 'users:update',
        },
    },
];
