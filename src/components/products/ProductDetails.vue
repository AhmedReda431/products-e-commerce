<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useProductStore } from "@/stores/products";
import axios from "@/plugins/axios";
import QuantityCounter from "@/components/products/QuantityCounter.vue";

const route = useRoute();
const router = useRouter();
const productStore = useProductStore();
const quantity = ref(1);
const showAnimation = ref(false);
const selectedImageIndex = ref(0);
const product = ref(null);
const loading = ref(false);
const error = ref(null);

// Fetch product by ID
const fetchProduct = async () => {
  loading.value = true;
  error.value = null;
  const productId = parseInt(route.params.id);
  try {
    const response = await axios.get(
      `/products/${productId}`
    );
    product.value = response;
  } catch (err) {
    error.value = err.message || "Failed to fetch product details";
    console.error("Error fetching product:", err);
  } finally {
    loading.value = false;
  }
};

onMounted(fetchProduct);

const isInCart = computed(() => {
  if (!product.value) return false;
  return productStore.cart.some((item) => item.productId === product.value.id);
});

const formatCurrency = (price) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
};

const goBack = () => {
  router.back();
};

// Mock additional images for demo
const getProductImages = () => {
  if (!product.value) return [];
  return [product.value.image, product.value.image, product.value.image];
};

// Trigger animation for cart action
</script>

<template>
  <v-app class="product-detail-app">
    <v-container fluid class="px-6 py-8">
      <!-- Back Button -->
      <v-btn
        @click="goBack"
        variant="outlined"
        color="primary"
        class="my-6"
        size="large"
      >
        <v-icon start>mdi-arrow-left</v-icon>
        Back to Products
      </v-btn>

      <!-- Loading State -->
      <div v-if="loading" class="loading-section">
        <v-progress-circular
          indeterminate
          color="primary"
          size="64"
          width="24"
        />
        <p class="loading-text">Loading product details...</p>
      </div>

      <!-- Error State -->
      <v-alert
        v-else-if="error"
        class="error-alert"
        color="error"
        prominent
        variant="outlined"
      >
        <v-icon>mdi-alert-circle</v-icon>
        {{ error }}
      </v-alert>

      <!-- Product Detail Content -->
      <div v-else-if="product" class="product-card-wrapper">
        <v-row>
          <!-- Product Images -->
          <v-col cols="12" md="6">
            <div class="image-section">
              <!-- Main Image -->
              <div class="main-image-container">
                <v-img
                  :src="getProductImages()[selectedImageIndex]"
                  height="500px"
                  cover
                  class="main-product-image"
                  gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                >
                  <div class="image-badge-overlay">
                    <v-chip
                      v-if="isInCart"
                      color="success"
                      variant="elevated"
                      size="large"
                      class="cart-badge"
                    >
                      <v-icon start>mdi-check-circle</v-icon>
                      In Your Cart
                    </v-chip>
                  </div>
                </v-img>
              </div>

              <!-- Image Thumbnails -->
              <div class="thumbnails-container">
                <div
                  v-for="(image, index) in getProductImages()"
                  :key="index"
                  class="thumbnail"
                  :class="{ active: selectedImageIndex === index }"
                  @click="selectedImageIndex = index"
                >
                  <v-img :src="image" height="80px" cover />
                </div>
              </div>
            </div>
          </v-col>

          <!-- Product Info -->
          <v-col cols="12" md="6">
            <div class="product-info">
              <!-- Price and Rating -->
              <div class="price-rating-section">
                <span class="product-price">{{
                  formatCurrency(product.price)
                }}</span>
                <div class="rating-section">
                  <v-rating
                    :model-value="4.5"
                    color="amber"
                    size="small"
                    density="compact"
                    readonly
                    half-increments
                  />
                  <span class="rating-text">(128 reviews)</span>
                </div>
              </div>

              <!-- Product Title -->
              <h1 class="product-detail-title">{{ product.title }}</h1>

              <!-- Product Description -->
              <div class="description-section">
                <h3 class="section-title">Description</h3>
                <p class="product-detail-description">
                  {{ product.description }}
                </p>

                <!-- Additional Features -->
                <div class="features-section">
                  <h4 class="features-title">Key Features:</h4>
                  <ul class="features-list">
                    <li>Premium quality materials</li>
                    <li>Durable and long-lasting</li>
                    <li>Easy to use and maintain</li>
                    <li>30-day money-back guarantee</li>
                  </ul>
                </div>
              </div>

              <!-- Quantity and Add to Cart -->
              <div class="purchase-section">
                <div class="quantity-section">
                  <label class="quantity-label">Quantity:</label>
                  <QuantityCounter
                    v-model="quantity"
                    :max-quantity="10"
                    class="quantity-counter"
                  />
                </div>

                <v-btn
                  class="add-to-cart-btn"
                  :class="{ 'animate-success': showAnimation }"
                  color="primary"
                  variant="elevated"
                  size="x-large"
                  block
                  @click="
                    productStore.addOrUpdateCart(product.id, quantity, {
                      price: product.price,
                      title: product.title,
                      image: product.image,
                    });
                  "
                >
                  <v-icon start>{{
                    isInCart ? "mdi-cart-check" : "mdi-cart-plus"
                  }}</v-icon>
                  {{ isInCart ? "Update Cart" : "Add to Cart" }}
                </v-btn>

                <!-- Product Guarantees -->
                <div class="guarantees-section">
                  <div class="guarantee-item">
                    <v-icon color="success">mdi-truck-fast</v-icon>
                    <span>Free shipping on orders over $50</span>
                  </div>
                  <div class="guarantee-item">
                    <v-icon color="success">mdi-shield-check</v-icon>
                    <span>30-day return policy</span>
                  </div>
                  <div class="guarantee-item">
                    <v-icon color="success">mdi-certificate</v-icon>
                    <span>1-year warranty included</span>
                  </div>
                </div>
              </div>
            </div>
          </v-col>
        </v-row>
      </div>
    </v-container>
  </v-app>
</template>

<style scoped>
.product-detail-app {
  min-height: 100vh;
}

.product-card-wrapper {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 24px;
  padding: 32px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

.image-section {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.main-image-container {
  position: relative;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

.main-product-image {
  border-radius: 16px;
}

.image-badge-overlay {
  position: absolute;
  top: 16px;
  right: 16px;
}

.cart-badge {
  backdrop-filter: blur(10px);
  background: rgba(76, 175, 80, 0.9) !important;
  color: white !important;
}

.thumbnails-container {
  display: flex;
  gap: 12px;
  justify-content: center;
}

.thumbnail {
  width: 80px;
  height: 80px;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  border: 2px solid transparent;
  transition: all 0.3s ease;
}

.thumbnail:hover,
.thumbnail.active {
  border-color: #1976d2;
  transform: scale(1.05);
}

.product-info {
  display: flex;
  flex-direction: column;
  gap: 24px;
  height: 100%;
}

.price-rating-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
}

.product-price {
  font-size: 2.5rem;
  font-weight: 700;
  background: linear-gradient(45deg, #1976d2, #42a5f5);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.rating-section {
  display: flex;
  align-items: center;
  gap: 8px;
}

.rating-text {
  color: #64748b;
  font-size: 0.9rem;
}

.product-detail-title {
  font-size: 2rem;
  font-weight: 600;
  color: #2c3e50;
  line-height: 1.3;
  margin: 0;
}

.description-section {
  flex-grow: 1;
}

.section-title {
  font-size: 1.3rem;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 12px;
}

.product-detail-description {
  color: #64748b;
  line-height: 1.6;
  font-size: 1.1rem;
  margin-bottom: 24px;
}

.features-section {
  background: rgba(248, 250, 252, 0.8);
  padding: 20px;
  border-radius: 12px;
  border: 1px solid rgba(0, 0, 0, 0.05);
}

.features-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 12px;
}

.features-list {
  margin: 0;
  padding-left: 20px;
}

.features-list li {
  color: #64748b;
  margin-bottom: 8px;
  line-height: 1.5;
}

.purchase-section {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.quantity-section {
  display: flex;
  align-items: center;
  gap: 16px;
}

.quantity-label {
  font-weight: 600;
  color: #2c3e50;
  font-size: 1.1rem;
}

.add-to-cart-btn {
  padding: 16px 32px !important;
  font-weight: 600;
  letter-spacing: 0.5px;
  border-radius: 12px !important;
  background: linear-gradient(45deg, #1976d2, #42a5f5) !important;
  box-shadow: 0 4px 12px rgba(25, 118, 210, 0.3) !important;
  transition: all 0.3s ease !important;
  font-size: 1.1rem !important;
}

.add-to-cart-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(25, 118, 210, 0.4) !important;
}

.animate-success {
  animation: successPulse 0.6s ease-out;
  background: linear-gradient(45deg, #4caf50, #66bb6a) !important;
}

@keyframes successPulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
    box-shadow: 0 0 20px rgba(76, 175, 80, 0.6);
  }
  100% {
    transform: scale(1);
  }
}

.guarantees-section {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 20px;
  background: rgba(248, 250, 252, 0.6);
  border-radius: 12px;
  border: 1px solid rgba(0, 0, 0, 0.05);
}

.guarantee-item {
  display: flex;
  align-items: center;
  gap: 12px;
  color: #64748b;
  font-size: 0.95rem;
}

.loading-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  gap: 24px;
}

.loading-text {
  color: white;
  font-size: 1.2rem;
  opacity: 0.9;
}

.error-alert {
  max-width: 600px;
  margin: 2rem auto;
  border-radius: 16px !important;
}

/* Responsive Design */
@media (max-width: 960px) {
  .product-card-wrapper {
    padding: 24px;
  }

  .product-detail-title {
    font-size: 1.7rem;
  }

  .product-price {
    font-size: 2rem;
  }

  .price-rating-section {
    flex-direction: column;
    align-items: flex-start;
  }
}

@media (max-width: 600px) {
  .product-card-wrapper {
    padding: 16px;
  }

  .thumbnails-container {
    flex-wrap: wrap;
  }

  .quantity-section {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
}
</style>
