<template>
  <div>
      <van-row type="flex" style="background-color: #F0F0F0;">
        <van-col span="2" style="text-align: center;margin-top:1%">
            <van-icon size="25px" name="arrow-left" @click="photosBack" />
        </van-col>
        <van-col span="7" style="text-align: center;margin-top:2%">
            <p ><strong>我的消息</strong></p>
        </van-col>
      </van-row>
      
      
  </div>
</template>

<script>
import {removeMessageNum} from "network/own/removeMessageNum"
import {getUser} from "common/auth"
export default {
    name: 'Message',
    data () {
      return {
        
      }
    },
    methods: {
        //回退
        photosBack(){
            history.back()
        },
      
    },
    created () {
        if(getUser().id != undefined && getUser().id != ''){
            removeMessageNum(getUser().id)
        }
    }
}
</script>

<style>

</style>