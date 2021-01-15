<template>
  <div class="z-img-map">
    <div class="imgs-wrap" @click="click">
      <img :src="img.actived && img.activedSrc || img.src" alt="" ref="img" :data-index="index" v-for="(img,index) in list" :key="index">
    </div>
  </div>
</template>
<script>
function _css(attr){
  return this.currentStyle ? this.currentStyle[attr] : getComputedStyle(this)[attr];
}
export default {
  name: "z-img-map",
  
  data(){
    return {
     imgs:[]
    }
  },
  
  props: {
    area:{
      type:Array,
      required:true,
      validator(value) {
        if( value[0] && value[1] && value.slice(0,2).every(item => /^(\d+|(\d*\.\d+))$/.test(item)) ) {
            return true;
        }
        console.error( "area数组长度必须大于0且每一项须为number类型");
        return false;
      }
    },
    list:{
      type:Array,
      validator(value) {
        return true;
      }
    }
    
  },
  
  mounted(){
    this.imgs = this.$refs.img;
  },
  methods: {
    
    click(e){
      let index = e.target.dataset.index;
      if(index===undefined){
        return false;
      }
      let x = e.clientX, y = e.clientY;
      index = this.findPointElement(x, y);
      if(index===-1){
        return false;
      }
      this.$emit('click',index)
    },
    
    findPointElement(eX, eY) {
      let arr = [];
      let canvas = document.createElement('canvas');
      let ctx = canvas.getContext('2d');
      let imgs = this.imgs;
      for(let i = 0,len = imgs.length; i<len; i++){
        let item = imgs[i];
        let pos = item.getBoundingClientRect();
        if (eX >= pos.left && eX <= pos.right && eY >= pos.top && eY <= pos.bottom) {
            var x = eX - pos.left;
            var y = eY - pos.top;
            canvas.width = item.width;
            canvas.height = item.height;
            ctx.drawImage(item, 0, 0, item.width, item.height);
            var data = ctx.getImageData(x, y, 1, 1).data;
            ctx.clearRect(0, 0, item.width, item.height);
            if (data[3] != 0) {
              arr.push({zIndex:item.zIndex||i,index:i})
            }
        }
      }
      if(arr.length>1){
        return arr.sort((x,y)=>{y.zIndex - x.zIndex})[0].index;
      }
      return arr[0] ? arr[0].index : -1;
    }
  },
  computed: {
    
  }
};
</script>
<style lang="scss">
.z-img-map{
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: cadetblue;
 
}

</style>
