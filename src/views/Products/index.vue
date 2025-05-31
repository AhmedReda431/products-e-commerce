<template>
  <div class="home-page-wrapper">
    <Carouse />
    <v-container>
      <div class="products-component-wrapper">
        <ProductsComponent
          :products="products"
          :loading="loading"
          :error="error"
        />
      </div>
    </v-container>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import ProductsComponent from "@/components/products/ProductsComponent.vue";
import axios from "@/plugins/axios";
import Carouse from "@/components/Carousel.vue";
const products = ref([]);
const loading = ref(false);
const error = ref(null);

const fetchProducts = async () => {
  loading.value = true;
  error.value = null;
  try {
    const response = await axios.get("/products");
    products.value = response;
  } catch (err) {
    error.value = err.message || "Failed to fetch products";
    console.error("Error fetching products:", err);
  } finally {
    loading.value = false;
  }
};

onMounted(fetchProducts);
</script>

<style scoped>
.home-page-wrapper {
  min-height: 100vh;
}

.products-component-wrapper {
  padding: 24px 0;
}
</style>
