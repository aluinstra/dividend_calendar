<template>
    <div>
        <h2>Edit Stock</h2>
        <div v-if="showStockform">
            <StockForm
                @formSubmitted="editStock"
                :stock="editableStock"
                :companyError="companyError"
            />
        </div>
        <div v-else>
            <p>Loading...</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import axios from "axios";
import { ref, onMounted, defineProps } from "vue";
import { Stock } from "../store/stocks";

import StockForm from "../components/StockForm.vue";

const props = defineProps<{
    stockId: number;
}>();

const editableStock = ref<Stock>({
    id: 0,
    company: "",
    price: 0,
    quantity: 0,
    currency: "",
});

const showStockform = ref(true);
const companyError = ref("");

onMounted(async () => {
    try {
        const { data } = await axios.get<Stock>(`/api/stocks/${props.stockId}`);
        editableStock.value = { ...data };
    } catch (error) {
        console.error("Error fetching stock data:", error);
    }
});

// const editStock = async (credentials) => {};
</script>
