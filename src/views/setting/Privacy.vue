<template>
  <div>
    <van-sticky>
      <van-row type="flex" style="background-color: #F0F0F0;">
        <van-col span="2" style="text-align: center;margin-top:3%">
            <van-icon size="25px" name="arrow-left" @click="privacyBack"/>
        </van-col>
        <van-col span="7" style="text-align: center;margin-top:4%;margin-bottom:4%">
            <p ><strong>隐私设置</strong></p>
        </van-col>
      </van-row>
    </van-sticky>
      <img style="height: auto;max-width: 100%;" src="http://img4.imgtn.bdimg.com/it/u=2012569705,738909849&fm=26&gp=0.jpg"/>
  </div>
</template>

<script>
export default {
    name: 'Privacy',
    data () {
      return {
        
      }
    },
    methods: {
        privacyBack() {
            history.back()
        },
    }
}
</script>

<style>

</style>