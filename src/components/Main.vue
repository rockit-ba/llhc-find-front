<template>
  <div id="outer">
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh" >
      <div id="inner">   
        <div>
            <!-- 数据列表 -->
              <van-list
                v-model="loading"
                :finished="finished"
                finished-text="没有更多了"
                :error.sync="error"
                error-text="请求失败，点击重新加载"
                @load="onLoad"
                van-clearfix
              >
                <!-- 每一列的数据 -->
                  <van-cell v-for="item in list" van-clearfix>
                      <slot name="default" >
                          <p class="desc">{{item.description}}</p>
                          <van-image 
                              fit="contain"
                              :src=item.picUrl
                          />
                          <div class="bottom">
                              <p class="date">{{item.createTime}}</p>
                              <van-button class="findButtom" round type="info" size="small">认领</van-button>
                          </div>
                      </slot>
                  </van-cell>

              </van-list>
        </div>
      </div>
    </van-pull-refresh>
  </div>
</template>

<script>
import {mainListRequest} from "network/mainListRequest"
export default {
    name: 'Main',
    data () {
      return {
        isLoading: false,
        list: [],
        loading: false,
        error: false,
        finished: false,
      }
    },
    components: {
      
    },
    methods:{
      //下拉刷新的方法，与向下滑动所作的事情基本一样
      onRefresh() {
        setTimeout(() => {
          //先清空
          this.list = []
          mainListRequest().then(res => {
            for (let i = 0; i < res.data.length; i++) {
              if(this.list[i] == null || this.list[i] == undefined || this.list[i] == ''){
                  this.list.push(res.data[i]);
              }
              //作用是过滤重复的元素，判断返回的元素中是否包含list中的id，没有才添加
              if(!res.data.filter(r => r.hasOwnProperty(this.list[i].id))){
                this.list.push(res.data[i]);
              }
                
            }
            if (this.list.length >= res.data.length){
                this.$toast('刷新成功');
                this.isLoading = false;
                const notify = this.$notify
                notify.setDefaultOptions({type:"success"})
                notify('亲，共计'+this.list.length+'条记录~');
            }
          },error =>{
              this.$toast('刷新失败');
              this.isLoading = false;
          })
          
        }, 500);
      },
      //滑动加载数据的方法
      onLoad() {
            // 异步更新数据
            setTimeout(() => {
                mainListRequest().then(res => {
                    for (let i = 0; i < res.data.length; i++) {
                        this.list.push(res.data[i]);
                    }
                    // 加载状态结束
                    this.loading = false;
                    // 数据全部加载完成
                    if (this.list.length >= res.data.length) {
                        this.finished = true;
                        const notify = this.$notify
                        notify.setDefaultOptions({type:"success"})
                        notify('共计'+this.list.length+'条记录！');
                    }
                },error =>{
                    this.error = true;
                })
                
            }, 500);
        }
    },
    
    
}
</script>

<style>
  #outer {
    background-color: #F0F0F0;
  }
  #inner {
    background-color: aquamarine;
    margin-left: 15px;
    margin-right: 15px;
  }
  .desc {
        border-radius: 13px 13px 0px 0px;
        text-align: center;
        background-color: antiquewhite;
   }
   .img {
       border-radius: 0px 0px 15px 15px;
   }
   .date {
       margin-top: 8px;
       color: #848484;
       float: left;
   }
   .bottom {
       height: 40px;
       margin-bottom: 20px;
   }
   .findButtom {
       margin-top: 5px;
       float: right;
   }
   
</style>