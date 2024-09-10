<template>
    <h1>Graph One</h1>
    <div v-if="dividendData && dividendData.length > 0">
        <canvas ref="canvasElement"></canvas>
    </div>
    <div v-else>
        <p>Loading or no data available...</p>
    </div>
</template>

<script setup lang="ts">
import { onMounted, watch, defineProps, ref } from "vue";
import Chart from "chart.js/auto";
import { DividendData } from "../composables/DividendProcessor";

const props = defineProps<{ dividendData: DividendData[] }>();

const { dividendData } = props;

console.log("div-data", dividendData);

const canvasElement = ref<HTMLCanvasElement>();
let myChart: Chart;

onMounted(() => {
    // Render the chart
    renderChart();
});

const renderChart = () => {
    console.log("Render", dividendData);
    const ctx = canvasElement.value?.getContext("2d");
    if (!ctx) return;
    myChart = new Chart(ctx, {
        type: "bar",
        data: {
            labels: dividendData.map((entry) => entry[1]), // Assuming the year is at index 1
            datasets: [
                {
                    label: "Dividends",
                    data: dividendData.map((entry) => entry[0]), // Assuming the dividend is at index 0
                    backgroundColor: ["rgba(255, 99, 132, 0.2)"],
                    borderColor: ["rgba(255, 99, 132, 1)"],
                    borderWidth: 1,
                },
            ],
        },
    });
};

watch(
    () => dividendData,
    () => {
        console.log(dividendData);
        if (dividendData) {
            myChart.data.labels = dividendData.map((entry) => entry[1]);
            myChart.data.datasets[0].data = dividendData.map(
                (entry) => entry[0]
            );
            myChart.update();
        }
    }
);
</script>
