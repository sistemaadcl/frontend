import Vue from "vue";
import VueRouter from "vue-router";
import { isRole } from "../beforeEach";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "about" */ "../components/Login.vue"),
  },
  {
    path: "/",
    name: "Registro",
    component: () =>
      import(/* webpackChunkName: "about" */ "../components/Register.vue"),
  },
  {
    path: "/crear-promociones",
    name: "Productos",
    meta: {
      requireAuth: true,
    },
    beforeEnter: (to, from, next) => {
      if (isRole().role === "admin" || isRole().role === "sale") {
        next();
      } else {
        next("/login");
      }
    },
    component: () =>
      import(/* webpackChunkName: "about" */ "../components/Productos.vue"),
  },
  {
    path: "/cotizaciones",
    name: "Cotizaciones",
    meta: {
      requireAuth: true,
    },
    beforeEnter: (to, from, next) => {
      if (isRole().role === "admin" || isRole().role === "sale") {
        next();
      } else {
        next("/login");
      }
    },
    component: () =>
      import(/* webpackChunkName: "about" */ "../components/Cotizaciones.vue"),
  },
  {
    path: "/contabilidad",
    name: "Contabilidad",
    meta: {
      requireAuth: true,
    },
    beforeEnter: (to, from, next) => {
      if (isRole().role === "admin" || isRole().role === "cont") {
        next();
      } else {
        next("/login");
      }
    },
    component: () =>
      import(/* webpackChunkName: "about" */ "../components/Contabilidad.vue"),
  },
  {
    path: "/servicios",
    name: "servicios",
    meta: {
      requireAuth: true,
    },
    beforeEnter: (to, from, next) => {
      if (isRole().role === "admin" || isRole().role === "invent") {
        next();
      } else {
        next("/login");
      }
    },
    component: () =>
      import(/* webpackChunkName: "about" */ "../components/Servicios.vue"),
  },
  {
    path: "/configuracion",
    name: "configuracion",
    meta: {
      requireAuth: true,
    },
    beforeEnter: (to, from, next) => {
      if (isRole().role === "admin") {
        next();
      } else {
        next("/login");
      }
    },
    component: () =>
      import(/* webpackChunkName: "about" */ "../components/Configuracion.vue"),
  },
  {
    path: "/perfil",
    name: "perfil",
    meta: {
      requireAuth: true,
    },
    beforeEnter: (to, from, next) => {
      if (!(isRole().role === "admin")) {
        next();
      } else {
        next("/login");
      }
    },
    component: () =>
      import(/* webpackChunkName: "about" */ "../components/Perfils.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
