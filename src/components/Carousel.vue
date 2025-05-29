<template>
  <div class="carousel-container">
    <carousel
      :items-to-show="itemsToShow"
      :wrap-around="true"
      :autoplay="3000"
      :pause-autoplay-on-hover="true"
      :breakpoints="breakpoints"
      class="carousel"
      :touch-drag="true"
      :mouse-drag="true"
    >
      <slide v-for="(item, index) in items" :key="index">
        <v-card
          :color="theme.global.current.value.dark ? 'grey-darken-3' : 'white'"
          class="carousel-card"
          elevation="0"
        >
          <v-img
            :src="item.src"
            :srcset="item.srcset"
            :sizes="item.sizes"
            :alt="item.alt"
            cover
            class="carousel-image"
            :aspect-ratio="16 / 9"
          >
            <div class="overlay">
              <v-card-title class="white--text">{{ item.title }}</v-card-title>
              <v-card-text class="white--text">{{ item.text }}</v-card-text>
            </div>
          </v-img>
        </v-card>
      </slide>

      <!-- Navigation -->
      <template #addons>
        <navigation />
        <pagination />
      </template>
    </carousel>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useTheme } from 'vuetify';
import { Carousel, Slide, Navigation, Pagination } from 'vue3-carousel';
import 'vue3-carousel/dist/carousel.css';

// Carousel items with specific images and responsive srcsets
const items = ref([
  {
    src: 'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0',
    srcset: `
      https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?fit=crop&w=600&h=337 600w,
      https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?fit=crop&w=960&h=540 960w,
      https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?fit=crop&w=1280&h=720 1280w
    `,
    sizes: '(max-width: 600px) 600px, (max-width: 960px) 960px, 1280px',
    alt: 'Nature Landscape',
    title: 'Explore Nature',
    text: 'Discover breathtaking landscapes with A-R.',
  },
  {
    src: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308',
    srcset: `
      https://images.unsplash.com/photo-1519125323398-675f0ddb6308?fit=crop&w=600&h=337 600w,
      https://images.unsplash.com/photo-1519125323398-675f0ddb6308?fit=crop&w=960&h=540 960w,
      https://images.unsplash.com/photo-1519125323398-675f0ddb6308?fit=crop&w=1280&h=720 1280w
    `,
    sizes: '(max-width: 600px) 600px, (max-width: 960px) 960px, 1280px',
    alt: 'City Skyline',
    title: 'Urban Adventures',
    text: 'Experience the vibrant city life with us.',
  },
  {
    src: 'https://images.unsplash.com/photo-1494526585095-c41746248156',
    srcset: `
      https://images.unsplash.com/photo-1494526585095-c41746248156?fit=crop&w=600&h=337 600w,
      https://images.unsplash.com/photo-1494526585095-c41746248156?fit=crop&w=960&h=540 960w,
      https://images.unsplash.com/photo-1494526585095-c41746248156?fit=crop&w=1280&h=720 1280w
    `,
    sizes: '(max-width: 600px) 600px, (max-width: 960px) 960px, 1280px',
    alt: 'Beach Sunset',
    title: 'Coastal Getaways',
    text: 'Relax by the sea with A-R.',
  },
]);

// Responsive breakpoints
const breakpoints = {
  0: { itemsToShow: 1, snapAlign: 'center' },
  600: { itemsToShow: 1, snapAlign: 'center' },
  960: { itemsToShow: 1, snapAlign: 'center' },
  1280: { itemsToShow: 1, snapAlign: 'center' },
};

// Dynamic items to show
const itemsToShow = ref(1);

const theme = useTheme();
</script>

<style scoped>
.carousel-container {
  max-width: 100vw;
  height: 100svh;
  top: 0;
  left: 0;
  z-index: 0; /* Below navbar and main content */
}

.carousel {
  width: 100%;
  height: 100%;
}

.carousel-card {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.carousel-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Ensure the carousel takes full height */
:deep(.carousel__viewport) {
  height: 100% !important;
}

:deep(.carousel__track) {
  height: 100% !important;
}

:deep(.carousel__slide) {
  height: 100% !important;
}

/* Fix arrows visibility and positioning */
:deep(.carousel__prev),
:deep(.carousel__next) {
  z-index: 10 !important; /* Above carousel content */
  background-color: rgba(0, 0, 0, 0.5) !important;
  color: white !important;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  top: 50%;
  transform: translateY(-50%);
  opacity: 0.8;
}

:deep(.carousel__prev:hover),
:deep(.carousel__next:hover) {
  opacity: 1;
}

:deep(.carousel__prev) {
  left: 16px;
}

:deep(.carousel__next) {
  right: 16px;
}

/* Fix pagination indicators visibility and positioning */
:deep(.carousel__pagination) {
  z-index: 10 !important; /* Above carousel content */
  position: absolute;
  bottom: 16px;
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 0;
}

:deep(.carousel__pagination-button) {
  background-color: v-bind('theme.global.current.value.dark ? "#ffffff" : "#1976D2"') !important;
  opacity: 0.5;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin: 0 4px;
}

:deep(.carousel__pagination-button--active) {
  opacity: 1;
}

.overlay {
  background: rgba(0, 0, 0, 0.5);
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 16px;
}
</style>