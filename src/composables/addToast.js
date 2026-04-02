import { useToastStore } from '@/stores/useToastStore';

export const addToast = (message, variant = 'success') => {
    const store = useToastStore();
    store.addToast(message, variant);
};
