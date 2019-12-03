<template>
  <div>
    <van-swipe :autoplay="9000">

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
// 'http://172.16.11.135/flag/01.jpg',
//                 'http://172.16.11.135/flag/02.jpg',
//                 'http://172.16.11.135/flag/03.jpeg',
//                 'http://172.16.11.135/flag/04.jpeg',
//                 'http://172.16.11.135/flag/05.jpeg'
export default {
    name: 'Swipe',
    data() {
        return {
            images: [
                
            ]
        }
    }
}
</script>

<style>

</style>
