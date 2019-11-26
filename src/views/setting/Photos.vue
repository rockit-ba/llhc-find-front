<template>
  <div>
    <van-sticky>
      <van-row type="flex" style="background-color: #F0F0F0;">
        <van-col span="2" style="text-align: center;margin-top:3%">
            <van-icon size="25px" name="arrow-left" @click="photosBack" />
        </van-col>
        <van-col span="7" style="text-align: center;margin-top:4%;margin-bottom:4%">
            <p ><strong>个人相册</strong></p>
        </van-col>
      </van-row>
    </van-sticky>
    <img style="height: auto;max-width: 100%;" src="http://img3.imgtn.bdimg.com/it/u=3582549147,2816101432&fm=26&gp=0.jpg"/>
      
  </div>
</template>

<script>
export default {
    name: 'Photos',
    data () {
      return {
        
      }
    },
    methods: {
        //回退
        photosBack(){
            history.back()
        }
    }
}
</script>

<style>

</style>