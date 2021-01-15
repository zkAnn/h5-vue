import "../assets/scss/base.scss";
const install = function(Vue) {
  let components = require.context("./", true, /\.vue$/);
  components.keys().forEach(key => {
    Vue.component(components(key).default.name, components(key).default);
  });
};
export default install;
