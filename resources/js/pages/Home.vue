<template>
    <div v-if="isLoading">Loading...</div>
    <div v-else>
        <p>Today's dividend is: {{ currentDayDividend() }}</p>
        <p>This week's dividend is: {{ currentWeekDividend() }}</p>
        <p>This month's dividend is: {{ currentMonthDividend() }}</p>
        <p>This year's dividend is: {{ currentYearDividend() }}</p>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useDividendStore } from "@/store/dividends.js";

const dividendStore = useDividendStore();

// Initialize isLoading to true to show loading message initially
const isLoading = ref(true);

// Use an async function to fetch data and set isLoading to false when data is loaded
const fetchData = async () => {
    try {
        isLoading.value = true;

        // Fetch your data, for example:
        await Promise.all([dividendStore.getAllfromFile()]);

        // Now the data is loaded
        isLoading.value = false;
    } catch (error) {
        console.error("Error fetching data:", error);
        // Handle errors here
        isLoading.value = false; // Ensure isLoading is set to false in case of an error
    }
};

// Fetch data when the component is mounted
onMounted(async () => {
    await fetchData();
});

// Omzetten naar normale functie en opschonen vars
const getWeekNumber = function () {
    const d = new Date(
        Date.UTC(this.getFullYear(), this.getMonth(), this.getDate())
    );

    const dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);

    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));

    return Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
};

const currentDayDividend = () => {
    // Get the current date in 'YYYY-MM-DD' format
    // Todo Intl.DateTimeFormat

    const currentDate = new Date().toISOString().split("T")[0];
    // console.log(currentDate);

    if (isLoading.value) {
        // Data is still loading, return a loading message or some default value
        return "Loading...";
    }

    const dividends = dividendStore.getAllfromState().value;
    // console.log("div", dividends);
    if (!dividends || dividends.length === 0) {
        // No data or data is empty, handle this case
        return "No data available";
    }

    // for (let i = 0; i < dividends.length; i++) {
    //     console.log(i, dividends[i].paymentDates, dividends[i].dividendYield);
    // }

    // Calculate and return the dividend for the day
    let dividendForCurrentDay = 0;

    for (let i = 0; i < dividends.length; i++) {
        if (dividends[i].paymentDates === currentDate) {
            dividendForCurrentDay += dividends[i].dividendYield;
        }
    }

    return dividendForCurrentDay;
};

const currentWeekDividend = () => {
    if (isLoading.value) {
        // Data is still loading, return a loading message or some default value
        return "Loading...";
    }

    const dividends = dividendStore.getAllfromState().value;

    if (!dividends || dividends.length === 0) {
        // No data or data is empty, handle this case
        return "No data available";
    }

    // Get the current date
    const currentDate = new Date();

    const currentYear = currentDate.getFullYear();

    // Calculate the current week number
    const firstDayOfYear = new Date(currentYear, 0, 1);
    const daysPassed = Math.floor((currentDate - firstDayOfYear) / 86400000); // Milliseconds in a day
    const currentWeekNumber = Math.ceil(daysPassed / 7);

    // Initialize dividend for the week
    let dividendForCurrentWeek = 0;

    // Calculate and return the dividend for the week based on your data
    for (let i = 0; i < dividends.length; i++) {
        const paymentDate = new Date(dividends[i].paymentDates);
        const paymentYear = paymentDate.getFullYear();
        const paymentWeek = getWeekNumber.call(paymentDate);

        if (paymentYear === currentYear && paymentWeek === currentWeekNumber) {
            dividendForCurrentWeek += dividends[i].dividendYield;
        }
    }

    return dividendForCurrentWeek;
};
const currentMonthDividend = () => {
    const dividends = dividendStore.getAllfromState().value;

    if (!dividends || dividends.length === 0) {
        // No data or data is empty, handle this case
        return "No data available";
    }

    // Get the current date
    const currentDate = new Date().toISOString().split("T")[0];
    // console.log(currentDate);

    // Extract the current year and month from currentDate
    const currentYear = new Date(currentDate).getFullYear();
    const currentMonth = new Date(currentDate).getMonth() + 1; // Months are zero-based

    // Initialize dividend for the month
    let dividendForCurrentMonth = 0;

    // Calculate and return the dividend for the month based on your data
    for (let i = 0; i < dividends.length; i++) {
        const paymentDate = new Date(dividends[i].paymentDates);
        const paymentYear = paymentDate.getFullYear();
        const paymentMonth = paymentDate.getMonth() + 1; // Months are zero-based

        if (paymentYear === currentYear && paymentMonth === currentMonth) {
            dividendForCurrentMonth += dividends[i].dividendYield;
        }
    }

    return dividendForCurrentMonth;
};

const currentYearDividend = () => {
    if (isLoading.value) {
        // Data is still loading, return a loading message or some default value
        return "Loading...";
    }

    const dividends = dividendStore.getAllfromState().value;

    if (!dividends || dividends.length === 0) {
        // No data or data is empty, handle this case
        return "No data available";
    }

    // Get the current year
    const currentYear = new Date().getFullYear();

    // Initialize dividend for the year
    let dividendForCurrentYear = 0;

    // Calculate and return the dividend for the year based on your data
    for (let i = 0; i < dividends.length; i++) {
        const paymentDate = new Date(dividends[i].paymentDates);
        const paymentYear = paymentDate.getFullYear();

        if (paymentYear === currentYear) {
            dividendForCurrentYear += dividends[i].dividendYield;
        }
    }

    return dividendForCurrentYear;
};
</script>
