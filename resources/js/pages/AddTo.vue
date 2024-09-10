<template>
    <div class="add-to-container">
        <h2>Add To Component</h2>
        <div v-if="showStockform">
            <StockForm
                @formSubmitted="addStock"
                @submitAndContinue="handleSubmitAndContinue"
                :companyError="companyError"
                :stock="{ company: '', price: '', quantity: 0, currency: '' }"
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
import { useStockstore } from "@/store/stocks";
import { useDividendStore } from "@/store/dividends";
import { useRouter } from "vue-router";
import { ref } from "vue";

const router = useRouter();
const stockStore = useStockstore();
const dividendStore = useDividendStore();
const showStockform = ref(true);
const showDividendForm = ref(false);
const submittedStockCredentials = ref(null);
const companyError = ref("");

const addStock = async (credentials) => {
    console.log("addStock", credentials);
    const newStock = {
        company: credentials.company,
        price: credentials.price,
        quantity: credentials.quantity,
        currency: credentials.currency,
    };

    try {
        await stockStore.addToState(newStock);
    } catch (error) {
        console.log(error);
        company.value = "test foutmelding";
        console.error("Error adding stock:", error);
        if (error.response) {
            const responseData = error.response.data;

            if (responseData.errors) {
                if (responseData.errors.company) {
                    companyError.value =
                        "Only alphabetical characters and numbers";
                    console.error(
                        "Company error:",
                        responseData.errors.company[0]
                    );
                } else if (responseData.errors.price) {
                    console.error("Price error:", responseData.errors.price[0]);
                } else if (responseData.errors.quantity) {
                    console.error(
                        "Quantity error:",
                        responseData.errors.quantity[0]
                    );
                }
            }
        } else {
            console.error("Error adding stock:", error);
        }
    }
};

const handleSubmitAndContinue = async (credentials) => {
    console.log("[AddTo] Submit and Continue:", credentials);

    try {
        const newStock = await stockStore.addToState(credentials);

        submittedStockCredentials.value = newStock;

        showStockform.value = false;

        showDividendForm.value = true;
    } catch (error) {
        console.log("Errror adding stock:", error);
    }
};

const handleDividendFormSubmit = (credentials) => {
    console.log("[AddTo] Dividend Form Data:", credentials);

    // const stockId = submittedStockCredentials.value.id;

    for (let i = 0; i < credentials.paymentDates.length; i++) {
        const newDividend = {
            stock_id: credentials.stock_id,
            dividendYield: credentials.dividendYield[i],
            paymentDates: credentials.paymentDates[i],
            declarationDates: credentials.declarationDates[i],
        };

        dividendStore.addToState(newDividend);
    }

    router.push("/overview");
};

stockStore.getAllfromFile();
</script>
