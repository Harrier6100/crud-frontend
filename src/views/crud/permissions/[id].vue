<template>
    <h4>{{ routeId ? t('menu.permissions_id') : t('menu.permissions_new') }}</h4>
    <Form @submit.prevent="onSave">
        <div>
            <Label>{{ t('permissions.id') }}</Label>
            <Input v-model="form.id" :readonly="!!routeId" />
            <Message :error="errors.id" />
        </div>
        <div>
            <Label>{{ t('permissions.name') }}</Label>
            <Input v-model="form.name" />
            <Message :error="errors.name" />
        </div>
        <div>
            <Label>{{ t('permissions.remarks') }}</Label>
            <Textarea v-model="form.remarks" />
        </div>
        <div>
            <Checkbox id="isActive" v-model="form.isActive" />
            <Label for="isActive">{{ form.isActive ? t('permissions.is_active_true') : t('permissions.is_active_false') }}</Label>
        </div>
        <Button type="submit" :disabled="isLoading">{{ t('button.save') }}<span v-if="isSpinning">...</span></Button>
        <Button @click="onBack">{{ t('button.back') }}</Button>
    </Form>
</template>

<script setup>
import * as yup from 'yup';
import { permissionService } from '@/services/permissionService';
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

const { id: routeId } = route.params;
const form = reactive({
    id: '',
    name: '',
    remarks: '',
    isActive: true,
});

const schema = yup.object({
    id: yup.string().required().label(t('permissions.id')),
    name: yup.string().required().label(t('permissions.name')),
});

onMounted(async () => {
    const id = routeId || route.query.id;
    if (!id) return;

    await execute(async () => {
        const permission = await permissionService.get(id);
        Object.assign(form, permission);
    });
});

const onSave = async () => {
    const ok = await validate(schema, form);
    if (!ok) return;

    try {
        await execute(async () => {
            await spin(async () => {
                if (!routeId) await permissionService.create(form);
                if (routeId) await permissionService.update(routeId, form);
                addToast(t('success.save'));
            });
        });
    } catch (err) {
        const error = errorHandler(err);
        addToast(t(error.message), 'error');
    }
};

const onBack = () => {
    router.push(
        route.query.from ??
        { name: 'Permissions' }
    );
};
</script>
