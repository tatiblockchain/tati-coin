import Vue from "vue";
import App from "./App.vue";
import VeeValidate from "vee-validate";
import VueSweetalert2 from "vue-sweetalert2";

Vue.use(VeeValidate);
Vue.use(VueSweetalert2);

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");
