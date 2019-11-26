<template>
  <div id="outer" >
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh" >
      <div id="inner">   
        <div >
            <!-- 数据列表 -->
              <van-list
                style="background-color: #F8F8F8;"
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
                              @click="showImg(item.picUrl);show = true;"
                          />
                          </van-image> 
                          <div class="bottom">
                              <p class="date">{{item.createTime}}</p>
                              <van-button  class="findButtom" @click="claim(item.id)" round :type="claimStyle(item.upcoming)" size="small">认领</van-button>
                          </div>
                      </slot>
                  </van-cell>

              </van-list>
              <!-- 预览图片 -->
              <van-image-preview
                v-model="show"
                :images="images"
              />
        </div>
      </div>
    </van-pull-refresh>
  </div>
</template>

<script>
import {mainListRequest} from "network/mainListRequest"
import {mainClaimRequest} from "network/mainClaimRequest"
import {loginRequest} from "network/loginRequest"
import {getUser} from 'common/auth'
import { Dialog } from 'vant';
export default {
    name: 'Main',
    data () {
      return {
        images: [],  //预览图片列表
        show: false, //是否显示预览图片
        isLogin: '',
        isLoading: false,
        list: [],
        loading: false,
        error: false,
        finished: false,
        currentPage: 0,
        rows: 10,
        total: 0,
        length: 0,  //控制加载的条数的
      }
    },
    components: {
      
    },
    mounted () {
      //控制tabbar的item显示
        this.$emit('currentPage',0)
    },
    methods:{
      //预览图片
      showImg(img){
        this.images = [img]
      },
      //用户认领的方法,用户点击的时候传入对应点击的物品的id和用户id
      claim(propId){  //这里的是物品的id
          const _router = this.$router
          //如果物品的upcoming=0，则提示用户已经被他人提交认领
          //getUser().id查询用户的id
          Dialog.confirm({
            title: '提示',
            message: '您确定要提交认领申请吗？这需要登录权限哦'
          }).then(() => {
            // on confirm
              mainClaimRequest(propId,getUser().id,_router).then(res => {
                  if(res.code == 20007){
                    const notify = this.$notify
                    notify.setDefaultOptions({type:"warning"})
                    notify('亲，该物品已被他人提交认领，请前往餐厅确认~');
                  }else if(res.code == 20000){
                      //此时被点击认领的物品的属性已经被修改
                      this.onRefresh()
                  }else if(res.code == 20004){
                      //未登录，跳转登录页面
                      _router.push({
                        name: 'login',
                        params: {page: 'main'}
                      })
                  }
              })
          }).catch(() => {
            // on cancel
          });
          
        
      },
      claimStyle(upcoming){
        if(upcoming == 0){  //表示已经被人提交认领，并且还未被管理员处理
          return 'warning'
        }else{
          return 'info'
        }
      },
      //下拉刷新方法
      onRefresh() {
          const _router = this.$router
          setTimeout(() => {
            //跳转到空白页面，然后立马跳回来
            _router.replace("/all/black")
            this.$toast('刷新成功');
            this.isLoading = false;  
          },error => {
            this.$toast('刷新失败');
            this.isLoading = false;
          },500)
      },
      //滑动加载数据的方法
      onLoad() {
            // 异步更新数据
            setTimeout(() => {
                this.currentPage = this.currentPage+1
                mainListRequest(this.currentPage,this.rows).then(res => {
                  //每次加载10条,但如果是最后的几条可能不够十条，因此具体要根据返回的records判断
                    for (let i = 0; i < res.data.records.length; i++) {
    
                        this.list.push(res.data.records[this.length])
                        this.length = this.length+1
                    } 
                    this.length = 0
                    // 加载状态结束
                    this.loading = false;
                    // 数据全部加载完成
                    if (this.list.length >= res.data.total) {
                        this.finished = true;
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