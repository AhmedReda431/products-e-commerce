// src/composables/snackbar.js
import { reactive } from "vue";

const snackbar = reactive({
  show: false,
  message: "",
  color: "success",
  timeout: 3000,
  icon: "mdi-check-circle", // default icon
  location: "bottom right", // ✅ default
});

export function provideSnackbar(app) {
  const i18n = app.config.globalProperties.$i18n;

  function setPositionByLocale() {
    snackbar.location = i18n?.locale === "ar" ? "top right" : "top left";
  }

  function showSuccess(message) {
    setPositionByLocale();
    snackbar.message = message;
    snackbar.color = "success";
    snackbar.icon = "mdi-check-circle";
    snackbar.show = true;
  }

  function showError(message) {
    setPositionByLocale();
    snackbar.message = message;
    snackbar.color = "error";
    snackbar.icon = "mdi-alert-circle";
    snackbar.show = true;
  }

  app.provide("globalSnackbar", snackbar);
  app.config.globalProperties.successMessage = showSuccess;
  app.config.globalProperties.errorMessage = showError;
}
