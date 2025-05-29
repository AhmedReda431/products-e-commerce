<script setup>
import { ref, computed, watch } from "vue";
import { useRouter } from "vue-router";
import { useProductStore } from "@/stores/products";
import ProductCard from "@/components/products/ProductCard.vue";

const router = useRouter();
const productStore = useProductStore();
const quantityMap = ref({});
const showAnimation = ref(false);

// Pagination state
const currentPage = ref(1);
const itemsPerPage = 9;

const props = defineProps({
  products: {
    type: Array,
    default: () => [],
  },
  loading: {
    type: Boolean,
    default: false,
  },
  error: {
    type: String,
    default: null,
  },
});

// Compute paginated products
const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return props.products.slice(start, end);
});

// Compute total pages
const totalPages = computed(() => {
  return Math.ceil(props.products.length / itemsPerPage);
});

// Reset currentPage if products length changes and currentPage is invalid
watch(
  () => props.products.length,
  (newLength) => {
    const maxPage = Math.ceil(newLength / itemsPerPage);
    if (currentPage.value > maxPage && maxPage > 0) {
      currentPage.value = maxPage;
    } else if (newLength === 0) {
      currentPage.value = 1;
    }
  }
);
// Scroll to top when currentPage changes
watch(currentPage, () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Navigate to product detail page
const navigateToProduct = (productId) => {
  router.push(`/products/${productId}`);
};

// Trigger cart animation
const triggerCartAnimation = () => {
  showAnimation.value = true;
  setTimeout(() => (showAnimation.value = false), 600);
};

const isInCart = computed(() => (productId) => {
  return productStore.cart.some((item) => item.productId === productId);
});

const updateQuantity = (productId, newQuantity) => {
  quantityMap.value[productId] = newQuantity;
};

const getQuantityForProduct = (productId) => {
  return quantityMap.value[productId] || 1;
};
</script>

<template>
  <v-app class="modern-app">
    <v-container fluid class="px-6 py-8">
      <!-- Header Section -->
      <div class="header-section mb-12">
        <h1 class="display-title">Premium Collection</h1>
        <p class="subtitle-text">
          Discover our curated selection of exceptional products
        </p>
      </div>

      <!-- Products Grid -->
      <v-row v-if="!loading" class="products-grid w-100">
        <v-col
          v-for="product in paginatedProducts"
          :key="product.id"
          cols="12"
          sm="6"
          md="4"
          lg="4"
          class="product-col"
        >
          <ProductCard
            :product="product"
            :quantity="getQuantityForProduct(product.id)"
            :is-in-cart="isInCart(product.id)"
            :show-animation="showAnimation"
            @navigate-to-product="navigateToProduct"
            @add-to-cart="
              productStore.addOrUpdateCart(
                product.id,
                getQuantityForProduct(product.id),
                {
                  price: product.price,
                  title: product.title,
                  image: product.image,
                }
              );
              triggerCartAnimation();
            "
            @update-quantity="updateQuantity"
          />
        </v-col>
      </v-row>

      <!-- Pagination -->
      <div
        v-if="!loading && paginatedProducts.length"
        class="pagination-wrapper"
      >
        <div class="pagination">
          <v-pagination
            v-model="currentPage"
            :length="totalPages"
            :total-visible="7"
            rounded="circle"
            color="primary"
            class="pagination"
          />
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="loading-section">
        <v-progress-circular
          indeterminate
          color="primary"
          size="64"
          width="4"
        />
        <p class="loading-text">Loading amazing products...</p>
      </div>

      <!-- Error State -->
      <v-alert
        v-if="error"
        type="error"
        variant="tonal"
        class="error-alert"
        prominent
      >
        <v-icon>mdi-alert-circle</v-icon>
        {{ error }}
      </v-alert>
    </v-container>
  </v-app>
</template>

<style scoped>
.modern-app {
  min-height: 100vh;
}

.header-section {
  text-align: center;
  margin-bottom: 3rem;
}

.display-title {
  font-size: 3.5rem;
  font-weight: 700;
}

.subtitle-text {
  font-size: 1.2rem;
  opacity: 0.9;
  max-width: 600px;
  margin: 0 auto;
}

.products-grid {
  gap: 0px;
}

.product-col {
  display: flex;
}

.pagination-wrapper {
  margin-top: 2rem;
  display: flex;
  justify-content: center;
  width: 100% !important;
}

.pagination {
  width: fit-content;
}

.loading-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  /* Changed flex to column */
  gap: 24px;
}

.loading-text {
  color: white;
  font-size: 1.2rem;
  opacity: 0.25;
}

.error-alert {
  max-width: 600px;
  margin: 2rem auto;
  border-radius: 16px !important;
}

@media (max-width: 960px) {
  .display-title {
    font-size: 2.5rem;
  }
}

@media (max-width: 600px) {
  .display-title {
    font-size: 2rem;
  }

  .pagination-wrapper {
    padding: 0 16px;
  }
}
</style>
