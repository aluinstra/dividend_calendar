<template>
    <nav class="navbar">
        <div class="navbar-brand">
            <router-link class="navbar-item" :to="{ name: 'Home' }"
                >Home</router-link
            >
        </div>
        <div class="navbar-menu">
            <div class="navbar-end">
                <router-link class="navbar-item" :to="{ name: 'AddTo' }"
                    >Add to...</router-link
                >
            </div>
            <div class="navbar-end">
                <router-link class="navbar-item" :to="{ name: 'Overview' }"
                    >Overview</router-link
                >
            </div>
        </div>
    </nav>
</template>

<style scoped>
.navbar {
    background-color: #007bff;
    padding: 10px 0;
    border-radius: 5px;
    width: 100%;
}

.navbar-brand,
.navbar-item {
    color: #fff;
    margin-left: 10px;
}
</style>
