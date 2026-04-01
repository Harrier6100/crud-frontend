import { setLocale } from 'yup';
import i18n from '@/i18n';

const yupLocale = () => {
    setLocale({
        mixed: {
            required: ({ label }) => i18n.global.t('yup.required', { label }),
        },
    });
}

export default yupLocale;
