<template>
  <van-tabbar v-model="active" :safe-area-inset-bottom=adapt>
        <van-tabbar-item icon="wap-home" @click="main">主页</van-tabbar-item>
        <van-tabbar-item icon="coupon" @click="release">发布</van-tabbar-item>
        <van-tabbar-item icon="friends" :dot=flag @click="own">我的</van-tabbar-item>
  </van-tabbar>
</template>

<script>
export default {
    name: 'TabBar',
    data () {
        return {
            adapt: true,
            flag: false,  //是否显示小红点
            active: 0,  //默认首页激活状态
        }
    },
    methods: {
         main() {
            this.$router.push("/main")
        },
        release() {
            this.$router.push("/release")
        },
        own() {
            this.$router.push("/own")
        },

    },
    components:{
    },
    

}
</script>

<style>

</style>