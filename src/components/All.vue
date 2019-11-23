<template>
  <div >
    <div class="view">
        <div id="top" class="header" >
            <van-image
                v-if="user.name !== undefined  && isShowAvatar"
                style="margin-left: 12px;margin-top: 3px;"
                fit="cover"
                round
                width="50px"
                height="50px"
                :src=user.avatar
            />
            <div style="float:right;margin-top:5%;margin-right: 6%;"  v-if="user.name===undefined">
                <router-link to="/login">登陆</router-link>
            </div>
            <van-notice-bar style="margin-left: 15%;margin-top:3px;height: 50px;" 
                :text=content 
                left-icon="volume-o" 
            />
        </div>
    
        <!-- 这里是每个模块要展示的东西 -->
        <div class="content" >
            <!-- 设置内容的顶部和底部被固定栏位遮挡的部分，这个非常重要 -->
            <div style="margin-top:55px;margin-bottom:50px;" >
                <keep-alive>
                    <router-view  @currentPage=changPage></router-view>
                </keep-alive>
                <!-- <router-view v-if="!$route.meta.keepAlive"></router-view> -->
            </div>
        </div>
    
    </div>

    <!-- 底部组件 -->
    <van-tabbar v-model="active" :safe-area-inset-bottom=adapt>
        <van-tabbar-item icon="wap-home" @click="main">主页</van-tabbar-item>
        <van-tabbar-item icon="fire" @click="release">校园</van-tabbar-item>
        <van-tabbar-item icon="friends" :dot=flag @click="own">我的</van-tabbar-item>
        <van-tabbar-item icon="setting" @click="setting">设置</van-tabbar-item>
    </van-tabbar> 
  </div>
</template>

<script>
import {getUser} from 'common/auth'

export default {
    name: 'All',
    data () {
        return {
            indexList: [],
            content: '冬天到了，大家要多加衣服，防寒注意保暖哦~~~~',
            user: {},

            adapt: true,
            flag: false,  //是否显示小红点
            active: 0,  //默认首页激活状态

            isShowAvatar: true,            
        }
    },
    components:{
        
    },
    methods: {
        changPage(page){
            this.active = page
            //确保设置页面不会出现头像
            if(page == 3){
                this.isShowAvatar = false
            }
            
        },

        main() {
            this.$router.push("main")
            this.isShowAvatar = true
            //确保用户修改了头像之后切换其它页面获取最新的头像
            this.user = getUser()
        },
        release() {
            this.$router.push("campus")
            this.isShowAvatar = true
            this.user = getUser()
            
        },
        own() {
            this.$router.push("own")
            this.isShowAvatar = true
            this.user = getUser()
           
        },
        setting() {
            this.$router.push("setting")
            this.isShowAvatar = false
        },
       
    },
    created () {
        this.user= getUser()
    }
    

}
</script>

<style>
    #top {
        background-color:#FFFBE8;
        height: 55px;
        box-shadow: 0 1px 1px rgba(150,150,150,.6);

    }
    .van-image {
        float:left; 
    }
    .view {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        z-index: 1;
        overflow: hidden;
        width: 100%;
        height: 100%;
        margin: 0 auto;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
    }
    .header {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        z-index: 1000;
        width: 100%;
    }
    .content {
        height: 100%; overflow-y: scroll;
        position: absolute;
        width: 100%;
        
    }
</style>