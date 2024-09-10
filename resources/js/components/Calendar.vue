<template>
    <div>
        <h1>
            <button @click="prevMonth" class="nav-button">&lt;</button>
            {{ months[currentMonth] }} {{ currentYear }}
            <button @click="nextMonth" class="nav-button">&gt;</button>
        </h1>
        <table>
            <thead>
                <tr>
                    <th v-for="day in daysOfWeek" :key="day">{{ day }}</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(week, weekIndex) in weeks" :key="weekIndex">
                    <td v-for="(date, dayIndex) in week" :key="dayIndex">
                        <div v-if="date !== ''" class="date-cell">
                            <span
                                v-if="isDividendDate(date)"
                                class="dividend-cell"
                                @mouseover="showTooltip(date)"
                                @mouseleave="hideTooltip"
                            >
                                {{ date }}
                                <Tooltip
                                    v-if="tooltipDate === date"
                                    :text="getDividendText(formatDate(date))"
                                />
                            </span>
                            <span v-else>{{ date }}</span>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import Tooltip from "../components/ToolTip.vue";
import { useDividendStore } from "../store/dividends";

const dividenStore = useDividendStore();

interface DividendData {
    company: string;
    amount: string;
    date: string;
}

const months = [
    "Januari",
    "Februari",
    "Maart",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Augustus",
    "September",
    "Oktober",
    "November",
    "December",
];

const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
];

const currentMonth = ref(new Date().getMonth());
const currentYear = ref(new Date().getFullYear());

onMounted(async () => {
    await dividenStore.getAllfromFile();
});

// Computed dividend data from the store
const dividendData = computed(() => dividenStore.getAllfromState().value);

const startDay = computed(() => {
    const firstDay = new Date(
        new Date().getFullYear(),
        currentMonth.value,
        1
    ).getDay();
    return firstDay; // Adjusting so that Monday = 0, Tuesday = 1, ..., Sunday = 6
});

const getDaysInMonth = (month: number, year: number): number => {
    return new Date(year, month + 1, 0).getDate();
};

//Create Calendar based on the weeks of the selected month
const weeks = computed(() => {
    const daysInMonth = getDaysInMonth(currentMonth.value, currentYear.value);
    const weeksArray = [];
    let currentWeek = new Array(7).fill("");
    let day = 1;

    const firstDayOfMonth = new Date(
        currentYear.value,
        currentMonth.value,
        1
    ).getDay();
    const startDay = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1; // Adjusting so that Monday = 0, Tuesday = 1, ..., Sunday = 6

    // Fill the first week with empty cells until the start day
    for (let i = 0; i < startDay; i++) {
        currentWeek[i] = "";
    }

    // Fill the first week with the remaining days of May after the start day
    for (let i = startDay; i < 7; i++) {
        if (day <= daysInMonth) {
            currentWeek[i] = day++;
        }
    }
    weeksArray.push(currentWeek);

    // Fill the remaining weeks of May
    while (day <= daysInMonth) {
        currentWeek = new Array(7).fill("");
        for (let i = 0; i < 7 && day <= daysInMonth; i++) {
            currentWeek[i] = day++;
        }
        weeksArray.push(currentWeek);
    }

    return weeksArray;
});

// Function to go to the next month
const nextMonth = () => {
    if (currentMonth.value === 11) {
        currentMonth.value = 0;
        currentYear.value += 1;
    } else {
        currentMonth.value += 1;
    }
};

// Function to go to the previous month
const prevMonth = () => {
    if (currentMonth.value === 0) {
        currentMonth.value = 11;
        currentYear.value -= 1;
    } else {
        currentMonth.value -= 1;
    }
};

// Function to format date to YYYY-MM-DD
const formatDate = (day: number): string => {
    const year = new Date().getFullYear();
    const month = String(currentMonth.value + 1).padStart(2, "0");
    const dayStr = String(day).padStart(2, "0");
    return `${year}-${month}-${dayStr}`;
};

// Function to get dividend text for a given date
const getDividendText = (date: string): string => {
    // Filter the dividendData array to get the dividends for the specified date
    const dividends = dividendData.value.filter(
        (item) => item.paymentDates === date
    );

    // If no dividends are found for the date, return an empty string
    if (!dividends.length) return "";

    // Map the filtered dividends to a string containing the company name and amount
    return dividends
        .map((item) => `Stock ID ${item.stock_id}: ${item.dividendYield}`)
        .join("\n");
};

// Function to check if a date has dividends
const isDividendDate = (date: number): boolean => {
    const formattedDate = formatDate(date);
    return dividendData.value.some(
        (item) => item.paymentDates === formattedDate
    );
};

// Tooltip handling
const tooltipDate = ref<number | null>(null);

const showTooltip = (date: number) => {
    tooltipDate.value = date;
};

const hideTooltip = () => {
    tooltipDate.value = null;
};
</script>

<style scoped>
h1 {
    border: 1px solid #000; /* Border for h1 element */
    background-color: lightgrey;
    padding: 10px;
    text-align: center;
    margin: 0; /* Remove margin around the h1 element */
}
.nav-button {
    background: none;
    border: none;
    font-size: 1.5em;
    cursor: pointer;
    padding: 0 10px;
}

table {
    width: 100%;
    border-collapse: collapse;
    table-layout: fixed;
}
th,
td {
    border: 1px solid #000;
    width: 90px; /* Each cell takes up 1/7th of the table width */
    height: 90px; /* Set a fixed height for each cell */
    text-align: center;
    vertical-align: middle;
    color: orange; /* Highlighting new lines in orange */
    position: relative; /* Ensure td is the positioning context for absolute children */
}
th {
    background-color: #f2f2f2;
}

/* Style for the cell with dividend */
.dividend-cell {
    position: relative; /* Create a positioning context for the rectangle */
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.dividend-indicator {
    border: 1px solid #000;
    display: block;
    width: 10px; /* Adjusted width of the block */
    height: 10px; /* Adjusted height of the block */
    background-color: chartreuse; /* Set the background color to chartreuse */
    position: absolute; /* Position absolutely within the parent span */
    top: 2px; /* Adjust to position it near the top */
    right: 2px; /* Adjust to position it near the right */
}
/* Style for the dividend indicator */
.dividend-cell::after {
    content: "";
    display: block;
    width: 20px; /* Set the width of the rectangle */
    height: 10px; /* Set the height of the rectangle */
    background-color: chartreuse; /* Set the background color to green */
    border: 1px solid black; /* Set the border color to black */
    position: absolute; /* Position it absolutely within the td */
    top: 10px; /* Position it near the top */
    right: 10px; /* Position it near the right */
    pointer-events: none; /* Prevent the rectangle from interfering with hover */
}

/* Ensuring the date text stays centered */
.date-cell span {
    width: 100%;
    height: 100%;
    line-height: 90px; /* Match the height of the td to center text vertically */
}

[popover] {
    position: absolute;
    background-color: rgba(0, 0, 0, 0.7);
    color: white;
    padding: 5px;
    border-radius: 5px;
    z-index: 999; /* Ensure popover is on top of other elements */
    white-space: nowrap;
}
</style>

/* Style for the cell with dividend */ .dividend-cell { border: 1px solid #000;
content: ""; display: block; width: 25px; /* Set the width of the block */
height: 10px; /* Set the height of the block */ background-color: chartreuse; /*
Set the background color to chartreuse */ position: absolute; /* Position
absolutely within the td */ top: 10px; /* Adjust to position it near the top */
right: 10px; /* Adjust to position it near the right */ }
