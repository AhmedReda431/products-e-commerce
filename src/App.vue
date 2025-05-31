<template>
  <v-app :dir="i18n.global.locale.value === 'ar' ? 'rtl' : 'ltr'">
    <!-- Carousel (Background Layer) -->
    
    <!-- Navbar -->
    <Navbar />

    <!-- Main Content -->
    <v-main class="py-4 mt-5 main-content">
      <router-view />
      <GlobalSnackbar />
    </v-main>
    <!-- Footer -->
    <Footer />
  </v-app>
</template>

<script setup>
import Navbar from "@/components/layout/Navbar.vue";

import Footer from "@/components/layout/Footer.vue";
import { watch } from "vue";
import i18n from "@/plugins/i18n"; // Import the global i18n instance directly
import GlobalSnackbar from "@/components/global/GlobalSnackbar.vue";

// Watch locale changes to update document direction
watch(
  () => i18n.global.locale.value,
  (newLocale) => {
    document.documentElement.dir = newLocale === "ar" ? "rtl" : "ltr";
  },
  { immediate: true }
);
</script>

<style scoped>
/* Ensure smooth theme transitions */
:deep(.v-application) {
  transition: background-color 0.3s ease, color 0.3s ease;
  min-height: 100svh;
  overflow: hidden;
}

/* Position main content to be scrollable over the carousel */
.main-content {
  position: relative;
  z-index: 1; /* Above carousel */
  background: transparent; /* Allow carousel to show through */
  min-height: 100svh; /* Ensure content can scroll */
}

/* Ensure navbar is above carousel */
:deep(.v-app-bar) {
  z-index: 1000;
  background: rgba(25, 118, 210, 0.9) !important;
  backdrop-filter: blur(5px);
}

/* Root elements must allow full height */
html,
body,
#app {
  height: 100svh;
  margin: 0;
  padding: 0;
  overflow: hidden;
}
</style>
