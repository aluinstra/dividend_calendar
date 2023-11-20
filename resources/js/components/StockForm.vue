<template>
    <div class="stock-form-container">
        <div class="header-bar">
            <h2 class="header-text">Stock Form</h2>
        </div>
        <form @submit.prevent="submitForm" class="stock-form">
            <div class="label-input-container">
                <label for="company">Company:</label>
                <input
                    type="company"
                    id="company"
                    v-model="stock.company"
                    :class="{ 'is-invalid': companyError }"
                />
                <div v-if="companyError" class="invalid-feedback">
                    {{ companyError }}
                </div>
            </div>
            <!-- Add radio buttons for currency selection -->
            <div class="label-input-container">
                <label>
                    <input
                        type="radio"
                        value="€"
                        v-model="stock.currency"
                        @change="changeCurrency()"
                    />
                    Euro (€)
                </label>
                <label>
                    <!-- v-model="stock.currency" -->
                    <input
                        type="radio"
                        value="$"
                        :checked="stock.currency === '$'"
                        @input="stock.currency = '$'"
                        @change="changeCurrency()"
                    />
                    Dollar ($)
                </label>
            </div>
            <div class="label-input-container">
                <label for="price">Price:</label>
                <input
                    type="text"
                    id="price"
                    v-model="stock.price"
                    ref="priceInput"
                    @input="handlePriceInput"
                    @keydown="handlePriceInput"
                />
            </div>
            <div class="label-input-container">
                <label for="quantity">Quantity:</label>
                <input type="quantity" id="quantity" v-model="stock.quantity" />
            </div>
            <button type="submit">Submit</button>
            <button type="button" @click="submitAndContinue">
                Submit and Continue
            </button>
        </form>
    </div>
    {{ companyError }}
</template>

<script setup>
import { reactive, ref } from "vue";

const stock = reactive({
    company: "",
    price: "€",
    quantity: "",
    currency: "€",
});

const priceInput = ref(null);

defineProps({
    companyError: String,
});

const emit = defineEmits(["formSubmitted", "submitAndContinue"]);

const submitForm = () => {
    // Here you can handle form submission using Vue or send the data to your Laravel backend via AJAX.

    const credentials = { ...stock };
    credentials.price = credentials.price.slice(1, credentials.price.length);
    console.log("[StockForm] Credentials:", credentials);

    emit("formSubmitted", credentials);

    // Clear the form fields after submission if desired
    Object.keys(stock).forEach((key) => {
        stock[key] = "";
    });
};

const submitAndContinue = () => {
    const credentials = { ...stock };
    credentials.price = credentials.price.slice(1, credentials.price.length);

    console.log("[StockForm] Credentials:", credentials);

    emit("submitAndContinue", credentials);

    // Clear the form fields after submission if desired
    Object.keys(stock).forEach((key) => {
        stock[key] = "";
    });
};

const changeCurrency = () => {
    if (stock.currency === "€") {
        stock.price = "€" + stock.price.slice(1);
    } else if (stock.currency == "$") {
        stock.price = "$" + stock.price.slice(1);
    }
};

const handlePriceInput = (event) => {
    console.log(priceInput);
    // Ensure that the price always starts with a currency symbol (e.g., "$" or "€").
    if (!stock.price.startsWith(stock.currency)) {
        stock.price = stock.currency + stock.price;
    }

    // Handle left arrow key
    if (event.key === "ArrowLeft") {
        // If the cursor is at index 1, keep it at index 1
        if (priceInput.value.selectionStart === 1) {
            priceInput.value.selectionStart = 1;
            event.preventDefault();
        }
    }

    // Allow only valid characters: numbers and comma and exceptions e.g. arrows + tab
    // Todo in Array
    const validCharacters = /^[0-9,.]*$/;
    if (
        !validCharacters.test(event.key) &&
        event.key !== "ArrowLeft" &&
        event.key !== "ArrowRight" &&
        event.key !== "Backspace" &&
        event.key !== "Tab" &&
        event.key !== "shiftKey"
    ) {
        event.preventDefault();
    }
};
</script>

<style scoped>
.stock-form-container {
    border: 1px solid #ccc;
    border-radius: 5px;
    width: 300px;
    margin: 0 auto;
    overflow: hidden; /* Added to hide any potential overflow */
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}

.header-bar {
    background-color: #007bff;
    padding: 10px 0; /* Adjusted padding to add top and bottom padding only */
    border-radius: 5px 5px 0 0;
    width: 100%;
    box-sizing: border-box; /* Added to include padding in width calculation */
}

.header-text {
    color: #fff;
    margin: 0;
}

.stock-form {
    margin-top: 20px;
}

.label-input-container {
    display: flex;
    align-items: center;
    margin-bottom: 0px;

    /* margin-bottom: -20px; Adjust the value as per your preference */
}

.label-input-container label {
    margin-right: 5px; /* Adjust the value as per your preference */
}
.label-input-container input,
.label-input-container select {
    flex: 1;
    margin-left: 5px; /* Adjust the value as per your preference */
}

.header-text,
label {
    margin-left: 10px; /* Adjust the value as per your preference */
}

label,
input,
select {
    margin-bottom: 20px;
}

.button-container {
    display: flex;
    justify-content: flex-end;
    margin-top: 10px; /* Adjust the value as per your preference */
}

button[type="submit"] {
    margin-left: 5px;
    margin-bottom: 5px; /* Adjust the value as per your preference */
}

.invalid-feedback {
    color: red;
    font-size: 14px; /* You can adjust the font size as needed */
}

.is-invalid {
    border-color: red;
    color: red;
}
</style>
