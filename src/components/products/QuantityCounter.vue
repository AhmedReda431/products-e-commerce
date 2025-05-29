<template>
  <div class="quantity-counter">
    <v-btn
      class="counter-btn decrease-btn"
      :class="{ disabled: modelValue <= 1 }"
      variant="outlined"
      size="small"
      @click="decrease"
      :disabled="modelValue <= 1"
    >
      <v-icon size="16">mdi-minus</v-icon>
    </v-btn>

    <div class="quantity-display">
      <span class="quantity-number">{{ modelValue }}</span>
      <span class="quantity-label">qty</span>
    </div>

    <v-btn
      class="counter-btn increase-btn"
      :class="{ active: modelValue > 1 }"
      variant="outlined"
      size="small"
      @click="increase"
      :disabled="modelValue >= maxQuantity"
    >
      <v-icon size="16">mdi-plus</v-icon>
    </v-btn>
  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: {
    type: Number,
    default: 1,
  },
  minQuantity: {
    type: Number,
    default: 1,
  },
  maxQuantity: {
    type: Number,
    default: 99,
  },
});

const emit = defineEmits(["update:modelValue"]);

const decrease = () => {
  if (props.modelValue > props.minQuantity) {
    emit("update:modelValue", props.modelValue - 1);
  }
};

const increase = () => {
  if (props.modelValue < props.maxQuantity) {
    emit("update:modelValue", props.modelValue + 1);
  }
};
</script>

<style scoped>
.quantity-counter {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 16px;
  padding: 4px;
  border: 2px solid rgba(25, 118, 210, 0.1);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(10px);
  min-width: 140px;
}

.quantity-counter:hover {
  border-color: rgba(25, 118, 210, 0.3);
  box-shadow: 0 4px 12px rgba(25, 118, 210, 0.15);
  transform: translateY(-1px);
}

.counter-btn {
  min-width: 36px !important;
  width: 36px;
  height: 36px;
  border-radius: 12px !important;
  border: 1.5px solid rgba(25, 118, 210, 0.2) !important;
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.9),
    rgba(248, 250, 252, 0.9)
  ) !important;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1) !important;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1) !important;
}

.counter-btn:hover:not(.disabled) {
  border-color: rgba(25, 118, 210, 0.4) !important;
  background: linear-gradient(135deg, #1976d2, #42a5f5) !important;
  color: white !important;
  transform: scale(1.05);
  box-shadow: 0 2px 8px rgba(25, 118, 210, 0.3) !important;
}

.counter-btn.active {
  border-color: rgba(25, 118, 210, 0.6) !important;
  background: linear-gradient(
    135deg,
    rgba(25, 118, 210, 0.1),
    rgba(66, 165, 245, 0.1)
  ) !important;
}

.counter-btn.disabled {
  opacity: 0.4;
  cursor: not-allowed;
  border-color: rgba(0, 0, 0, 0.1) !important;
  background: rgba(245, 245, 245, 0.8) !important;
}

.counter-btn.disabled:hover {
  transform: none;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1) !important;
}

.quantity-display {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 48px;
  padding: 8px 12px;
  background: linear-gradient(
    135deg,
    rgba(25, 118, 210, 0.08),
    rgba(66, 165, 245, 0.05)
  );
  border-radius: 12px;
  border: 1px solid rgba(25, 118, 210, 0.1);
  position: relative;
}

.quantity-number {
  font-size: 1.2rem;
  font-weight: 700;
  color: #1976d2;
  line-height: 1;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.quantity-label {
  font-size: 0.65rem;
  font-weight: 500;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-top: 2px;
  opacity: 0.8;
}

/* Pulse animation for quantity changes */
.quantity-display {
  animation: none;
}

.quantity-counter:active .quantity-display {
  animation: quantityPulse 0.3s ease-out;
}

@keyframes quantityPulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
    background: linear-gradient(
      135deg,
      rgba(25, 118, 210, 0.15),
      rgba(66, 165, 245, 0.1)
    );
  }
  100% {
    transform: scale(1);
  }
}

/* Responsive adjustments */
@media (max-width: 600px) {
  .quantity-counter {
    min-width: 120px;
    gap: 1px;
  }

  .counter-btn {
    min-width: 32px !important;
    width: 32px;
    height: 32px;
  }

  .quantity-display {
    min-width: 40px;
    padding: 6px 8px;
  }

  .quantity-number {
    font-size: 1.1rem;
  }

  .quantity-label {
    font-size: 0.6rem;
  }
}
</style>
