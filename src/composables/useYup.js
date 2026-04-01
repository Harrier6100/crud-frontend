export const useYup = () => {
    const errors = ref({});

    const validate = async (schema, form) => {
        try {
            errors.value = {};
            await schema.validate(form, { abortEarly: false });
            return true;
        } catch (err) {
            if (Array.isArray(err.inner)) {
                err.inner.forEach(e => {
                    errors.value[e.path || 'error'] = e.message;
                });
            }
            return false;
        }
    };

    return {
        errors,
        validate,
    };
};