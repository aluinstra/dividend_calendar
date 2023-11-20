<template>
    <div class="add-to-container">
        <h2>Add To Component</h2>
        <div v-if="showStockform">
            <StockForm
                @formSubmitted="addStock"
                @submitAndContinue="handleSubmitAndContinue"
                :companyError="companyError"
            />
        </div>
        <div v-if="showDividendForm && submittedStockCredentials">
            <DividendForm
                :stock="submittedStockCredentials"
                @formSubmitted="handleDividendFormSubmit"
            />
        </div>
    </div>
</template>

<script setup>
import StockForm from "@/components/StockForm.vue";
import DividendForm from "@/components/DividendForm.vue";
import { useStockstore } from "@/store/stocks.js";
import { useDividendStore } from "@/store/dividends.js";
import { useRouter } from "vue-router";
import { ref } from "vue";

const router = useRouter();
const stockStore = useStockstore();
const dividendStore = useDividendStore();
const showStockform = ref(true);
const showDividendForm = ref(false);
const submittedStockCredentials = ref(null);
const companyError = ref("");

// Event handler for the "submit" event emitted by StockForm
const addStock = async (credentials) => {
    console.log("addStock", credentials);
    const newStock = {
        company: credentials.company,
        price: credentials.price,
        quantity: credentials.quantity,
        currency: credentials.currency,
    };

    try {
        // Await adding stock to state
        await stockStore.addToState(newStock);
    } catch (error) {
        console.log(error);
        company.value = "test foutmelding";
        // Handle the error here, you can log it or show a user-friendly message
        console.error("Error adding stock:", error);
        if (error.response) {
            // Handle response error (e.g., validation error from the server)
            const responseData = error.response.data;

            if (responseData.errors) {
                // Check if the server provided specific error messages
                if (responseData.errors.company) {
                    // Handle the company validation error
                    companyError.value =
                        "Only alphabetical characters and numbers";
                    console.error(
                        "Company error:",
                        responseData.errors.company[0]
                    );
                    // Show this error message to the user
                    // You can also set it in a variable and display it in your UI
                    // errorMessage.value = "Only alphabetical characters (upper and lower case are allowed) and numbers";
                } else if (responseData.errors.price) {
                    // Handle the price validation error
                    console.error("Price error:", responseData.errors.price[0]);
                    // Show this error message to the user
                } else if (responseData.errors.quantity) {
                    // Handle the quantity validation error
                    console.error(
                        "Quantity error:",
                        responseData.errors.quantity[0]
                    );
                    // Show this error message to the user
                }
            }
        } else {
            // Handle other types of errors (e.g., network errors)
            console.error("Error adding stock:", error);
        }
    }

    // Close form
    // showStockform.value = false;

    // Redirect to overview
    // router.push("/overview");
};

// Event handler for the "submitAndContinue" event emitted by StockForm
const handleSubmitAndContinue = async (credentials) => {
    console.log("[AddTo] Submit and Continue:", credentials);

    try {
        // Add the stock data to the store
        const newStock = await stockStore.addToState(credentials);

        // Store the submitted credentials in a ref
        submittedStockCredentials.value = newStock;

        // Set ShowstockForm to false to close form
        showStockform.value = false;

        // Set showDividendForm to true to make DividendForm visible
        showDividendForm.value = true;
    } catch (error) {
        console.log("Errror adding stock:", error);
        // Handle the error here and provide user feedback
        // You can set an error message that will be displayed to the user
        // errorMessage.value = "An error occurred while adding the stock.";
    }
};

// Event handler for the "formSubmitted" event emitted by DividendForm
const handleDividendFormSubmit = (credentials) => {
    // Handle the dividend form data and any additional actions
    console.log("[AddTo] Dividend Form Data:", credentials);

    // Access the company property from submittedStockCredentials
    // const stockId = submittedStockCredentials.value.id;

    // Iterate through paymentDates and declarationDates arrays to create dividend entries
    for (let i = 0; i < credentials.paymentDates.length; i++) {
        const newDividend = {
            stock_id: credentials.stock_id,
            dividendYield: credentials.dividendYield[i],
            paymentDates: credentials.paymentDates[i],
            declarationDates: credentials.declarationDates[i],
        };

        dividendStore.addToState(newDividend);
    }

    // Redirect to overview
    router.push("/overview");
};

// Call the getAllfromFile function to retrieve the data from the JSON file
stockStore.getAllfromFile();
</script>
