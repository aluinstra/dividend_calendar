import "./bootstrap";
import { createApp } from "vue";
import App from "./App.vue";
import { router } from "./router";
import ToolTip from "v-tooltip";

const app = createApp(App);

app.use(router);
app.use(ToolTip);
app.mount("#app");
