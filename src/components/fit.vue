<template>
  <div class="z-fit" ref="fit">
    <div class="content" :style="style">
      <slot name="default"></slot>
    </div>
  </div>
</template>
<script>
// 全屏组件
function _css(attr){
  return this.currentStyle ? this.currentStyle[attr] : getComputedStyle(this)[attr];
}
export default {
  name: "z-fit",
  
  data(){
    return {
      w:0,
      h:0,
      style:{}
    }
  },
  
  props: {
    mode:{
      type:String,
      default:'cover',
      validator(value) {
        if( ["fill", "contain", "cover"].includes(value) ) {
          return true;
        }
        console.error( "mode值只能为：" + ["fill", "contain", "cover"].join("、") );
        return false;
      }
    },
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
    safeArea:{
      type:Array,
      validator(value) {
        if( value[0] && value[1] && value.slice(0,2).every(item => /^(\d+|(\d*\.\d+))$/.test(item)) ) {
            return true;
        }
        console.error( "safeArea数组长度必须大于0且每一项须为number类型");
        return false;
      }
    }
  },
  
  mounted(){
    let fit = this.$refs.fit;
    this.w = _css.call(fit,'width').slice(0,-2);
    this.h = _css.call(fit,'height').slice(0,-2);

    let [cw=0,ch=1] = this.area;
    this.computedStyle(this.mode,this.w,this.h,cw,ch);

  },
  methods: {
   computedStyle(mode,w,h,cw,ch){
    let obj = {
      fill:() =>`${w/cw},${h/ch}`,
      contain:() => Math.min(w/cw,h/ch),
      cover:() => {
        let scale = Math.max(w/cw,h/ch);
        if(this.safeAreaCheck){
          let safeW = this.safeArea[0],safeH = this.safeArea[1];
          if(safeW*scale>w || safeH*scale>h){
            scale = Math.min(w/safeW,h/safeH);
          }
        }
        return scale;
      }
    }
    this.style = {
      width:`${cw}px`,
      height:`${ch}px`,
      transform:`scale(${obj[mode]()}) translate3d(-50%,-50%,0)`
    }
   }
  },
  computed: {
    safeAreaCheck(){
      let safeArea = this.safeArea;
      let area = this.area;
      if(safeArea[0] && safeArea[1]){
        if(area[0]*1>=safeArea[0]*1 && area[1]*1>=safeArea[1]*1){
          return true
        }
        console.error("safeArea区域应该在area范围内")
        return false;
      }
      return false;
      
    }
  }
};
</script>
<style lang="scss">
.z-fit{
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  .content{
    position: absolute;
    left: 50%;
    top: 50%;
    transform-origin: left top;
    
  }
}

</style>
