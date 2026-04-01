import dayjs from 'dayjs';

const format = (timestamp, style) => {
    if (!timestamp) return '';
    return dayjs(timestamp).format(style);
};

export const formatDate = (timestamp) => {
    return format(timestamp, 'YYYY-MM-DD');
};

export const formatTime = (timestamp) => {
    return format(timestamp, 'HH:mm:ss');
};

export const formatDateTime = (timestamp) => {
    return format(timestamp, 'YYYY-MM-DD HH:mm:ss');
};
