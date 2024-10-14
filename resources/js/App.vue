<template>
    <div>
        <LoginModal v-if="!isLoggedIn" @login-success="handleLoginSuccess" />
        <div v-else>
            <h1>Welcome to the Dashboard</h1>
            <button @click="logout">Logout</button>
        </div>
        <Navbar />
        <router-view> </router-view>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Navbar from "./components/Navbar.vue";
import LoginModal from "./components/LoginModal.vue";

const showModal = ref<boolean>(true);
const isLoggedIn = ref<boolean>(false);

const handleLoginSuccess = (): void => {
    isLoggedIn.value = true;
};

const logout = (): void => {
    isLoggedIn.value = false;
};
</script>
