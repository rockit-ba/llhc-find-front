<template>
  <div>
    <!-- 下拉刷新 -->
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh" >
      <swipe></swipe>
    </van-pull-refresh>
    <van-row type="flex" justify="center" style="background-color: #f0f0f0">
      <van-col span="24">

        <van-tabs sticky type="line" style="margin-top:1%;" title-active-color="#EE0A24">
          
          <!-- 日常告白 每个都分成一个单独的views然后调用，不然一个视图里面的参数和方法太多了。-->
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
            <van-row type="flex" justify="center" slot="default">
              <van-col span="6">

                <van-row>
                  <van-row>hahf</van-row>
                  <van-row>----</van-row>
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
            <p slot="default">haha</p>
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
            <p slot="default"></p>
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
            <p slot="default"></p>
          </van-tab>
<!--   -->
          

        </van-tabs>
      </van-col>
    </van-row>
    
  </div>
</template>

<script>
import Swipe from "views/campus/Swipe"
export default {
    name: 'Campus',
    data () {
      return {
        isLoading: false
      }
    },
    methods: {
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