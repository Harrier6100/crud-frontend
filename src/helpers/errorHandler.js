export const errorHandler = (err) => {
    if (!err.response) {
        return { message: err.message };
    }

    const { status, message } = err.response.data;
    return { status, message: message ? `error.${message.toLowerCase()}` : 'error.unknown' };
};
