import { defineStore } from "pinia";

export const useProductStore = defineStore("products", {
  state: () => ({
    cart: [],
    cartQuantities: {},
  }),
  getters: {
    cartItems(state) {
      return state.cart.map((item) => ({
        ...item,
        quantity: state.cartQuantities[item.productId] || item.quantity,
      }));
    },
    cartCount(state) {
      return state.cart.reduce(
        (total, item) =>
          total + (state.cartQuantities[item.productId] || item.quantity),
        0
      );
    },
    cartTotal(state) {
      return state.cart.reduce((total, item) => {
        const quantity = state.cartQuantities[item.productId] || item.quantity;
        return total + (item.price ? item.price * quantity : 0);
      }, 0);
    },
  },
  actions: {
    addOrUpdateCart(productId, quantity, productDetails = {}) {
      if (quantity <= 0) {
        this.removeFromCart(productId);
        return;
      }
      const cartItem = this.cart.find((item) => item.productId === productId);
      if (cartItem) {
        this.cartQuantities[productId] = quantity;
      } else {
        this.cart.push({ productId, ...productDetails, quantity });
        this.cartQuantities[productId] = quantity;
      }
    },

    removeFromCart(productId) {
      this.cart = this.cart.filter((item) => item.productId !== productId);
      delete this.cartQuantities[productId];
    },

    clearCart() {
      this.cart = [];
      this.cartQuantities = {};
    },
  },
  persist: {
    storage: localStorage,
    paths: ["cart", "cartQuantities"],
  },
});
