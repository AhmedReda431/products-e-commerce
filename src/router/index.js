// src/router/index.js
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  { path: "/", component: () => import("../views/Products/index.vue") },
  { path: "/products", component: () => import("../views/Products/index.vue") },
   {
    path: '/products/:id',
    name: 'ProductDetails',
    component: () => import("../views/Products/details.vue"),
    props: true
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // If the user used browser back/forward
    if (savedPosition) {
      return savedPosition
    }

    // Scroll to top on route change
    return { top: 0, left: 0, behavior: 'smooth' }
  }
});

export default router;
