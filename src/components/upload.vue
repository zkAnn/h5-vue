<template>
  <div class="upload-wrap">
    <input type="file" class="file" @change="change" files="123" />
  </div>
</template>
<script>
import "../assets/scss/upload.scss";
export default {
  name: "z-upload",
  methods: {
    change(res) {
      console.log(res);
    }
  }
};
</script>
