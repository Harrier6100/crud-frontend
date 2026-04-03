<template>
    <h4>{{ t('menu.purchase_orders') }}</h4>
    <Form @submit.prevent="onSearch">
        <div>
            <Label>{{ t('purchase_orders.purchase_id') }}</Label>
            <Input v-model="form.purchaseId" />
        </div>
        <div>
            <Label>{{ t('purchase_orders.due_date') }}</Label>
            <DatePicker v-model="form.dueDateFrom" format="YYYYMMDD" :placeholder="t('label.from')" />
            <DatePicker v-model="form.dueDateTo" format="YYYYMMDD" :placeholder="t('label.to')" />
        </div>
        <div>
            <Label>{{ t('purchase_orders.material_code') }}</Label>
            <Input v-model="form.materialCode" />
        </div>
        <div>
            <Label>{{ t('purchase_orders.material_name') }}</Label>
            <Input v-model="form.materialName" />
        </div>
        <div>
            <Label>{{ t('purchase_orders.supplier_code') }}</Label>
            <Input v-model="form.supplierCode" />
        </div>
        <div>
            <Label>{{ t('purchase_orders.supplier_name') }}</Label>
            <Input v-model="form.supplierName" />
        </div>
        <Button type="submit" :disabled="isLoading">{{ t('button.search') }}<span v-if="isSpinning">...</span></Button>
        <Button @click="onClear">{{ t('button.clear') }}</Button>
        <Message :error="errors.error" />
    </Form>
    <table>
        <thead>
            <tr>
                <Th sortKey="purchaseId" :orderBy="orderBy" @sort="sortBy">{{ t('purchase_orders.purchase_id') }}</Th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(row, index) of sortedData" :key="index">
                <Td>{{ row.purchaseId }}</Td>
                <Td>{{ row.purchaseNumber }}</Td>
                <Td>{{ row.orderDate }}</Td>
                <Td>{{ row.dueDate }}</Td>
                <Td>{{ row.materialCode }}</Td>
                <Td>{{ row.materialName }}</Td>
                <Td>{{ row.materialWidth }}</Td>
                <Td>{{ row.materialLength }}</Td>
                <Td>{{ row.materialVolume }}</Td>
                <Td>{{ row.orderQty }}</Td>
                <Td>{{ row.orderQtyUom }}</Td>
                <Td>{{ row.openQtyUom }}</Td>
                <Td>{{ row.supplierCode }}</Td>
                <Td>{{ row.supplierName }}</Td>
            </tr>
        </tbody>
    </table>
</template>

<script setup>
import * as yup from 'yup';
import { purchaseOrderService } from '@/services/purchaseOrderService';
import { useLoading } from '@/composables/useLoading';
import { useSpinning } from '@/composables/useSpinning';
import { useDataTable } from '@/composables/useDataTable';
import { useYup } from '@/composables/useYup';

const { t } = useI18n();
const { isLoading, execute } = useLoading();
const { isSpinning, spin } = useSpinning();
const { errors, validate } = useYup();

const purchaseOrders = ref([]);
const { sortedData, sortBy, orderBy } = useDataTable(purchaseOrders);

const formRestore = () => ({
    purchaseId: '',
    dueDateFrom: '',
    dueDateTo: '',
    materialCode: '',
    materialName: '',
    supplierCode: '',
    supplierName: '',
});
const form = reactive(formRestore());

const schema = yup.object().test(
    'filter-required',
    t('error.filter_required'),
    (value) => Object.values(value).some(v => v !== '' && v !== null && v !== undefined)
);

const onSearch = async () => {
    const ok = await validate(schema, form);
    if (!ok) return;

    await execute(async () => {
        await spin(async () => {
            purchaseOrders.value = await purchaseOrderService.search(form);
        });
    });
};

const onClear = () => {
    Object.assign(form, formRestore());
};
</script>
