<template>
    <div class="stock-form-container">
        <div class="header-bar">
            <h2 class="header-text">Stock Form</h2>
        </div>
        <form @submit.prevent="submitForm" class="stock-form">
            <div class="label-input-container">
                <label for="company">Company:</label>
                <input
                    type="text"
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
                <input type="number" id="quantity" v-model="stock.quantity" />
            </div>
            <button type="submit">Submit</button>
            <button type="button" @click="submitAndContinue">
                Submit and Continue
            </button>
        </form>
    </div>
    {{ companyError }}
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits } from "vue";
import { Stock } from "../store/stocks";

interface StockFormProps {
    companyError: string;
    stock: Stock;
    showSubmitandContinue: boolean;
}

const props = defineProps<StockFormProps>();

const emit = defineEmits<{
    (event: "formSubmitted", payload: Stock): void;
    (event: "submitAndContinue", payload: Stock): void;
}>();

// const emit = defineEmits<{
//     formSubmitted: [Stock];
//     submitAndContinue: [Stock];
// }>();

// Make stock reactive and typed
const stock = ref({ ...props.stock });

// const emit = defineEmits(["formSubmitted", "submitAndContinue"]);
// const stock = ref<Stock>(props.stock);
// const priceInput = ref(null);

const priceInput = ref<HTMLInputElement | null>(null);

const submitForm = () => {
    const credentials = { ...stock.value };
    credentials.price = credentials.price.slice(1);
    console.log("[StockForm] Credentials:", credentials);

    emit("formSubmitted", credentials);

    Object.keys(stock).forEach((key) => {
        (stock.value as any)[key] = "";
    });
};

const submitAndContinue = () => {
    const credentials = { ...stock.value };
    credentials.price = credentials.price.slice(1);

    console.log("[StockForm] Credentials:", credentials);

    emit("submitAndContinue", credentials);

    Object.keys(stock).forEach((key) => {
        (stock.value as any)[key] = "";
    });
};

const changeCurrency = () => {
    if (stock.value.currency === "€") {
        stock.value.price = "€" + stock.value.price.slice(1);
    } else if (stock.value.currency == "$") {
        stock.value.price = "$" + stock.value.price.slice(1);
    }
};

const handlePriceInput = (event: KeyboardEvent) => {
    console.log(priceInput);
    if (!stock.value.price.startsWith(stock.value.currency)) {
        stock.value.price = stock.value.currency + stock.value.price;
    }

    if (event.key === "ArrowLeft") {
        if (priceInput.value?.selectionStart === 1) {
            priceInput.value.selectionStart = 1;
            event.preventDefault();
        }
    }

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
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}

.header-bar {
    background-color: #007bff;
    padding: 10px 0;
    border-radius: 5px 5px 0 0;
    width: 100%;
    box-sizing: border-box;
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
}

.label-input-container label {
    margin-right: 5px;
}
.label-input-container input,
.label-input-container select {
    flex: 1;
    margin-left: 5px;
}

.header-text,
label {
    margin-left: 10px;
}

label,
input,
select {
    margin-bottom: 20px;
}

.button-container {
    display: flex;
    justify-content: flex-end;
    margin-top: 10px;
}

button[type="submit"] {
    margin-left: 5px;
    margin-bottom: 5px;
}

.invalid-feedback {
    color: red;
    font-size: 14px;
}

.is-invalid {
    border-color: red;
    color: red;
}
</style>
