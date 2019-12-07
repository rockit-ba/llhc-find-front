<template>
  <div>
      <van-row type="flex" style="background-color: #F0F0F0;">
        <van-col span="2" style="text-align: center;margin-top:2%">
            <van-icon size="25px" name="arrow-left" @click="feedBack"/>
        </van-col>
        <van-col span="7" style="text-align: center;margin-top:3%;margin-bottom:3%">
            <p ><strong>意见留言</strong></p>
        </van-col>
      </van-row>
      <van-row type="flex" justify="center" style="margin-top:3%;">
        <van-col span="20">
          <van-cell-group>
            <van-field
              v-model="message"
              rows="3"
              autosize
              type="textarea"
              maxlength="150"
              placeholder="输入您的留言"
              show-word-limit
              left-icon="question-o"
              @click-left-icon="$toast('包括您想要获取的资料和想要新增的功能')"
            />
          </van-cell-group>
        </van-col>
      </van-row>

      <van-row type="flex" justify="center">
        <van-col span="20" style="text-align: center;margin-top:10%;">
          <van-button type="primary" @click="feedSubmit">
            <p style="font-size: 15px;"><strong>提&nbsp;&nbsp;交</strong></p>
          </van-button>
        </van-col>
      </van-row>
      
  </div>
</template>

<script>
import {feedSubmitRequest} from "network/setting/feedSubmitRequest"
import { Toast } from 'vant';
import {regexp} from "common/regexp"
export default {
    name: 'FeedBack',
    data () {
      return {
        message: ''
      }
    },
    methods: {
        feedBack() {
            history.back()
        },
        feedSubmit() {
            if(regexp.test(this.message)){
                Toast('您输入了不合法的字符，可能是空格哦~')
            }else{
              feedSubmitRequest(this.message).then(res => {
                    if(res.code == 20000){
                      Toast('提交成功，请耐心等待~')
                    }else{
                      Toast('提交失败，稍后可以重试~')
                    }
                })
            }
            
        }
    }
}
</script>

<style>

</style>