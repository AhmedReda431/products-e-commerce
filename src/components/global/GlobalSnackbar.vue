<template>
  <v-snackbar
    v-model="snackbar.show"
    :color="snackbar.color"
    :timeout="snackbar.timeout"
    multi-line
    class="global-snackbar"
    @mouseenter="pauseProgress"
    @mouseleave="resumeProgress"
    :location="snackbar.location"
  >
    <template #default>
      <div class="d-flex align-center gap-4">
        <v-icon size="28">{{ snackbar.icon }}</v-icon>
        <span class="snackbar-text mx-2">{{ snackbar.message }}</span>
      </div>

      <v-progress-linear
        :model-value="progress"
        height="2"
        color="white"
        class="mt-3"
      />
    </template>

    <template #actions>
      <v-btn icon @click="snackbar.show = false">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script setup>
import { inject, ref, watch } from "vue";
// 👇 هذا الاستيراد لحل مشكلة Vite والتحليل
import { VProgressLinear } from "vuetify/components";

const snackbar = inject("globalSnackbar");

const progress = ref(100);
const interval = 50;
let step = 0;
let timer = null;
let remaining = 0;
let lastUpdate = 0;

function startProgress() {
  progress.value = 100;
  const duration = snackbar.timeout || 3000;
  remaining = duration;
  step = 100 / (duration / interval);
  lastUpdate = Date.now();

  clearInterval(timer);
  timer = setInterval(() => {
    const now = Date.now();
    const delta = now - lastUpdate;
    lastUpdate = now;
    remaining -= delta;

    progress.value -= step * (delta / interval);
    if (progress.value <= 0 || remaining <= 0) {
      clearInterval(timer);
      snackbar.show = false;
    }
  }, interval);
}

function pauseProgress() {
  clearInterval(timer);
}

function resumeProgress() {
  lastUpdate = Date.now();
  timer = setInterval(() => {
    const now = Date.now();
    const delta = now - lastUpdate;
    lastUpdate = now;
    remaining -= delta;

    progress.value -= step * (delta / interval);
    if (progress.value <= 0 || remaining <= 0) {
      clearInterval(timer);
      snackbar.show = false;
    }
  }, interval);
}

watch(
  () => snackbar.show,
  (val) => {
    if (val) startProgress();
    else {
      clearInterval(timer);
      progress.value = 0;
    }
  }
);
</script>

<style scoped>
.global-snackbar {
  max-width: 400px;
}
.snackbar-text {
  font-size: 16px;
  line-height: 1.4;
}
</style>
