<template>
  <v-card
    class="product-card glass-card"
    :class="{ 'card-hovered': isHovered }"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
    elevation="0"
  >
    <!-- Product Image with Overlay - CLICKABLE -->
    <div
      class="image-container clickable"
      @click="$emit('navigate-to-product', product.id)"
    >
      <v-img :src="product.image" height="220px" cover class="product-image">
        <div class="image-overlay">
          <v-chip
            v-if="isInCart"
            color="success"
            variant="elevated"
            size="small"
            class="cart-badge"
          >
            <v-icon start>mdi-check-circle</v-icon>
            In Cart
          </v-chip>
        </div>
      </v-img>
      <!-- Hover overlay for better UX -->
      <div class="hover-overlay">
        <v-icon size="32" color="white">mdi-eye</v-icon>
        <span class="hover-text">View Details</span>
      </div>
    </div>

    <!-- Product Content -->
    <v-card-text class="product-content">
      <div class="price-section">
        <span class="price">{{ formatCurrency(product.price) }}</span>
        <v-rating
          :model-value="product.rating || 4.5"
          color="amber"
          size="small"
          density="compact"
          readonly
          half-increments
        />
      </div>
      <!-- Product Title - CLICKABLE -->
      <h3
        class="product-title clickable"
        @click="$emit('navigate-to-product', product.id)"
      >
        {{ product.title }}
      </h3>
      <p class="product-description">{{ product.description }}</p>
    </v-card-text>

    <!-- Action Section -->
    <v-card-actions class="action-section">
      <QuantityCounter
        :model-value="quantity"
        @update:model-value="$emit('update-quantity', product.id, $event)"
        :max-quantity="10"
        class="mb-3"
      />
      <div class="button-group d-flex justify-center w-100">
        <v-btn
          v-if="isInCart"
          class="remove-btn"
          color="error"
          variant="outlined"
          @click="productStore.removeFromCart(product.id)"
          size="large"
        >
          <v-icon>mdi-delete</v-icon>
        </v-btn>

        <v-btn
          class="add-to-cart-btn"
          color="primary"
          variant="elevated"
          @click="$emit('add-to-cart', product.id)"
          size="large"
        >
          <v-icon>{{ isInCart ? "mdi-cart-check" : "mdi-cart-plus" }}</v-icon>
          {{ isInCart ? "Update Cart" : "Add to Cart" }}
        </v-btn>
      </div>
    </v-card-actions>
  </v-card>
</template>

<script setup>
import { ref } from "vue";
import QuantityCounter from "@/components/products/QuantityCounter.vue";
import { useProductStore } from "@/stores/products";

const productStore = useProductStore();

// Props
const props = defineProps({
  product: {
    type: Object,
    required: true,
    validator: (product) => {
      return (
        product &&
        typeof product.id !== "undefined" &&
        typeof product.title === "string" &&
        typeof product.price === "number" &&
        typeof product.image === "string" &&
        typeof product.description === "string"
      );
    },
  },
  quantity: {
    type: Number,
    default: 1,
  },
  isInCart: {
    type: Boolean,
    default: false,
  },
  showAnimation: {
    type: Boolean,
    default: false,
  },
});

// Emits
const emit = defineEmits([
  "navigate-to-product",
  "add-to-cart",
  "update-quantity",
]);

// Local state
const isHovered = ref(false);

// Methods
const formatCurrency = (price) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
};
</script>

<style scoped>
.product-card {
  height: 100%;
  display: flex;
  flex-direction: column;
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
  background: rgba(255, 255, 255, 0.95) !important;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 20px !important;
  overflow: hidden;
}

.product-card:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15) !important;
}

.card-hovered {
  background: rgba(255, 255, 255, 0.98) !important;
}

.image-container {
  position: relative;
  overflow: hidden;
}

.clickable {
  cursor: pointer;
  transition: all 0.3s ease;
}

.product-image {
  transition: transform 0.4s ease;
  border-radius: 20px 20px 0 0;
}

.product-card:hover .product-image {
  transform: scale(1.05);
}

.image-overlay {
  position: absolute;
  top: 12px;
  right: 12px;
  z-index: 2;
}

.hover-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: 1;
}

.image-container:hover .hover-overlay {
  opacity: 1;
}

.hover-text {
  color: white;
  font-size: 0.9rem;
  margin-top: 8px;
  font-weight: 500;
}

.cart-badge {
  background: rgba(76, 175, 80, 0.9) !important;
  color: white !important;
}

.product-content {
  flex-grow: 1;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.price-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.price {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1976d2;
  background: linear-gradient(45deg, #1976d2, #42a5f5);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.product-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #2c3e50;
  line-height: 1.4;
  margin-bottom: 8px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.product-title.clickable:hover {
  color: #1976d2;
  text-decoration: underline;
}

.product-description {
  color: #64748b;
  line-height: 1.6;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin: 0;
}

.action-section {
  padding: 24px;
  background: rgba(248, 250, 252, 0.8);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

.add-to-cart-btn {
  padding: 12px 24px !important;
  font-weight: 600;
  letter-spacing: 0.5px;
  border-radius: 12px !important;
  background: linear-gradient(45deg, #1976d2, #42a5f5) !important;
  box-shadow: 0 4px 12px rgba(25, 118, 210, 0.3) !important;
  transition: all 0.3s ease !important;
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

/* Responsive Design */
@media (max-width: 960px) {
  .product-content {
    padding: 20px;
  }
  .action-section {
    padding: 20px;
  }
}

@media (max-width: 600px) {
  .add-to-cart-btn {
    font-size: 0.9rem;
  }
}
</style>
