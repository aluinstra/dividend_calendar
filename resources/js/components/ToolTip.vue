<template>
    <div class="tooltip">
        {{ text }}
    </div>
</template>

<script setup lang="ts">
defineProps<{ text: string }>();
</script>

<style scoped>
.tooltip-container {
    cursor: pointer;
}

.tooltip {
    position: absolute;
    background-color: blue; /* Solid background for opacity */
    color: white;
    width: 101%;
    padding: 10px; /* Reduced padding */
    border-radius: 5px;
    top: 50%; /* Center vertically relative to parent */
    left: 50%; /* Center horizontally relative to parent */
    transform: translate(-50%, -50%); /* Adjust position to truly center */
    white-space: pre-wrap; /* Allow text to wrap properly */
    z-index: 1000; /* Ensure tooltip is above other elements */
    text-align: center; /* Center text horizontally */
    box-sizing: border-box; /* Include padding and border in element's total width and height */
    line-height: 1.6; /* Adjust line height for better spacing */
}
</style>
