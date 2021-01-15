<template>
  <div class="z-button" :class="className" @click="click">
    <slot></slot>
  </div>
</template>
<script>
import "../assets/scss/button.scss";
export default {
  name: "z-button",
  props: {
    type: {
      type: String,
      default: "primary",
      validator(value) {
        if( ["primary", "success", "info", "warning", "danger"].includes(value) ) {
          return true;
        }
        console.error( "type值只能为：" + ["primary", "success", "info", "warning", "danger"].join("、") );
      }
    }
  },
  methods:{
    click(event){
      this.$emit('click')
    }
  },
  computed: {
    className() {
      return `z-button__${this.type}`;
    }
  }
};
</script>
