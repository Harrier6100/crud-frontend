<template>
    <teleport to="body">
        <div v-if="isOpen">
            <Button @click="emit('close')">{{ t('button.close_x') }}</Button>
            <Form @submit.prevent="onLogin">
                <div>
                    <Input v-model="form.id" :placeholder="t('placeholder.id')" />
                    <Message :error="errors.id" />
                </div>
                <div>
                    <Input v-model="form.password" type="password" :placeholder="t('placeholder.password')" />
                    <Message :error="errors.password" />
                </div>
                <Button type="submit" :disabled="isLoading">{{ t('button.login') }}<span v-if="isSpinning">...</span></Button>
                <Message :error="errors.form" />
            </Form>
        </div>
    </teleport>
</template>

<script setup>
import * as yup from 'yup';
import { errorHandler } from '@/helpers/errorHandler';
import { useSession } from '@/composables/useSession';
import { useLoading } from '@/composables/useLoading';
import { useSpinning } from '@/composables/useSpinning';
import { useYup } from '@/composables/useYup';

const props = defineProps({
    isOpen: Boolean,
});
const emit = defineEmits(['close']);

const { t } = useI18n();
const { startSession } = useSession();
const { isLoading, execute } = useLoading();
const { isSpinning, spin } = useSpinning();
const { errors, validate } = useYup();

const form = reactive({
    id: '',
    password: '',
});

const schema = yup.object({
    id: yup.string().required().label(t('placeholder.id')),
    password: yup.string().required().label(t('placeholder.password')),
});

watch(() => props.isOpen, (isOpen) => {
    if (!isOpen) {
        form.id = '';
        form.password = '';
        errors.value = {};
    }
});

const onLogin = async () => {
    const ok = await validate(schema, form);
    if (!ok) return;

    try {
        await execute(async () => {
            await spin(async () => {
                await startSession(form);
                emit('close');
            });
        });
    } catch (err) {
        const error = errorHandler(err);
        errors.value.form = t(error.message);
    }
};
</script>
