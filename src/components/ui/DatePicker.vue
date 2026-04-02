<template>
    <DatePicker v-model="innerValue" :masks="masks" :popover="popover" :attributes="attributes" :disabled-dates="disabledDates">
        <template #default="{ inputValue, inputEvents }">
            <Input :value="inputValue" :placeholder="placeholder" v-on="inputEvents" />
        </template>
    </DatePicker>
</template>

<script setup>
import dayjs from 'dayjs';
import { DatePicker } from 'v-calendar';
import 'v-calendar/style.css';

const props = defineProps({
    modelValue: String,
    format: {
        type: String,
        default: 'YYYY-MM-DD',
    },
    placeholder: String,
    min: {
        type: String,
        default: null,
    },
});
const emit = defineEmits(['update:modelValue']);

const innerValue = computed({
    get() {
        if (!props.modelValue) return '';
        return dayjs(props.modelValue, props.format).toDate();
    },
    set(value) {
        const formatted = value ? dayjs(value).format(props.format) : '';
        emit('update:modelValue', formatted);
    }
});

const disabledDates = computed(() => {
    if (!props.min) return [];
    return [{ start: null, end: dayjs(props.min).subtract(1, 'day').toDate() }];
});

const masks = {
    input: 'YYYY-MM-DD'
};

const popover = {
    visibility: 'click'
};

const attributes = [
    {
        dot: true,
        dates: new Date(),
    }
];
</script>
