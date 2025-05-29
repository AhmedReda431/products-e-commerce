// src/plugins/vuetify.js
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { aliases, mdi } from "vuetify/iconsets/mdi";
import "@mdi/font/css/materialdesignicons.css";

// expose this instance
export const vuetifyInstance = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: "mdi",
    aliases,
    sets: { mdi },
  },
  theme: {
    defaultTheme: localStorage.getItem("theme") || "lightTheme",
    themes: {
      lightTheme: {
        dark: false,
        colors: {
          background: "#F5F7FA",
          primary: "#2E7D9A",
          secondary: "#6B7280",
        },
      },
      darkTheme: {
        dark: true,
        colors: {
          background: "#1E293B",
          primary: "#67C4C6",
          secondary: "#94A3B8",
        },
      },
    },
  },
  locale: {
    locale: localStorage.getItem("lang") || "en",
    fallback: "en",
    messages: {}, // vue-i18n handles actual translations
  },
  // Don't set `rtl` statically
});

export default vuetifyInstance;
