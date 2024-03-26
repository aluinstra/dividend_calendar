<template>
    <h1>Show Stock</h1>
    <div v-if="stock">
        <h2>{{ stock.name }}</h2>
        <p>Symbol: {{ stock.company }}</p>
        <p>Price: {{ stock.price }}</p>
        <p>Dividend: {{ totalDividendsCurrentYearForStock }}</p>
        <!-- Other stock information goes here -->
        <Graph_1 v-if="dividendData" :dividendData="dividendData" />
        <!-- <Graph_1 :stockData="stock.data" /> -->
    </div>
    <div v-else>
        <p>Loading...</p>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import { useStockstore } from "../store/stocks.js";
import { useDividendProcessor } from "../composables/DividendProcessor";
import Graph_1 from "./../components/Graph_1.vue";

const route = useRoute();
const stockStore = useStockstore();

const stockId = Number(route.params.id);
const stock = ref<{ name: string; company: string; price: number }>();

const { dividendData, totalDividendsCurrentYearForStock, error } =
    useDividendProcessor(stockId);

// const dividendProcessor = useDividendProcessor(stockId.value);

// const dividendData = [
//     [9, 2004],
//     [8, 2004],
//     [20, 2005],
// ];

// Default to true until data is loaded
const isLoading = ref(true);

// Fetch stock data when the component is mounted
onMounted(async () => {
    try {
        console.log("route", route.params.id);

        // Fetch stock data
        stock.value = await stockStore.getByID(stockId);
        // Data loading is complete
        isLoading.value = false;
    } catch (error) {
        console.log("Failed retrieving stocks:", error);
        isLoading.value = true;
    }
});

// const dividendProcessor = computed(() => useDividendProcessor(stockId.value));

// Check if const stockId changed when retrieving id from route
// watch(stockId, (newStockId, oldStockId) => {
//     console.log("stockId changed:", newStockId);
// });
</script>
