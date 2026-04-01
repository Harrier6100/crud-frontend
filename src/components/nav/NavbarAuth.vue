<template>
    <template v-if="isLogin">
        <span>{{ name }}</span>
        <Button @click="onLogout">{{ t('button.logout') }}</Button>
    </template>
    <template v-else>
        <Button @click="modals.login.open">{{ t('button.login') }}</Button>
    </template>

    <Login
        :isOpen="modals.login.state.isOpen"
        @close="modals.login.close"
    />
</template>

<script setup>
import { useSession } from '@/composables/useSession';
import { useUser } from '@/composables/useUser';
import { useModal } from '@/composables/useModal';

const router = useRouter();
const { t } = useI18n();
const { isLogin, endSession } = useSession();
const { name } = useUser();
const modals = reactive({ login: useModal() });

const onLogout = async () => {
    const ok = await confirm(t('confirm.logout'));
    if (!ok) return;

    await endSession();
    router.push('/');
};
</script>
