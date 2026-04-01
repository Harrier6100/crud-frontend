<template>
    <Button @click="sidebar.open">...</Button>
    <router-link to="/">
        <i class="fa fa-house"></i>
    </router-link>
    <NavbarLocale />
    <NavbarAuth />

    <Sidebar
        :isOpen="sidebar.isOpen.value"
        @close="sidebar.close"
    />
</template>

<script setup>
import { useToggle } from '@/composables/useToggle';

const sidebar = useToggle();
</script>
