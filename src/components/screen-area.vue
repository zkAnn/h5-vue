<template>
  <div class="z-screen-area" :class="{hide:hidden}">
    <div class="content" ref="content">
      <slot name="default"></slot>
    </div>
    <div class="loading-wrap" v-show="isWork" v-if="loading">
      <slot name="loading">
        <div class="default-loading">
          <div class="i-wrap">
            <i></i>
            <i></i>
            <i></i>
          </div>
          <div class="text">生成中...</div>
        </div>
      </slot>
    </div>
   
  </div>
</template>
<script>
// 截屏组件
//参数说明：
//  start 开始截图 建议使用v-model绑定
//options 截图配置参数
//output 输出类型  默认 canvas  可选 image
//hidden 是否隐藏元素  默认 false
//loading 是否显示加载层  默认 true

//自定义加载层 提供slot=loading插槽
import html2canvas from 'html2canvas';
export default {
  name: "z-screen-area",
  model:{
    prop:"start",
    event:"completeAfter"
  },
  data(){
    return {
      isWork:false,
      templateLoaded:false
    }
  },
  props: {
    start: {
      type: Boolean,
      default: false,
      required:true
    },
    options:{
      type: Object
    },
    output:{
      type: String,
      default:'canvas'
    },
    hidden:{
      type:Boolean,
      default:false,
    },
    loading:{
      type:Boolean,
      default:true,
    }
  },
  watch:{
    start:{
      handler(value){
        if(value&& this.templateLoaded ){
          this.startFn()
        }else if(!value && this.isWork){
          this.complete({msg:'cancel',error:'Artificial cancelled'})
        }
      },
      immediate:true
    }
  },
  mounted(){
  //  修复start初始为true时，模板未渲染完成问题
    this.templateLoaded=true;
    if(this.start){
      this.startFn()
    }
   
  },
  methods: {
    startFn() {
      this.isWork=true;
      let content = this.$refs.content;
      setTimeout(()=>{
      html2canvas(content,this.html2canvasOptions).then( canvas => {
        this.successFn(canvas)
      }).catch(err=>{
        this.complete({msg:'fail',error:err});
      })
      },5000)
     
    },
    successFn(canvas){
      let data = canvas;
      if(this.output==='image'){
        data = {
          img:canvas.toDataURL("image/jpg"),
          width:canvas.width,
          height:canvas.height
        }
      }
      this.complete({msg:"ok",data})
    },
    complete(data){
      this.isWork = false;
      this.$emit("complete",data);
      this.$emit('completeAfter',false)
    },
   
  },
  computed: {
    html2canvasOptions(){
      return {useCORS:true,...this.options}
    }
  }
};
</script>
<style lang="scss">
.z-screen-area{
  position: relative;
  width: 100%;
  height: 100%;
  &.hide{
    position: fixed;
    left: 200%;
  }
  .loading-wrap{
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,.7);
    color: #fff;
     z-index: 99999;
    .default-loading{
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      align-content: center;
      flex-flow: wrap;
      font-size: 14px;
      letter-spacing: 1px;
      pointer-events:auto;
      -webkit-overflow-scrolling:touch;
      animation-fill-mode:both;
      animation-duration:.2s;
      animation-name:layui-m-anim-scale;
      .i-wrap{
        display: flex;
        justify-content: center;
        align-items: center;
        height: 25px;
      }
      i{
        width:25px;
        height:25px;
        margin-left:8px;
        background-color:#fff;
        border-radius:100%;
        animation:layui-m-anim-loading 1.4s infinite ease-in-out;
        animation-fill-mode:both;

        &:first-child{
          margin-left:0;
          animation-delay:-.32s
        }
        &:nth-child(2){
          animation-delay:-.16s
        }
      }
      .text{
        width: 100%;
        height: 14px;
        margin: 20px 0 30px;
        text-align: center;
      }
    }
  }
}

 
 @keyframes layui-m-anim-scale{
   0%{opacity:0;transform:scale(.5)}
   100%{opacity:1;transform:scale(1)}
}
@keyframes layui-m-anim-loading{
  0%,100%,80%{transform:scale(0);}
  40%{transform:scale(1)}
}

</style>
