<template>
    <div class="stock-overview">
        <h2>Stock Overview</h2>
        <div class="table-container">
            <div v-if="isLoading">Loading stocks...</div>
            <div v-else>
                <table>
                    <thead>
                        <tr>
                            <th>Company</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Dividend Yield</th>
                            <th>Frequency</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(stock, index) in stocks" :key="index">
                            <td>{{ stock.company }}</td>
                            <td>{{ stock.price }}</td>
                            <td>{{ stock.quantity }}</td>
                            <td>
                                {{ calculateTotalDividendsForYear(stock.id) }}
                            </td>
                            <td>{{ stock.frequency }}</td>
                            <td>
                                <button
                                    class="show-button"
                                    @click="showStock(stock)"
                                >
                                    Show
                                </button>
                                <button
                                    class="delete-button"
                                    @click="deleteStock(stock)"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <td>Sum</td>
                            <td>Total:</td>
                            <td>{{ calculateTotal("price") }}</td>
                            <td></td>
                            <td>{{ calculateTotal("quantity") }}</td>
                            <td></td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useStockstore } from "@/store/stocks";
import { useDividendStore } from "@/store/dividends";

const router = useRouter();
const stockStore = useStockstore();
const dividendStore = useDividendStore();

// Initialize isLoading to true to show loading message initially
const isLoading = ref(true);

// fetchStocks();
const stocks = stockStore.getAllfromState();
// fetchDividends();
const dividends = dividendStore.getAllfromState();

// Use an async function to fetch data and set isLoading to false when data is loaded
const fetchData = async () => {
    isLoading.value = true; // Show loading message

    await Promise.all([
        stockStore.getAllfromFile(),
        dividendStore.getAllfromFile(),
    ]);

    isLoading.value = false; // Data is loaded, hide loading message
};

// Fetch data when the component is mounted
onMounted(async () => {
    await fetchData();
});

function calculateTotalDividendsForYear(stockID) {
    const currentYear = new Date().getFullYear();

    // Filter dividends for the specified stock ID and current year
    // Calculate the total dividends for the filtered data
    return dividends.value
        .filter(
            (dividend) =>
                dividend.stock_id === stockID &&
                new Date(dividend.paymentDates).getFullYear() === currentYear
        )
        .reduce((total, dividend) => total + dividend.dividendYield, 0)
        .toFixed(2);
}

const showStock = (stock) => {
    // Handle showing the details of the selected stock
    console.log("Show stock:", stock);
    router.push({ name: "Show", params: { id: stock.id } });
};

const deleteStock = async (stock) => {
    // Handle deleting the stock
    try {
        await stockStore.deleteFromDB(stock.id);
        console.log("Stock deleted:", stock);
        // Perform any additional actions after successful deletion
    } catch (error) {
        console.error("Error deleting stock:", error);
        // Handle the error case
    }
};

const calculateTotal = (field) => {
    console.log(stocks);

    return stocks.value
        .reduce((total, stock) => {
            return total + parseFloat(stock[field]);
        }, 0)
        .toFixed(2);
};
</script>

<style scoped>
/* Add your custom styles for the StockOverview component here */
.stock-overview {
    width: 800px;
    margin: 0 auto;
}

.table-container {
    border: 1px solid #ccc;
    border-radius: 10px;
    overflow: hidden;
    margin-top: 20px;
}

table {
    width: 100%;
    border-collapse: collapse;
}

th,
td {
    padding: 10px;
    text-align: left;
}

th {
    background-color: #007bff;
    color: #fff;
}

tr:nth-child(even) {
    background-color: #f2f2f2;
}

.show-button {
    background-color: #007bff;
    color: #fff;
    border: none;
    padding: 5px 10px;
    margin-right: 5px;
    border-radius: 5px;
    cursor: pointer;
}

.delete-button {
    background-color: #dc3545;
    color: #fff;
    border: none;
    padding: 5px 10px;
    border-radius: 5px;
    cursor: pointer;
}

.show-button:hover {
    background-color: #0056b3; /* Darker shade of the original color */
}

.delete-button:hover {
    background-color: #b30000; /* Darker shade of the original color */
}

.company-name {
    cursor: pointer;
    position: relative;
}

.company-name::after {
    content: attr(abra);
    position: absolute;
    top: -20px;
    left: 50%;
    transform: translateX(-50%);
    background-color: #fff;
    color: #000;
    padding: 5px 10px;
    border-radius: 5px;
    white-space: nowrap;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.2s, visibility 0.2s;
}

.company-name:hover::after {
    opacity: 1;
    visibility: visible;
}
</style>
