<template>
    <div class="modal-overlay">
        <div class="modal-content">
            <h2>Login</h2>
            <form @submit.prevent="handleLogin">
                <label for="username">Username</label>
                <input v-model="username" type="text" id="username" />

                <label for="password">Password</label>
                <input v-model="password" type="password" id="password" />

                <div class="remember">
                    <input
                        v-model="rememberMe"
                        type="checkbox"
                        id="rememberMe"
                    />
                    <label for="rememberMe">Remember me</label>
                </div>

                <button type="submit">Login</button>
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, defineEmits, onMounted } from "vue";

// Reactive variables for username, password, and remember me checkbox
const username = ref<string>("");
const password = ref<string>("");
const rememberMe = ref<boolean>(false);

// Emit event to parent component
const emit = defineEmits(["login-success", "close-modal"]);

// Check if user data exists in localStorage
onMounted(() => {
    const storedUsername = localStorage.getItem("username");
    const storedPassword = localStorage.getItem("password");
    if (storedUsername && storedPassword) {
        username.value = storedUsername;
        password.value = storedPassword;
        rememberMe.value = true;
    }
});

// Handle login logic
const handleLogin = () => {
    if (username.value === "luin@live.nl" && password.value === "1234") {
        if (rememberMe.value) {
            localStorage.setItem("username", username.value);
            localStorage.setItem("password", password.value);
        } else {
            localStorage.removeItem("username");
            localStorage.removeItem("password");
        }
        emit("login-success");
    } else {
        alert("Invalid credentials");
    }
};
</script>

<style scoped>
/* Modal Overlay */
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999;
}

/* Modal Content */
.modal-content {
    background-color: white;
    padding: 2rem;
    border-radius: 8px;
    width: 300px;
    position: relative;
}

/* Close Button */
.close-btn {
    position: absolute;
    top: 10px;
    right: 10px;
    background-color: red;
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
}

/* Form Elements */
form {
    display: flex;
    flex-direction: column;
}

form label {
    margin-bottom: 5px;
}

form input {
    margin-bottom: 10px;
    padding: 8px;
    font-size: 14px;
}

form button {
    background-color: #007bff;
    color: white;
    padding: 10px;
    border: none;
    cursor: pointer;
    font-size: 16px;
}

form button:hover {
    background-color: #0056b3;
}

.remember {
    display: flex;
    align-items: center;
}

.remember input {
    margin-right: 5px;
}
</style>
