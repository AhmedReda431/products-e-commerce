// src/main.js
import { createApp } from "vue";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import i18n from "./plugins/i18n";
import axios from "./plugins/axios";
import router from "./router";
import "./assets/styles/main.scss";
import { provideSnackbar } from "@/composables/snackbar";

import globalMixins from "./mixins";

const app = createApp(App);

// Set up Pinia with persistence
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
app.use(pinia);

app.use(i18n);
app.use(vuetify);
app.use(router);

// ✅ Register all mixins globally
globalMixins.forEach((mixin) => app.mixin(mixin));

app.config.globalProperties.$axios = axios;
app.config.globalProperties.$t = i18n.global.t;

// src/main.js
const savedLang = localStorage.getItem("lang") || "en";
document.documentElement.setAttribute("lang", savedLang);
document.documentElement.setAttribute(
  "dir",
  savedLang === "ar" ? "rtl" : "ltr"
);
provideSnackbar(app); // register the global snackbar + method
app.mount("#app");
