<template>
    <th
        :role="sortable ? 'button' : undefined"
        :class="{ 'sortable': sortable }"
        @click="onSort"
        @mousedown.prevent
    >
        <slot></slot>
        <span v-if="order.asc">↑</span>
        <span v-else-if="order.desc">↓</span>
    </th>
</template>

<script setup>
const props = defineProps({
    sortKey: String,
    orderBy: Function,
});
const emit = defineEmits(['sort']);

const sortable = computed(() => {
    return !!props.sortKey && typeof props.orderBy === 'function';
});

const order = computed(() => {
    if (!sortable.value) return {};
    return props.orderBy(props.sortKey);
});

const onSort = () => {
    if (!sortable.value) return;
    emit('sort', props.sortKey);
};
</script>

<style scoped>
.sortable {
    cursor: pointer;
}
</style>
