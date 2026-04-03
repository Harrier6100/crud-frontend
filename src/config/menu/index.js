export default {
    top: [
        {
            label: 'menu.admin',
            routeNext: 'admin',
        },
        {
            label: 'menu.purchase',
            routeNext: 'purchase',
        },
    ],
    admin: [
        {
            label: 'menu.permissions',
            routeName: 'Permissions',
        },
        {
            label: 'menu.translations',
            routeName: 'Translations',
        },
        {
            label: 'menu.users',
            routeName: 'Users',
        },
    ],
    purchase: [
        {
            label: 'menu.purchase_orders',
            routeName: 'PurchaseOrders',
        }
    ],
};
