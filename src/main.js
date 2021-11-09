import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbvue/lib/css/mdb.min.css";
import Vue from "vue";
import App from "./App.vue";
import router from "./router";

import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import VueToastify from "vue-toastify";
import { isAuthenticated } from "./beforeEach";
Vue.use(VueToastify);
axios.defaults.withCredentials = true;

Vue.config.productionTip = false;

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requireAuth)) {
    if (to.name !== "Login" && !isAuthenticated()) next({ name: "Login" });
    else next();
  } else {
    next(); // make sure to always call next()!
  }
});

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
