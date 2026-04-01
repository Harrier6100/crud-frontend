<template>
    <input
        ref="inputRef"
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        @input="$emit('update:modelValue', $event.target.value)"
    />
</template>

<script setup>
defineProps({
    type: {
        type: String,
        default: 'text',
    },
    modelValue: String,
    placeholder: String,
    disabled: {
        type: Boolean,
        default: false,
    },
});

const inputRef = ref(null);

defineExpose({ inputRef });
</script>
