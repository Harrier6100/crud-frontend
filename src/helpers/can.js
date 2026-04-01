export const can = (meta, user) => {
    const { requiresAuth, permission: required } = meta;
    const { isLogin, role, permissions } = user;

    if (role === 'admin') {
        return { ok: true };
    }

    if (!requiresAuth) {
        return { ok: true };
    }

    if (!isLogin) {
        return { ok: false, reason: 'unauthorized' };
    }

    const has = required ? permissions.includes(required) : true;
    if (!has) {
        return { ok: false, reason: 'forbidden' };
    }

    return { ok: true };
};
