<template>
  <div>
    <v-app-bar
      app
      :color="theme?.global?.current?.value?.dark ? 'grey-darken-4' : 'primary'"
      elevation="2"
    >
      <v-container class="d-flex align-center">
        <!-- Logo -->
        <v-toolbar-title class="font-weight-bold">
          <router-link
            to="/"
            class="text-decoration-none"
            :class="
              theme?.global?.current?.value?.dark
                ? 'grey-lighten-2--text'
                : 'white--text'
            "
          >
            Task
          </router-link>
        </v-toolbar-title>

        <!-- Spacer -->
        <v-spacer></v-spacer>

        <!-- Desktop Menu -->
        <v-toolbar-items class="d-none d-md-flex">
          <v-btn text to="/" class="mx-2">{{ $t("nav.home") }}</v-btn>
        </v-toolbar-items>

        <!-- Cart Dropdown -->
        <CartDropdown />

        <!-- Mobile Menu Button -->
        <v-app-bar-nav-icon
          class="d-md-none"
          @click.stop="drawer = !drawer"
        ></v-app-bar-nav-icon>
      </v-container>
    </v-app-bar>

    <!-- Mobile Navigation Drawer -->
    <v-navigation-drawer
      v-model="drawer"
      app
      temporary
      :location="drawerLocation"
      :color="theme.global.current.value.dark ? 'grey-darken-3' : 'white'"
      width="250"
      class="mobile-drawer"
    >
      <v-list density="compact" nav>
        <v-list-item to="/" @click="drawer = false">
          <template v-slot:prepend>
            <v-icon>mdi-home</v-icon>
          </template>
          <v-list-item-title>{{ $t("nav.home") }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useTheme } from "vuetify";
import { useLocale, useRtl } from "vuetify";
import i18n from "@/plugins/i18n";
import { useRouter } from "vue-router";
import CartDropdown from "@/components/products/CartDropdown.vue";

const router = useRouter();
const drawer = ref(false);
const theme = useTheme();
const { current } = useLocale();
const { isRtl } = useRtl();

const toggleLang = () => {
  const newLang = i18n.global.locale.value === "en" ? "ar" : "en";
  i18n.global.locale.value = newLang;
  localStorage.setItem("lang", newLang);

  document.documentElement.setAttribute("lang", newLang);
  document.documentElement.setAttribute(
    "dir",
    newLang === "ar" ? "rtl" : "ltr"
  );

  current.value = newLang;
  router.go(0);
};

const drawerLocation = computed(() =>
  i18n.global.locale.value === "ar" ? "left" : "right"
);
</script>

<style scoped>
.v-navigation-drawer {
  transition: transform 0.3s ease-in-out;
  z-index: 1000;
}

.v-btn,
.v-toolbar-title a {
  transition: color 0.3s ease;
}

@media (max-width: 600px) {
  .mobile-drawer {
    max-height: 100vh;
    overflow-y: auto;
  }
}
</style>
