import { createRouter, createWebHashHistory } from "vue-router";

import Home from "./../pages/Home.vue";
import Overview from "./../pages/Overview.vue";
import AddTo from "./../pages/AddTo.vue";
import Show from "./../pages/Show.vue";
import Edit from "./../pages/EditStock.vue";
import Calendar from "../components/Calendar.vue";

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
    {
        path: "/edit/:id",
        component: Edit,
        name: "Edit",
    },
    {
        path: "/calendar",
        component: Calendar,
        name: "Calendar",
    },
];

export const router = createRouter({
    history: createWebHashHistory(),
    routes,
});
