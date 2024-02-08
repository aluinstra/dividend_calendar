<template>
    <!-- Empty template to allow Vue to recognize it as a valid component -->
</template>

<script setup>
import { ref, onMounted, defineProps, defineEmits } from "vue";
import { useDividendStore } from "../store/dividends.js";

const props = defineProps(["stockId"]);
const emit = defineEmits(["totalDividends", "dividendData"]);

const dividendStore = useDividendStore();
const dividendData = ref([]);

const isLoading = ref(true); // Default to true until data is loaded

onMounted(async () => {
    try {
        // Fetch and process dividend data
        const dividends = await dividendStore.getByStockId(props.stockId);
        dividendData.value = transformDividends(dividends);
        // set isLoading to true when loading succeeds
        isLoading.value = false;
        // Calculate dividend for current year
        totalDividendsCurrentYear();
        // Emit the dividend data
        emit("dividendData", dividendData.value);
    } catch (error) {
        console.error("Error fetching data for stockId:", props.stockId, error);
        // Handle the error gracefully, e.g., show a message to the user
    }
});

const transformDividends = (dividends) => {
    return dividends.map((dividend) => {
        const paymentYear = new Date(dividend.paymentDates).getFullYear();
        return [dividend.dividendYield, paymentYear];
    });
};

const totalDividendsCurrentYear = () => {
    // Check if data is still loading
    if (isLoading.value) {
        return 0;
    }

    // Check if there is no dividend data
    if (!dividendData.value || dividendData.value.length === 0) {
        return "No dividend data available";
    }

    // Get the current year
    const currentYear = new Date().getFullYear();

    // Filter dividends for the current year
    // console.log(dividendData.value);
    const dividendsForCurrentYear = dividendData.value.filter((dividend) => {
        const paymentYear = dividend[1];
        return paymentYear === currentYear;
    });

    // Calculate and return the total dividend for the current year
    const totalDividends = dividendsForCurrentYear.reduce(
        (total, dividend) => total + dividend[0],
        0
    );

    // Emit the totalDividends event
    emit("totalDividends", totalDividends);

    return totalDividends;
};
</script>
