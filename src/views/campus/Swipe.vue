<template>
  <div>
    <van-swipe :autoplay="3000">

        <van-swipe-item v-for="(image, index) in images" :key="index">
            <van-image
            fit="contain"
            lazy-load
            :src=image
            />
        </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
export default {
    name: 'Swipe',
    data() {
        return {
            images: [
                'https://m.360buyimg.com/mobilecms/s700x280_jfs/t1/71727/29/16469/58755/5dde431fE922cb551/90331e783d2d6c0c.jpg!cr_1125x445_0_171!q70.jpg.dpg',
                'https://m.360buyimg.com/mobilecms/s700x280_jfs/t1/84503/12/16457/163638/5ddb69e5Ec75de9e5/5c1ea006a20af7c7.jpg!cr_1125x445_0_171!q70.jpg.dpg',
                'https://m.360buyimg.com/mobilecms/s700x280_jfs/t1/77844/36/16126/52980/5ddc867dEb827234a/3e7b06964bfb5fbe.jpg!cr_1125x445_0_171!q70.jpg.dpg'
            ]
        }
    }
}
</script>

<style>

</style>
