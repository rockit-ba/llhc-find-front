<template>
  <div>
    <van-swipe :autoplay="9000">

        <van-swipe-item v-for="(image, index) in images" :key="index">
            <van-image
                fit="contain"
                lazy-load
                :src=image
                @click="showInfo(index)"
            />
        </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
import { Toast } from 'vant';
export default {
    name: 'Swipe',
    data() {
        return {
            images: [
                'http://172.16.11.135/swiper/001.jpg',
                'http://172.16.11.135/swiper/002.jpg',
                'http://172.16.11.135/swiper/003.jpg',
                'http://172.16.11.135/swiper/004.jpg',
                'http://172.16.11.135/swiper/005.jpg',
                'http://172.16.11.135/swiper/006.jpg',
                'http://172.16.11.135/swiper/007.jpg',
                'http://172.16.11.135/swiper/008.jpg',
                'http://172.16.11.135/swiper/009.jpg',
                'http://172.16.11.135/swiper/010.jpg',
                'http://172.16.11.135/swiper/011.jpg',
            ]
        }
    },
    methods: {
        //展示图片信息
        showInfo(index){
            if(index == 0){
                Toast({
                    message: '虞美人盛开的山坡',
                    icon: 'video-o'
                });
            }else if(index == 1){
                Toast({
                    message: '千与千寻',
                    icon: 'video-o'
                });
            }else if(index == 2){
                Toast({
                    message: '风之谷',
                    icon: 'video-o'
                });
            }else if(index == 3){
                Toast({
                    message: '哈尔的移动城堡',
                    icon: 'video-o'
                });
            }else if(index == 4){
                Toast({
                    message: '猫的报恩',
                    icon: 'video-o'
                });
            }else if(index == 5){
                Toast({
                    message: '魔女宅急便',
                    icon: 'video-o'
                });
            }else if(index == 6){
                Toast({
                    message: '起风了',
                    icon: 'video-o'
                });
            }else if(index == 7){
                Toast({
                    message: '起风了',
                    icon: 'video-o'
                });
            }else if(index == 8){
                Toast({
                    message: '千与千寻',
                    icon: 'video-o'
                });
            }else if(index == 9){
                Toast({
                    message: '幽灵公主',
                    icon: 'video-o'
                });
            }else if(index == 10){
                Toast({
                    message: '虞美人盛开的山坡',
                    icon: 'video-o'
                });
            }

        },
    }
}
</script>

<style>

</style>
