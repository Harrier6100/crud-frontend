<template>
    <h4>{{ routeId ? t('menu.users_id') : t('menu.users_new') }}</h4>
    <Form @submit.prevent="onSave">
        <div>
            <Label>{{ t('users.id') }}</Label>
            <Input v-model="form.id" :readonly="!!routeId" />
            <Message :error="errors.id" />
        </div>
        <div>
            <Label>{{ t('users.name') }}</Label>
            <Input v-model="form.name" />
            <Message :error="errors.name" />
        </div>
        <div>
            <Label>{{ t('users.language') }}</Label>
            <Select v-model="form.language">
                <option value="ja">{{ t('users.language_ja') }}</option>
                <option value="en">{{ t('users.language_en') }}</option>
            </Select>
        </div>
        <div>
            <Label>{{ t('users.role') }}</Label>
            <div v-for="role in roles" :key="role.value">
                <Radio :id="role.value" :value="role.value" v-model="form.role" />
                <Label :for="role.value">{{ t(role.label) }}</Label>
            </div>
        </div>
        <div>
            <Label>{{ t('users.remarks') }}</Label>
            <Textarea v-model="form.remarks"></Textarea>
        </div>
        <div>
            <Checkbox id="isActive" v-model="form.isActive" />
            <Label for="isActive">{{ form.isActive ? t('users.is_active_true') : t('users.is_active_false') }}</Label>
        </div>
        <Button type="button">{{ t('button.save') }}<span v-if="isSpinning">...</span></Button>
        <Button @click="onBack">{{ t('button.back') }}</Button>
    </Form>
</template>

<script setup>
import * as yup from 'yup';
import { userService } from '@/services/userService';
import { errorHandler } from '@/helpers/errorHandler';
import { useLoading } from '@/composables/useLoading';
import { useSpinning } from '@/composables/useSpinning';
import { useYup } from '@/composables/useYup';

const route = useRoute();
const router = useRouter();
const { t } = useI18n();
const { isLoading, execute } = useLoading();
const { isSpinning, spin } = useSpinning();
const { errors, validate } = useYup();

const roles = [
    { value: 'admin', label: 'users.role_admin' },
    { value: 'user', label: 'users.role_user' },
    { value: 'guest', label: 'users.role_guest' },
];

const { id: routeId } = route.params;
const form = reactive({
    id: '',
    name: '',
    language: 'ja',
    role: 'user',
    permissions: [],
    expiryDate: '',
    remarks: '',
    isActive: true,
});

const schema = yup.object({
    id: yup.string().required().label(t('users.id')),
    name: yup.string().required().label(t('users.name')),
});

onMounted(async () => {
    if (!routeId) return;

    await execute(async () => {
        const data = await userService.get(routeId);
        Object.assign(form, data);
    });
});

const onSave = async () => {
    const ok = await validate(schema, form);
    if (!ok) return;

    try {
        await execute(async () => {
            await spin(async () => {
                if (!routeId) await userService.create(form);
                if (routeId) await userService.update(routeId, form);
            });
        });
    } catch (err) {
        const error = errroHandler(err);
    }
};

const onBack = () => {
    const { from } = route.query;
    router.push(from ?? { name: 'Users' });
};
</script>
