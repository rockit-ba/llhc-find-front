<template>
  <div >
        <!-- 当到了设置页面的时候不显示顶部栏 -->
        <van-sticky v-if="isShowAvatar == true ">
            <van-row style="background-color:#FFFBE8;">
                <van-col span="3" offset="1" style="text-align: center;margin-top: 0.5%;margin-bottom: 0.5%;">
                    <van-image
                        v-if="user.name !== undefined  && isShowAvatar"
                        fit="cover"
                        round
                        width="40px"
                        height="40px"
                        :src=user.avatar
                    />
                </van-col>
                <van-col span="19" style="margin-top: 0.5%;">
                    <van-notice-bar 
                        :text=content 
                        left-icon="volume-o" 
                    />
                </van-col>
            </van-row>
        </van-sticky>
        
        <!-- 这里是每个模块要展示的东西 -->
        <div  >
            
            <!-- 设置内容的顶部和底部被固定栏位遮挡的部分，这个非常重要 -->
            <div style="margin-bottom:50px;" >
                
                <keep-alive>
                    <router-view v-if="$route.meta.keepAlive"  @currentPage=changPage></router-view>
                </keep-alive>
                <router-view v-if="!$route.meta.keepAlive" @currentPage=changPage></router-view>
                
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
import {isLogin} from "network/isLogin"
import {removeUser} from 'common/auth'
import { Toast } from 'vant';
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
        isLogin().then(res => {
            if(res.flag == true){
                this.user = getUser()
            }else{
                removeUser()
            }
        })

    },
    

}
</script>

<style>
    .van-image {
        float:left; 
    }
    
</style>