import Vue from "vue";
import App from "./App.vue";
import zVue from "./components/index";
Vue.use(zVue);
Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");
