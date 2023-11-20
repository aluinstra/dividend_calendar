<template>
    <div class="dividend-form-container">
        <div class="header-bar">
            <h2 class="header-text">Dividend Form</h2>
        </div>
        <form @submit.prevent="submitForm" class="dividend-form">
            <div class="label-input-container">
                <label>Stock ID: {{ stock_id }}</label>
            </div>
            <div class="label-input-container">
                <label>Company: {{ company }}</label>
            </div>
            <div class="label-input-container">
                <label for="dividendDates">Dividend date(s)</label>
                <button class="add-button" @click.prevent="addDateFields">
                    Add
                </button>
            </div>
            <div
                class="date-fields"
                v-for="(paymentDate, index) in dividend.paymentDates"
                :key="index"
            >
                <div class="label-input-container">
                    <label for="dividendYield">Dividend Yield:</label>
                    <input
                        type="dividendYield"
                        id="dividendYield"
                        v-model="dividend.dividendYield[index]"
                        required
                    />
                </div>

                <div class="date-input">
                    <label for="paymentDate"
                        >Date of payment {{ index + 1 }}</label
                    >
                    <input
                        type="date"
                        v-model="dividend.paymentDates[index]"
                        placeholder="Date of Payment"
                        required
                    />
                </div>
                <div class="date-input">
                    <label for="declarationDate"
                        >Date of declaration {{ index + 1 }}</label
                    >
                    <input
                        type="date"
                        v-model="dividend.declarationDates[index]"
                        placeholder="Declaration Date"
                        required
                    />
                </div>
            </div>
            <button type="submit">Submit</button>
        </form>
    </div>
</template>

<script setup>
import { reactive } from "vue";
import { defineProps, ref } from "vue";

const props = defineProps(["stock"]);
const company = props.stock?.company;
const stock_id = props.stock?.id;

const dividend = reactive({
    stock_id: stock_id,
    dividendYield: [""],
    paymentDates: [null],
    declarationDates: [null],
});

const emit = defineEmits(["formSubmitted"]);

const addDateFields = () => {
    dividend.paymentDates.push(null); // Add a new payment date
    dividend.declarationDates.push(null); // Add a new declaration date
    dividend.dividendYield.push(""); // Push an empty string for the next set
};

const submitForm = () => {
    // Here you can handle form submission using Vue or send the data to your Laravel backend via AJAX.

    const credentials = { ...dividend };
    console.log("[DividendForm] Credentials:", credentials);

    emit("formSubmitted", credentials);

    // Clear the form fields after submission if desired
    Object.keys(dividend).forEach((key) => {
        dividend[key] = "";
    });
};
</script>

<style scoped>
.dividend-form-container {
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

.dividend-form {
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

.date-input {
    display: flex;
    align-items: center;
    margin-bottom: 0px; /* Adjust this value as needed */
}

.date-input label {
    margin-right: 10px; /* Adjust this value as needed */
    width: 150px; /* Adjust this value as needed */
}

.add-button {
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 5px 10px;
    cursor: pointer;
    margin-bottom: 20px;
}

.date-fields {
    display: flex;
    flex-direction: column;
    margin-top: 5px; /* Adjust this value to control the spacing */
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
</style>
