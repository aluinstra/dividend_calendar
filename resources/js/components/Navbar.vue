<template>
    <nav class="navbar">
        <div class="navbar-brand">
            <router-link class="navbar-item" :to="{ name: 'Home' }"
                >Home</router-link
            >
        </div>
        <div class="navbar-menu">
            <router-link
                class="navbar-item"
                :to="{ name: 'Home' }"
                active-class="active-link"
                >Home</router-link
            >
            <router-link
                class="navbar-item"
                :to="{ name: 'AddTo' }"
                active-class="active-link"
                >Add to...</router-link
            >
            <router-link
                class="navbar-item"
                :to="{ name: 'Overview' }"
                active-class="active-link"
                >Overview</router-link
            >
            <router-link
                class="navbar-item"
                :to="{ name: 'Calendar' }"
                active-class="active-link"
                >Calendar</router-link
            >
        </div>
    </nav>
</template>

<style scoped>
.navbar {
    background-color: #007bff;
    padding: 10px 0;
    border-radius: 5px;
    width: 100%;
    display: flex;
    align-items: center; /* Align items vertically in the center */
}

.navbar-menu {
    display: flex;
}

.navbar-item {
    color: #fff;
    margin: 0 15px;
    text-decoration: none;
    padding-bottom: 5px;
    position: relative;
}

.navbar-item:hover {
    color: #dcdcdc;
}

.active-link {
    color: #fff; /* Keep the text color white */
}

.active-link::after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 2px;
    background-color: #fff;
    border-radius: 2px;
}
</style>
