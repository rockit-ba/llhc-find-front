<template>
  <div class="settong-outer">

    <van-row class="setting-row-1">
      <van-col span="6" offset="2" style="margin-top:1%;">
        <!-- :src="user.avatar" -->
          <van-image
            @click="updateAvatar"
            round
            width="65px"
            height="65px"
            fit="cover"
            src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2647440584,4067241814&fm=26&gp=0.jpg"
            
          />
      </van-col>
      <van-col span="15" offset="1">
        <van-row class="setting-nickname" @click="updateNickname">
            <!-- <p v-show="user.name != 'null'"><strong>{{user.name}}</strong></p>
            <p v-show="user.name == 'null'" style="color: #9A9090;">点击修改昵称</p> -->
            <p ><strong>宁采野花不采臣</strong></p>
        </van-row>
        <van-row class="setting-phone">
          <!--{{user.phone}}  -->
            登录名:18235062724
        </van-row>
      </van-col>
      
      <van-dialog
        @confirm=uploadAvatar
        @cancel=cancelUpload
        v-model="show"
        title="修改头像"
        show-cancel-button
      >
      <!-- 头像上传弹出框 -->
        <van-row type="flex" justify="center">
          <van-col span="6">
            <van-uploader
              class="avatarUpload"
              v-model="fileList"
              multiple
              :before-read="beforeRead"
              :max-count="1"
            />
          </van-col>
        </van-row>
        
      </van-dialog>


      <van-dialog
        @confirm=updateName
        @cancel=cancelUpdateName
        v-model="nameShow"
        title="修改昵称"
        show-cancel-button
      >
          <van-row type="flex" justify="center">
            <van-col span="20">
                <van-cell-group>
                  <van-field 
                    v-model="name"
                    :placeholder=showContent()
                    
                    input-align="center"
                    maxlength="7"
                    clearable
                    />
                </van-cell-group>
            </van-col>
          </van-row>
      
      </van-dialog>

    </van-row>


    <van-row type="flex" justify="center" style="margin-top:2%;">
      <van-col span="24">
        <van-cell size="large" is-link to="index" >
          <van-col slot="icon">
              <van-icon
                color="#10AC96"
                name="more"
                size='25px'
                style="line-height: inherit;"
              />
          </van-col>
          <van-col slot="title" offset="1">
            <p>资料</p>
          </van-col>
        </van-cell>
      </van-col>
    </van-row>

    <van-row type="flex" justify="center" style="margin-top:2%;">
      <van-col span="24">
        <van-cell size="large" is-link to="index" >
          <van-col slot="icon">
              <van-icon
                color="#0099FF"
                name="photo"
                size='25px'
                style="line-height: inherit;"
              />
          </van-col>
          <van-col slot="title" offset="1">
            <p>相册</p>
          </van-col>
        </van-cell>
      </van-col>
    </van-row>

    <van-row type="flex" justify="center" style="margin-top:2%;">
      <van-col span="24">
        <van-cell size="large" is-link to="index" >
          <van-col slot="icon">
              <van-icon
                color="#FF1400"
                name="lock"
                size='25px'
                style="line-height: inherit;"
              />
          </van-col>
          <van-col slot="title" offset="1">
            <p>隐私</p>
          </van-col>
        </van-cell>
      </van-col>
    </van-row>

    <van-row type="flex" justify="center" style="margin-top:2%;">
      <van-col span="24">
        <van-cell size="large" is-link to="index" >
          <van-col slot="icon">
              <van-icon
                color="#FFD000"
                name="point-gift"
                size='25px'
                style="line-height: inherit;"
              />
          </van-col>
          <van-col slot="title" offset="1">
            <p>意见反馈</p>
          </van-col>
        </van-cell>
      </van-col>
    </van-row>

    <!-- <van-row type="flex" justify="center" style="margin-top:2%;">
      <van-col span="24">
        <van-cell size="large" is-link to="index" >
          <van-col slot="icon">
              <van-icon
                name="photo"
                size='25px'
                style="line-height: inherit;"
              />
          </van-col>
          <van-col slot="title" offset="1">
            <p>我的相册</p>
          </van-col>
        </van-cell>
      </van-col>
    </van-row> -->
    

    <van-row type="flex" justify="center" style="margin-top:2%;">
      <van-col span="24">
        <van-cell size="large" >
          <p slot="title" style="text-align: center;">退出登录</p>
        </van-cell>
      </van-col>
    </van-row>

  </div>
</template>

<script>
import {getUser} from "common/auth"
import {settingNicknameRequest} from "network/settingNicknameRequest"
import {settingAvatarRequest} from "network/settingAvatarRequest"
import { Dialog } from 'vant';
import { Toast } from 'vant';
import {updateAvatar} from "common/auth"
import {updateName} from "common/auth"
import {regexp} from "common/regexp"
export default {
    name: 'Setting',
    data () {
      return {
          user:{},
          show: false,
          nameShow: false,
          fileList: [],
          name: '',
      }
    },
    methods: {
        beforeRead(file) {
          if (file.type !== 'image/jpeg' && file.type !== 'image/png' && file.type !== 'image/jpg' && file.type !== 'image/gif') {
            Toast('请上传 jpg 格式图片');
            this.show = false
            return false;
          }
          return true;
        },
        //弹出修改头像
        updateAvatar(){
            //展示出弹出框，进行图片上传
            this.show = true
            
        },
        //上传头像文件
        uploadAvatar(){
            if(this.fileList.length == 0){
              Toast.fail('您没有上传头像~');
            }else{
                //不仅要传图片，还要获取用户的id，后台上传成功后修改用户的头像地址
                settingAvatarRequest(this.fileList[0].content,this.fileList[0].file.name,getUser().id).then(res => {
                    //返回一个头像的上传成功地址
                    if(res.code == 20000){
                      Toast.success('修改成功！');
                      this.user.avatar = res.data
                      //修改原来cookit中的头像信息
                      updateAvatar(res.data)
                    }else{
                      Toast.fail('上传失败，稍后重试~');
                    }
                })
            }
            
        },
        //撤销头像上传
        cancelUpload(){
            this.fileList = []
        },
        //弹出修改昵称
        updateNickname(){
            this.nameShow = true
        },
        //更改名字
        updateName(){

            if(regexp.test(this.name)){
              Toast.fail('昵称包含了非法字符~');
            }else if(this.name == ''){
              Toast.fail('并未输入任何字符~');
            }else{
              //发送请求，修改
              settingNicknameRequest(this.name,this.user.id).then(res => {
                  if(res.code == 20000){
                      this.user.name = res.data
                      updateName(res.data)
                  }
              })
            }
        },
        //撤销更改名字
        cancelUpdateName(){
            this.name = ''
        },
        showContent(){
          if(this.user.name != 'null'){
            return this.username
          }else{
            return '填写昵称'
          }
        }


    },
    comments: {
        [Dialog.Component.name]: Dialog.Component
    },
    // created () {
    //   //获取用户信息
    //   if(getUser().id != undefined){
    //     this.user = getUser()
    //   }else{
    //     //跳转登录页面,
    //     this.$router.push({
    //       name: 'login',
    //       params: {page: 'setting'}
    //     })
    //   }
    // },
    mounted () {
      //控制tabbar的item显示
        this.$emit('currentPage',3)
    },
}
</script>

<style>
  .settong-outer {
    background-color: #F0F0F0;
  }
  .setting-row-1 {
    background-color:#F0F0F0;
  }
  .setting-nickname {
    margin-top: 5%;
    font-size: 110%;
  }
  .setting-phone {
    color: #8B8888;
    margin-top: 3%;
  }

  
</style>