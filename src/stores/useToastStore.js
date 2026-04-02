export const useToastStore = defineStore('toast', () => {
    const toasts = ref([]);

    const addToast = (message, variant = 'success', delay = 5000) => {
        const id = Date.now();
        toasts.value.push({ id, message, variant });
        setTimeout(() => removeToast(id), delay);
    };

    const removeToast = (id) => {
        toasts.value = toasts.value.filter(toast => toast.id !== id);
    };

    return {
        toasts,
        addToast,
        removeToast,
    };
});
