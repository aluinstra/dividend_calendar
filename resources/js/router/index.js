import { createRouter, createWebHashHistory } from "vue-router";

import Home from "./../pages/Home.vue";
import Overview from "./../pages/Overview.vue";
import AddTo from "./../pages/AddTo.vue";
import Show from "./../pages/Show.vue";

import Calculator from "./../components/Calculator.vue";

const routes = [
    {
        path: "/",
        component: Home,
        name: "Home",
    },
    {
        path: "/overview",
        component: Overview,
        name: "Overview",
    },
    {
        path: "/calculator",
        component: Calculator,
        name: "Calculator",
    },
    {
        path: "/add-to",
        component: AddTo,
        name: "AddTo",
    },
    {
        path: "/show/:id",
        component: Show,
        name: "Show",
    },
    // Add more routes as needed
];

export const router = createRouter({
    history: createWebHashHistory(),
    routes,
});
