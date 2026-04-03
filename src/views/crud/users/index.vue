<template>
    <h4>{{ t('menu.users') }}</h4>
    <Input v-model="keyword" :placeholder="t('placeholder.filter')" @input="page = 1" />
    <Button v-can="'users:create'" @click="onCreate">{{ t('button.create_new') }}</Button>
    <table>
        <thead>
            <tr>
                <Th sortKey="id" :orderBy="orderBy" @sort="sortBy">{{ t('users.id') }}</Th>
                <Th sortKey="name" :orderBy="orderBy" @sort="sortBy">{{ t('users.name') }}</Th>
                <Th sortKey="isActive" :orderBy="orderBy" @sort="sortBy">{{ t('users.is_active') }}</Th>
                <Th sortKey="createdAt" :orderBy="orderBy" @sort="sortBy">{{ t('users.created_at') }}</Th>
                <Th sortKey="createdBy" :orderBy="orderBy" @sort="sortBy">{{ t('users.created_by') }}</Th>
                <Th sortKey="updatedAt" :orderBy="orderBy" @sort="sortBy">{{ t('users.updated_at') }}</Th>
                <Th sortKey="updatedBy" :orderBy="orderBy" @sort="sortBy">{{ t('users.updated_by') }}</Th>
                <Th></Th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="user in paginatedData" :key="user.id">
                <Td>{{ user.id }}</Td>
                <Td>{{ user.name }}</Td>
                <Td>{{ user.isActive ? t('users.is_active_true') : t('users.is_active_false') }}</Td>
                <Td>{{ formatDateTime(user.createdAt) }}</Td>
                <Td>{{ user.createdBy }}</Td>
                <Td>{{ formatDateTime(user.updatedAt) }}</Td>
                <Td>{{ user.updatedBy }}</Td>
                <Td>
                    <Button v-can="'users:update'" @click="onUpdate(user.id)">{{ t('button.edit') }}</Button>
                </Td>
            </tr>
        </tbody>
    </table>
    <Pagination v-model:page="page" :pageCount="pageCount" />
</template>

<script setup>
import { userService } from '@/services/userService';
import { formatDateTime } from '@/utils/dateTime';
import { useLoading } from '@/composables/useLoading';
import { useDataTable } from '@/composables/useDataTableSync';

const route = useRoute();
const router = useRouter();
const { t } = useI18n();
const { execute } = useLoading();

const users = ref([]);
const { keyword, page, pageCount, paginatedData, sortBy, orderBy } = useDataTable(users);

onMounted(async () => {
    await execute(async () => {
        users.value = await userService.fetch();
    });
});

const onCreate = () => {
    router.push({
        name: 'Users[new]',
        query: { from: route.fullPath },
    });
};

const onUpdate = (id) => {
    router.push({
        name: 'Users[id]',
        params: { id },
        query: { from: route.fullPath },
    });
};
</script>