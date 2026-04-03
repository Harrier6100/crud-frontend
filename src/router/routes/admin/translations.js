export default [
    {
        path: '/translations',
        name: 'Translations',
        component: () => import('@/views/crud/translations/index.vue'),
        meta: {
            requiresAuth: true,
            permission: 'translations:read',
        },
    },
    {
        path: '/translations/new',
        name: 'Translations[new]',
        component: () => import('@/views/crud/translations/[id].vue'),
        meta: {
            requiresAuth: true,
            permission: 'translations:create',
        },
    },
    {
        path: '/translations/:id',
        name: 'Translations[id]',
        component: () => import('@/views/crud/translations/[id].vue'),
        meta: {
            requiresAuth: true,
            permission: 'translations:update',
        },
    },
];
