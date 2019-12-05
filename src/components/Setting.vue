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
            :src="user.avatar"
            
          />
      </van-col>
      <van-col span="15" offset="1">
        <van-row class="setting-nickname" @click="updateNickname">
            <p v-show="user.name != 'null'"><strong>{{user.name}}</strong></p>
            <p v-show="user.name == 'null'" style="color: #9A9090;">点击修改昵称</p>
        </van-row>
        <van-row class="setting-phone">
          <!--{{user.phone}}  -->
            登录名:{{user.phone}}
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
              :after-read="afterRead"
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
    
    <!-- 资料 -->
    <!-- <van-row type="flex" justify="center" style="margin-top:2%;">
      <van-col span="24">
        <van-cell size="large" is-link to="/container/info" >
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
    </van-row> -->
    
    <!-- 相册 -->
    <van-row type="flex" justify="center" style="margin-top:2%;">
      <van-col span="24">
        <van-cell size="large" is-link to="/container/photos" >
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
    <!-- 隐私 -->
    <van-row type="flex" justify="center" style="margin-top:2%;">
      <van-col span="24">
        <van-cell size="large" is-link to="/container/privacy" >
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
    <!-- 意见反馈 -->
    <van-row type="flex" justify="center" style="margin-top:2%;">
      <van-col span="24">
        <van-cell size="large" is-link to="/container/feedBack" >
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

    <!-- 模板 -->
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
    <!-- 切换账号 -->
    <van-row type="flex" justify="center" style="margin-top:2%;">
      <van-col span="24">
        <van-cell size="large" >
          <p slot="title" style="text-align: center;" @click="switchAccount">切换账号</p>
        </van-cell>
      </van-col>
    </van-row>
    <!-- 退出 -->
    <van-row type="flex" justify="center" style="margin-top:2%;">
      <van-col span="24">
        <van-cell size="large" >
          <p slot="title" style="text-align: center;" @click="loginOut">退出</p>
        </van-cell>
      </van-col>
    </van-row>

  </div>
</template>

<script>
import {compressImg} from "common/compressImg"
import {getUser} from "common/auth"
import {removeUser} from "common/auth"
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
          return true
        },
        afterRead(file) {
            // 大于1MB的jpeg和png图片都缩小像素上传
          if(file.file.size>1000000) {
              // 创建Canvas对象(画布)
              let canvas =  document.createElement('canvas')  
              // 获取对应的CanvasRenderingContext2D对象(画笔)
              let context = canvas.getContext('2d') 
              // 创建新的图片对象 
              let img = new Image()
              // 指定图片的DataURL(图片的base64编码数据)
              img.src = file.content
              //画布宽度
              let width = 512   
              // 监听浏览器加载图片完成，然后进行绘制
              img.onload = () => {
                  //画布大小按照图片的比例生成
                  let height = width / (img.naturalWidth / img.naturalHeight)
                  // 指定canvas画布大小，该大小为最后生成图片的大小
                  canvas.width = width
                  canvas.height = height
                  /* drawImage画布绘制的方法。(0,0)表示以Canvas画布左上角为起点， canvas.width, canvas.height 是将图片按给定的像素进行缩小。*/
                  /* 如果不指定缩小的像素，图片将以图片原始大小进行绘制，图片像素如果大于画布将会从左上角开始按画布大小部分绘制图片，最后得到的图片就是张局部图。图片小于画布就会有黑边。*/ 
                  context.drawImage(img, 0, 0, canvas.width, canvas.height)
                  // 将绘制完成的图片重新转化为base64编码，file.file.type为图片类型，0.92为默认压缩质量
                  //返回压缩后的文件
                  this.fileList[0].content =  canvas.toDataURL(file.type, 0.92)
              }                        
          }
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
                Toast.loading({
                  message: '上传中...',
                  forbidClick: true
                });
                //不仅要传图片，还要获取用户的id，后台上传成功后修改用户的头像地址
                settingAvatarRequest(this.fileList[0].content,this.fileList[0].file.name,getUser().id).then(res => {
                    //返回一个头像的上传成功地址
                    if(res.code == 20000){
                      Toast.clear();
                      Toast.success('修改成功！');
                      this.user.avatar = res.data
                      this.fileList = []
                      //修改原来cookit中的头像信息
                      updateAvatar(res.data)
                    }else{
                      Toast.clear();
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
              Toast.loading({
                  message: '修改中...',
                  forbidClick: true
              });
              settingNicknameRequest(this.name,this.user.id).then(res => {
                  if(res.code == 20000){
                      this.user.name = res.data
                      updateName(res.data)
                      Toast.clear();
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
            return this.user.name
          }else{
            return '填写昵称'
          }
        },
        // 切换账号
        switchAccount() {
            const _router = this.$router
            Dialog.confirm({
              title: '切换账号',
              message: '确认要退出当前账号，切换其它账号吗？'
            }).then(() => {
              // on confirm
              removeUser()
              _router.push('/login')
            }).catch(() => {
              // on cancel
            });
        },
        // 退出登录
        loginOut() {
            const _router = this.$router
            Dialog.confirm({
              title: '退出登录',
              message: '确认要退出登录吗？'
            }).then(() => {
              // on confirm
              removeUser()
              _router.push('main')
            }).catch(() => {
              // on cancel
            });
        } ,       



    },
    comments: {
        [Dialog.Component.name]: Dialog.Component
    },
    created () {
      //获取用户信息
      if(getUser().id != undefined){
        this.user = getUser()
      }else{
        //跳转登录页面,
        this.$router.push({
          name: 'login',
          params: {page: 'setting'}
        })
      }
    },
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