<template>
  <div>
    <div class="view">
        <div id="top" class="header" >
            <van-image
                style="margin-left: 12px;margin-top: 3px;"
                fit="cover"
                round
                width="50px"
                height="50px"
                src="https://img.yzcdn.cn/vant/cat.jpeg"
            />
            <van-notice-bar style="margin-left: 35px;margin-top:3px;height: 50px;" 
                :text=content 
                left-icon="volume-o" 
                />
        </div>
    
        <!-- 这里是每个模块要展示的东西 -->
        <div class="content">
            <!-- 设置内容的顶部和底部被固定栏位遮挡的部分，这个非常重要 -->
            <div style="margin-top:55px;margin-bottom:50px;">
                <router-view></router-view>
            </div>
        </div>
    
    </div>

    <!-- 底部组件 -->
    <tab-bar>
    </tab-bar> 
  </div>
</template>

<script>
import TabBar from "components/TabBar"
export default {
    name: 'All',
    data () {
        return {
            indexList: [],
            content: '冬天到了，大家注意保暖哦~~'
        }
    },
    components:{
        TabBar,
    },
    methods: {
       
    },
    created () {
        
    },

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