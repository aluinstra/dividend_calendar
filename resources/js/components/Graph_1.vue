<template>
    <h1>Graph One</h1>
    <div v-if="dividendData && dividendData.length > 0">
        <canvas id="myChart"></canvas>
    </div>
    <div v-else>
        <p>Loading or no data available...</p>
    </div>
</template>

<script setup>
import { onMounted, watch, defineProps } from "vue";
import Chart from "chart.js/auto";

const { dividendData } = defineProps(["dividendData"]);

console.log("div-data", dividendData);
let myChart;

onMounted(() => {
    // Render the chart
    renderChart();
});

const renderChart = () => {
    console.log("Render", dividendData);
    const ctx = document.getElementById("myChart").getContext("2d");

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
