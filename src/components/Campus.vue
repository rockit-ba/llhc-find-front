<template>
  <div>
    <!-- 下拉刷新 -->
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh" >
      <!-- 轮播图 -->
      <swipe></swipe>
      <!-- 导航栏 -->
      <van-row type="flex" justify="center" style="background-color: #f0f0f0">
        <van-col span="24">

          <van-tabs 
            sticky type="line" 
            style="margin-top:1%;" 
            title-active-color="#EE0A24"
            animated
            v-model="active"
            @click="onClick"
            >
            
            <!-- 日常告白 -->
            <van-tab>
              <div slot="title" >
                <van-row type="flex" justify="center">
                  <van-col span="3" style="margin-top:3%">
                    <van-icon name="like" size="15px" color="#EE0A24"/>
                  </van-col>
                  <van-col span="20">
                    <p style="text-align: center;">日常告白</p>
                  </van-col>
                </van-row> 
              </div>
              <van-row type="flex" justify="center" slot="default" style="margin-top: 2%;">
                <van-col span="20" >

                  <van-row   >
                    <!-- 头像日期 不需要居中-->
                    <van-row>
                      <van-col>
                        <van-image
                        fit="cover"
                        round
                        width="40px"
                        height="40px"
                        src="https://img.yzcdn.cn/vant/cat.jpeg"
                      />
                      </van-col>
                      <van-col offset="1">
                        <p style="margin-top:10%">2019-12-10</p>
                      </van-col>
                    </van-row>
                    <!-- 描述 不需要居中-->
                    <van-row style="margin-top:3%">
                      <van-col>
                        <p style="">小猫丢失</p>
                      </van-col>
                    </van-row>
                    <!-- 图片 需要居中-->
                    <van-row type="flex" justify="center">
                      <van-col>
                        <van-image
                        @click="show=true"
                        width="19rem"
                        height="19rem"
                        fit="contain"
                        src="https://img.yzcdn.cn/vant/cat.jpeg"
                      />
                      </van-col>
                    </van-row>
                    <!-- 点赞与评论 -->
                    <van-row type="flex" justify="end">
                      <van-col span="5">
                        <van-icon 
                        name="good-job" 
                        size="150%"
                        :color=color
                        @click="color='#EE0A24'"
                        />
                      </van-col>
                      <van-col span="4">
                        <van-icon 
                        name="comment" 
                        size="150%"
                        @click="showComment=true;comment()"
                        />
                      </van-col>
                    </van-row>
                    <!-- 评论 -->
                    

                  </van-row>
                
                  
                  
                </van-col>
              </van-row>
            </van-tab>  
            <!-- 物品交流 -->
            <van-tab>
              <div slot="title" >
                <van-row type="flex" justify="center">
                  <van-col span="3" style="margin-top:3%">
                    <van-icon name="send-gift" size="15px" color="#147BF2"/>
                  </van-col>
                  <van-col span="20">
                    <p style="text-align: center;">物品交流</p>
                  </van-col>
                </van-row> 
              </div>
              <van-row type="flex" justify="center" slot="default">
                <van-col span="6">

                  <van-row>
                    <van-row>物品</van-row>
                    <van-row>----</van-row>
                  </van-row>
                  
                </van-col>
              </van-row>
            </van-tab>
            <!-- 问题求助 -->
            <van-tab>
              <div slot="title" >
                <van-row type="flex" justify="center">
                  <van-col span="3" style="margin-top:3%">
                    <van-icon name="volume" size="15px" color="#F27714"/>
                  </van-col>
                  <van-col span="20">
                    <p style="text-align: center;">问题求助</p>
                  </van-col>
                </van-row> 
              </div>
              <van-row type="flex" justify="center" slot="default">
                <van-col span="6">

                  <van-row>
                    <van-row>问题</van-row>
                    <van-row>----</van-row>
                  </van-row>
                  
                </van-col>
              </van-row>
            </van-tab>
            <!-- 考研话题 -->
            <van-tab>
              <div slot="title" >
                <van-row type="flex" justify="center">
                  <van-col span="3" style="margin-top:3%">
                    <van-icon name="label" size="15px" color="#AB08EB"/>
                  </van-col>
                  <van-col span="20">
                    <p style="text-align: center;">考研话题</p>
                  </van-col>
                </van-row> 
              </div>
              <van-row type="flex" justify="center" slot="default">
                <van-col span="6">

                  <van-row>
                    <van-row>考研</van-row>
                    <van-row>----</van-row>
                  </van-row>
                  
                </van-col>
              </van-row>
            </van-tab>

          </van-tabs>
        </van-col>
      </van-row>
    </van-pull-refresh>
    <!-- 预览图片 -->
    <van-image-preview
      v-model="show"
      :images="images"
    />
    
  </div>
</template>

<script>
import Swipe from "views/campus/Swipe"
export default {
    name: 'Campus',
    data () {
      return {
        isLoading: false,  //下拉刷新标志
        active: 0,
        show: false, //预览图片
        images: [],  //预览的图片列表
        color: '',
        
      }
    },
    methods: {
      // 点击导航栏的事件
       onClick(index,title) {
         this.active = index
       },
       //点击评论
       comment() {
         //弹出评论列表
          this.$router.push('/comment')

       },
       onRefresh() {
        setTimeout(() => {
          
          this.$toast('刷新成功');
          this.isLoading = false;
        }, 500);
      }
    },
    components: {
      Swipe,
    },
    created () {
      
    },
    mounted () {
      //控制tabbar的item显示
        this.$emit('currentPage',1)
    },
}
</script>

<style>

</style>