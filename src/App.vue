<template>
  <div id="app">
    <!-- <z-screen-area v-model="screen" @complete="fn" output="image" :hidden="true" >
    <z-button>默认按钮</z-button>
    <z-button type="primary">主要按钮</z-button>
    <z-button type="success">主要按钮</z-button>
    <z-button type="info">主要按钮</z-button>
    
    <z-button type="warning">主要按钮</z-button>
    <z-button type="danger">主要按钮</z-button>
    <z-upload @upload="upload"></z-upload>
    
       
        
    </z-screen-area> -->
    <!-- <z-button type="primary" @click="create">生成海报</z-button> -->
    <!-- <img id="canvas" :src="img" style="width:100%;height:auto;" :width="style.width" :height="style.height"/> -->
    <!-- <z-fit style="width:375px;height:500px;margin:150px auto;border:5px solid red;box-sizing:border-box;"  :area='[850,1350]' :safeArea='[750,1000]' mode="cover">
      <div style="width:100%;height:100%;background:rgba(80,234,64,.5);">
        <div style="position:absolute;left:50px;top:175px;width:750px;height:1000px;background:green;"></div>
      </div>
    </z-fit> -->
    <z-img-map style="width:500px;height:500px;margin:50px auto;" :area="[500,500]" :list="imgList" @click="mapClick"></z-img-map>
  </div>
</template>
<script>
export default {
  name: "App",
  data(){
    return {
      screen:false,
      img:'',
      style:{},
      imgList:[
        {
          src:require('./assets/imgs/map/beimeizhou/beimeizhou00.png'),
          activedSrc:require('./assets/imgs/map/beimeizhou/beimeizhou01.png'),
          x:0,
          y:0,
          w:769,
          actived:false
        },
        {
          src:require('./assets/imgs/map/beimeizhou/beimeizhou01.png'),
          x:0,
          y:0,
          w:769
        }
      ]
    }
  },
  created(){
    // setTimeout(()=>{this.screen = true},6000)
  },
  methods: {
    mapClick(index){
      console.log(index)
    },
    upload() {
      console.log("上传完成");
    },
    create(){
      console.log(123)
      this.screen = true;
    },
    fn(res) {
      // this.screen = false;
      console.log("截图成功",res);
      this.img = res.data.img;
      this.style = {
        width:res.data.width+'px',
        height:res.data.height+'px'
      }
     
    }
  }
};
</script>
<style lang="scss">
*{
  margin: 0;
  padding: 0;
}
</style>
