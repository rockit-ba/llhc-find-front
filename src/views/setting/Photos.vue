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
    
    <van-row type="flex" justify="center" align="center">
      <van-col span="24">
        <van-grid :border="true" :column-num="3">
          <van-grid-item v-for="item in photosList">
            <van-image 
              @click="show=true;showImg(item)"
              :src="item" 
            />
          </van-grid-item>
        </van-grid>
      </van-col>
    </van-row>
    
    <!-- 预览图片 -->
    <van-image-preview
      v-model="show"
      :images="images"
    />
  </div>
</template>

<script>
import {photosList} from "network/own/photosList"
import {getUser} from "common/auth"
import { Toast } from 'vant';
export default {
    name: 'Photos',
    data () {
      return {
        images: [],  //预览图片列表
        show: false, //是否显示预览图片
        photosList: []  //图片列表
      }
    },
    methods: {
        //回退
        photosBack(){
            history.back()
        },
        //预览图片
        showImg(img){
          this.images = [img]
        },
    },
    created () {
      Toast.loading({
        message: '加载中...',
        forbidClick: true
      });
      const _router = this.$router
      photosList(getUser().id).then(res => {
        if(res.flag == true){
          this.photosList = res.data
          Toast.clear();
        }else if(res.code == 20004){
          _router.push({
            name: 'login',
            params: {page: 'setting'}
          })
        }
      })
    }
}
</script>

<style>
  

</style>