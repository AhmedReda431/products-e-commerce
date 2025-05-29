<template>
  <v-menu
    v-model="cartMenu"
    :close-on-content-click="false"
    location="bottom end"
    :offset="8"
    transition="slide-y-transition"
  >
    <template v-slot:activator="{ props }">
      <v-btn
        v-bind="props"
        class="cart-trigger-btn"
        :class="{ 'cart-has-items': productStore.cartCount > 0 }"
        variant="elevated"
        size="large"
      >
        <v-icon size="24">mdi-cart-outline</v-icon>
        <v-badge
          v-if="productStore.cartCount"
          :content="productStore.cartCount"
          color="error"
          class="cart-badge"
          floating
        />
        <div class="cart-pulse" v-if="productStore.cartCount > 0"></div>
      </v-btn>
    </template>

    <v-card
      class="cart-dropdown"
      min-width="400px"
      max-width="450px"
      elevation="24"
    >
      <!-- Cart Header -->
      <div class="cart-header">
        <div class="cart-header-content">
          <v-icon class="cart-header-icon">mdi-cart</v-icon>
          <div class="cart-header-text">
            <h3 class="cart-title">Shopping Cart</h3>
            <p class="cart-subtitle" v-if="productStore.cartCount">
              {{ productStore.cartCount }} item{{
                productStore.cartCount !== 1 ? "s" : ""
              }}
            </p>
          </div>
        </div>
        <v-btn
          icon
          variant="text"
          size="small"
          @click="cartMenu = false"
          class="close-btn"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </div>

      <v-divider class="cart-divider" />

      <!-- Cart Items -->
      <div class="cart-content">
        <v-list v-if="productStore.cartItems.length" class="cart-list">
          <div
            v-for="(item, index) in productStore.cartItems"
            :key="item.productId"
            class="cart-item-wrapper"
          >
            <div class="cart-item">
              <!-- Product Image -->
              <div class="item-image-container">
                <v-img
                  :src="item.image"
                  class="item-image"
                  width="60"
                  height="60"
                  cover
                />
              </div>

              <!-- Product Details -->
              <div class="item-details">
                <h4 class="item-title" :title="item.title">
                  {{
                    item.title.length > 50
                      ? `${item.title.substring(0, 50)}...`
                      : item.title
                  }}
                </h4>
                <div class="item-price-section">
                  <span class="item-price">{{
                    formatCurrency(item.price)
                  }}</span>
                  <v-chip
                    v-if="item.originalPrice && item.originalPrice > item.price"
                    size="x-small"
                    color="success"
                    variant="tonal"
                    class="discount-chip"
                  >
                    {{
                      Math.round(
                        ((item.originalPrice - item.price) /
                          item.originalPrice) *
                          100
                      )
                    }}% OFF
                  </v-chip>
                </div>

                <!-- Quantity Counter -->
                <div class="item-quantity-section">
                  <QuantityCounter
                    :model-value="item.quantity"
                    @update:model-value="
                      (value) =>
                        productStore.addOrUpdateCart(item.productId, value, {
                          price: item.price,
                          title: item.title,
                          image: item.image,
                        })
                    "
                    :max-quantity="20"
                    size="small"
                  />
                </div>
              </div>

              <!-- Item Total & Actions -->
              <div class="item-actions">
                <div class="item-total">
                  {{ formatCurrency(item.price * item.quantity) }}
                </div>
                <v-btn
                  icon
                  size="small"
                  variant="text"
                  class="remove-btn"
                  @click="productStore.removeFromCart(item.productId)"
                >
                  <v-icon color="error" size="18">mdi-delete-outline</v-icon>
                </v-btn>
              </div>
            </div>

            <v-divider
              v-if="index < productStore.cartItems.length - 1"
              class="item-divider"
            />
          </div>
        </v-list>

        <!-- Empty Cart State -->
        <div v-else class="empty-cart">
          <v-icon size="64" class="empty-cart-icon">mdi-cart-outline</v-icon>
          <h4 class="empty-cart-title">Your cart is empty</h4>
          <p class="empty-cart-subtitle">Add some products to get started!</p>
        </div>
      </div>

      <!-- Cart Footer -->
      <div v-if="productStore.cartItems.length" class="cart-footer">
        <v-divider class="footer-divider" />

        <!-- Cart Summary -->
        <div class="cart-summary">
          <div class="summary-row">
            <span class="summary-label">Subtotal:</span>
            <span class="summary-value">{{
              formatCurrency(productStore.cartTotal)
            }}</span>
          </div>
          <div class="summary-row total-row">
            <span class="summary-label">Total:</span>
            <span class="summary-total">{{
              formatCurrency(productStore.cartTotal)
            }}</span>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="cart-actions">
          <v-btn
            color="error"
            variant="outlined"
            size="large"
            @click="productStore.clearCart()"
            class="clear-btn"
          >
            <v-icon start>mdi-delete-sweep</v-icon>
            Clear Cart
          </v-btn>

          <v-btn
            color="primary"
            variant="elevated"
            size="large"
            class="checkout-btn"
            @click="proceedToCheckout"
          >
            <v-icon start>mdi-credit-card</v-icon>
            Checkout
          </v-btn>
        </div>
      </div>
    </v-card>
  </v-menu>
</template>

<script setup>
import { ref } from "vue";
import { useProductStore } from "@/stores/products";
import QuantityCounter from "@/components/products/QuantityCounter.vue";

const productStore = useProductStore();
const cartMenu = ref(false);

// Format currency
const formatCurrency = (price) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
};

// Proceed to checkout
const proceedToCheckout = () => {
  console.log("Proceeding to checkout...");
  cartMenu.value = false;
};
</script>

<style scoped>
.cart-trigger-btn {
  position: relative;
  background: rgba(255, 255, 255, 0.9) !important;
  backdrop-filter: blur(10px);
  border: 2px solid rgba(25, 118, 210, 0.2) !important;
  border-radius: 16px !important;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1) !important;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
  overflow: visible;
}

.cart-trigger-btn:hover {
  background: linear-gradient(135deg, #1976d2, #42a5f5) !important;
  color: white !important;
  border-color: rgba(25, 118, 210, 0.4) !important;
  transform: translateY(-2px) scale(1.05);
  box-shadow: 0 8px 20px rgba(25, 118, 210, 0.3) !important;
}

.cart-trigger-btn.cart-has-items {
  border-color: rgba(244, 67, 54, 0.3) !important;
}

.cart-trigger-btn.cart-has-items:hover {
  background: linear-gradient(135deg, #f44336, #ef5350) !important;
}

.cart-badge {
  z-index: 10;
}

.cart-pulse {
  position: absolute;
  top: -2px;
  right: -2px;
  width: 12px;
  height: 12px;
  background: #f44336;
  border-radius: 50%;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% {
    transform: scale(0.8);
    opacity: 1;
  }
  50% {
    transform: scale(1.2);
    opacity: 0.7;
  }
  100% {
    transform: scale(0.8);
    opacity: 1;
  }
}

/* Cart Dropdown */
.cart-dropdown {
  border-radius: 20px !important;
  overflow: hidden;
  backdrop-filter: blur(20px);
  background: rgba(255, 255, 255, 0.98) !important;
  border: 1px solid rgba(255, 255, 255, 0.3);
}

/* Cart Header */
.cart-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 24px 16px;
  background: linear-gradient(
    135deg,
    rgba(25, 118, 210, 0.08),
    rgba(66, 165, 245, 0.05)
  );
}

.cart-header-content {
  display: flex;
  align-items: center;
  gap: 12px;
}

.cart-header-icon {
  color: #1976d2;
  font-size: 28px;
}

.cart-title {
  font-size: 1.4rem;
  font-weight: 700;
  color: #2c3e50;
  line-height: 1.2;
  margin: 0;
}

.cart-subtitle {
  font-size: 0.9rem;
  color: #64748b;
  margin: 0;
  font-weight: 500;
}

.close-btn {
  opacity: 0.7;
  transition: opacity 0.2s ease;
}

.close-btn:hover {
  opacity: 1;
}

.cart-divider {
  border-color: rgba(25, 118, 210, 0.1);
}

/* Cart Content */
.cart-content {
  max-height: 400px;
  overflow-y: auto;
}

.cart-list {
  padding: 0;
}

.cart-item-wrapper {
  padding: 0;
}

.cart-item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px 24px;
  transition: background-color 0.2s ease;
}

.cart-item:hover {
  background: rgba(25, 118, 210, 0.02);
}

/* Item Image */
.item-image-container {
  flex-shrink: 0;
}

.item-image {
  border-radius: 12px;
  border: 2px solid rgba(0, 0, 0, 0.05);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

/* Item Details */
.item-details {
  flex-grow: 1;
  min-width: 0;
}

.item-title {
  font-size: 1rem;
  font-weight: 600;
  color: #2c3e50;
  line-height: 1.3;
  margin: 0 0 8px 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.item-price-section {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
}

.item-price {
  font-size: 1.1rem;
  font-weight: 700;
  color: #1976d2;
}

.discount-chip {
  height: 20px;
  font-size: 0.7rem;
  font-weight: 600;
}

.item-quantity-section {
  margin-top: 8px;
}

/* Item Actions */
.item-actions {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 8px;
  flex-shrink: 0;
}

.item-total {
  font-size: 1.2rem;
  font-weight: 700;
  color: #2c3e50;
  text-align: right;
}

.remove-btn {
  opacity: 0.7;
  transition: all 0.2s ease;
}

.remove-btn:hover {
  opacity: 1;
  transform: scale(1.1);
}

.item-divider {
  margin: 0 24px;
  border-color: rgba(0, 0, 0, 0.06);
}

/* Empty Cart */
.empty-cart {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 24px;
  text-align: center;
}

.empty-cart-icon {
  color: #cbd5e1;
  margin-bottom: 16px;
}

.empty-cart-title {
  font-size: 1.3rem;
  font-weight: 600;
  color: #64748b;
  margin: 0 0 8px 0;
}

.empty-cart-subtitle {
  font-size: 0.95rem;
  color: #94a3b8;
  margin: 0;
}

/* Cart Footer */
.cart-footer {
  background: rgba(248, 250, 252, 0.8);
  backdrop-filter: blur(10px);
}

.footer-divider {
  border-color: rgba(25, 118, 210, 0.1);
}

.cart-summary {
  padding: 20px 24px 16px;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.summary-row:last-child {
  margin-bottom: 0;
}

.summary-label {
  font-size: 0.95rem;
  color: #64748b;
  font-weight: 500;
}

.summary-value {
  font-size: 1rem;
  color: #2c3e50;
  font-weight: 600;
}

.total-row {
  padding-top: 8px;
  border-top: 2px solid rgba(25, 118, 210, 0.1);
  margin-top: 8px;
}

.summary-total {
  font-size: 1.3rem;
  color: #1976d2;
  font-weight: 700;
}

/* Cart Actions */
.cart-actions {
  display: flex;
  gap: 12px;
  padding: 16px 24px 20px;
}

.clear-btn {
  flex: 0 0 auto;
  border-radius: 12px !important;
  font-weight: 600;
  border-color: rgba(244, 67, 54, 0.3) !important;
}

.checkout-btn {
  flex: 1;
  border-radius: 12px !important;
  font-weight: 700;
  letter-spacing: 0.5px;
  background: linear-gradient(45deg, #1976d2, #42a5f5) !important;
  box-shadow: 0 4px 12px rgba(25, 118, 210, 0.3) !important;
  transition: all 0.3s ease !important;
}

.checkout-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(25, 118, 210, 0.4) !important;
}

/* Responsive Design */
@media (max-width: 480px) {
  .cart-dropdown {
    min-width: 350px;
    max-width: 95vw;
  }

  .cart-item {
    padding: 16px 20px;
    gap: 12px;
  }

  .item-image {
    width: 50px;
    height: 50px;
  }

  .cart-actions {
    flex-direction: column;
  }

  .clear-btn {
    order: 2;
  }

  .checkout-btn {
    order: 1;
  }
}

/* Custom scrollbar */
.cart-content::-webkit-scrollbar {
  width: 6px;
}

.cart-content::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.05);
  border-radius: 3px;
}

.cart-content::-webkit-scrollbar-thumb {
  background: rgba(25, 118, 210, 0.3);
  border-radius: 3px;
}

.cart-content::-webkit-scrollbar-thumb:hover {
  background: rgba(25, 118, 210, 0.5);
}
</style>
