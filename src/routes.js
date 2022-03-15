import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "HomePage",
    component: () => import("./pages/HomePage.vue"),
  },
  {
    path: "/favoritos",
    name: "FavouriteGifsPage",
    component: () => import("./pages/FavouriteGifsPage.vue"),
  },
  {
    path: "/gif/:id",
    name: "GifDetailsPage",
    component: () => import("./pages/GifDetailsPage.vue"),
  },
  {
    path: "/gifs-api",
    name: "ApiPage",
    component: () => import("./pages/ApiPage.vue"),
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
