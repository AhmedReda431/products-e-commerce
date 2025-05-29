<template>
  <v-footer :color="theme.current.value.dark ? 'secondary' : 'primary'" padless>
    <v-container>
      <v-row class="py-8">
        <!-- Company Info -->
        <v-col cols="12" sm="6" md="3" class="mb-6 mb-md-0">
          <h3 class="text-h6 mb-4">Task</h3>
          <p class="body-2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </v-col>

        <!-- Quick Links -->
        <v-col cols="12" sm="6" md="3" class="mb-6 mb-md-0">
          <h3 class="text-h6 mb-4">Quick Links</h3>
          <v-list density="compact" color="transparent" class="bg-transparent">
            <v-list-item to="/">
              <v-list-item-title>Home</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-col>

        <!-- Contact Info -->
        <v-col cols="12" sm="6" md="3" class="mb-6 mb-md-0">
          <h3 class="text-h6 mb-4">Contact Us</h3>
          <p class="body-2">
            1234 Street Name<br />
            City, State, 56789<br />
            Email: info@A-R.com<br />
            Phone: (123) 456-7890
          </p>
        </v-col>

        <!-- Social Media -->
        <v-col cols="12" sm="6" md="3">
          <h3 class="text-h6 mb-4">Follow Us</h3>
          <div class="d-flex flex-wrap">
            <v-btn
              icon
              href="https://facebook.com"
              target="_blank"
              class="ma-1"
            >
              <v-icon>mdi-facebook</v-icon>
            </v-btn>
            <v-btn icon href="https://twitter.com" target="_blank" class="ma-1">
              <v-icon>mdi-twitter</v-icon>
            </v-btn>
            <v-btn
              icon
              href="https://linkedin.com"
              target="_blank"
              class="ma-1"
            >
              <v-icon>mdi-linkedin</v-icon>
            </v-btn>
            <v-btn
              icon
              href="https://instagram.com"
              target="_blank"
              class="ma-1"
            >
              <v-icon>mdi-instagram</v-icon>
            </v-btn>
          </div>
        </v-col>
      </v-row>

      <!-- Copyright -->
      <v-row class="py-4" no-gutters>
        <v-col cols="12" class="text-center">
          <span class="body-2">
            © {{ new Date().getFullYear() }} A-R. All rights reserved.
          </span>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<script setup>
import { useTheme } from "vuetify";
const theme = useTheme();
</script>

<style scoped>
/* Ensure footer links adapt to theme */
.v-footer a {
  color: inherit !important;
  text-decoration: none;
  background: transparent;
}


/* Adjust padding for smaller screens */
@media (max-width: 600px) {
  .v-footer .v-container {
    padding: 0 16px;
  }
}
</style>
