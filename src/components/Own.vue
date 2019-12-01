<template>
  <div style="background-color:#F0F0F0">
    <!-- 下拉刷新 -->
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh" >

    <!-- 我的认领 -->
    <van-row  type="flex" justify="center" style="margin-top:2%">
      <van-col span="24" >
        <van-sticky>
        <van-collapse v-model="activeProps" @change="changeProp">
          <van-collapse-item
            name="1"
            size="large"
          >
            <van-icon
                slot="icon"
                color="#0099FF"
                name="gift"
                size='25px'
                style="line-height: inherit;"
              />
            <p style="margin-left: 5%;" slot="title">我的认领</p>
          </van-collapse-item>
        </van-collapse>
        </van-sticky>
        <!-- 认领物品列表 -->
        <van-card
            v-show="propShow"
            v-for="item in propList"
            :title=item.description
          >
            <van-image slot="thumb" 
            width="90"
            height="90"
            fit="contain"
            :src="item.picUrl" 
            @click="showImg(item.picUrl);show = true;"
            />
            <div slot="footer">
              <van-button v-show="item.id !== undefined "  size="mini" type="danger" @click="ownCancel(item.id)">取消认领</van-button>
            </div>
        </van-card>

      </van-col>
    </van-row>

    <!-- 我的动态 -->
    <van-row type="flex" justify="center" style="margin-top:2%">
      <van-col span="24">
        <van-sticky>
          <!-- v-model="activeNames" -->
          <van-collapse v-model="activeActivitis" @change="changeActivity">
            <van-collapse-item
              name="1"
              size="large"
            >
            <van-icon
                slot="icon"
                color="#FFE407"
                name="star"
                size='25px'
                style="line-height: inherit;"
              />
            <p style="margin-left: 5%;" slot="title">我的动态</p>
            </van-collapse-item>
          </van-collapse>
        </van-sticky>
        <van-cell v-show="activityShow" v-for="item in activityList">
              <van-row  slot="default" >
                  <!-- 头像日期 不需要居中-->
                  <van-row align="center">
                      <van-col>
                        <van-image
                        fit="cover"
                        round
                        width="40px"
                        height="40px"
                        :src=user.avatar
                        />
                      </van-col>
                      <van-col offset="1">
                        <!-- 昵称 -->
                        <p style="margin-top:10%">{{user.name}}</p>
                      </van-col>
                      <!-- 删除动态 -->
                      <van-col offset="10" style="margin-top:3%">
                        <van-icon @click="activityDele(item.id)"  name="delete" size="150%"></van-icon>
                      </van-col>
                  </van-row>
                  <!-- 描述 不需要居中-->
                  <van-row style="margin-top:3%">
                      <van-col>
                      <p style="">{{item.description}}</p>
                      </van-col>
                  </van-row>
                  <!-- 图片 需要居中width="19rem"
                      height="19rem"-->
                  <van-row type="flex" justify="center">
                      <van-col>
                      <van-image
                      @click="show=true;showImg(item.picUrl)"
                      width="300px"
                      height="300px"
                      fit="contain"
                      :src=item.picUrl
                      />
                      </van-col>
                  </van-row>
                  <!-- 点赞与评论 -->
                  <van-row type="flex" align="center" style="margin-top:2%">
                      <van-col span="10">
                      <p>{{item.createTime}}</p>
                      </van-col>
                      <van-col span="4" offset="10">
                      <van-icon 
                      name="comment" 
                      size="150%"
                      @click="showComment=true;comment()"
                      />
                      </van-col>
                  </van-row>
                  <!-- 评论 -->

              </van-row>
          </van-cell>
      </van-col>
    </van-row>

    <!-- 预览图片 -->
    <van-image-preview
      v-model="show"
      :images="images"
    />
    </van-pull-refresh>
    
  </div>
</template>

<script>
import { Dialog } from 'vant';
import { Toast } from 'vant';
import {ownPropertyListRequest} from "network/ownPropertyListRequest"
import {getUser} from 'common/auth'
import {ownCancelRequest} from "network/ownCancelRequest"
import {activityRequest} from "network/own/activityRequest"
import {activityDeleRequest} from "network/own/activityDeleRequest"


export default {
    name: 'Own',
    data () {
      return {
        images: [],  //预览图片列表
        show: false, //是否显示预览图片
        isLoading: false,
        activeProps: [],  //暂时没有用到这个属性
        activeActivitis: [],  //暂时没有用到这个属性
        propList: [
          {
            id:'',
            description: '',
            picUrl: ''
          },
        ],
        activityList: [],

        showComment:false,  //展示评论
        color: '',  //点赞颜色

        propShow: false,
        activityShow: false,
        user:{},
      };
    },
    methods: {
        //删除动态
        activityDele(id) {

          Dialog.confirm({
            title: '删除',
            message: '您确认要删除此条动态吗？'
          }).then(() => {
              activityDeleRequest(id).then(res => {
                this.showActivity()
                Toast.success('删除成功');
              })
          }).catch(() => {
            // on cancel
          });
          
        },
        //展出自己的失物招领
        changeProp(){
          this.propShow = !this.propShow
        },
        //展出自己的动态
        changeActivity() {
          //证明当前是关闭的，要打开
          if(this.activityShow == false){
            this.showActivity()
            this.activityShow = !this.activityShow
          }else{
            this.activityShow = !this.activityShow
          }
        },
        //请求动态列表
        showActivity() {
          activityRequest(getUser().id).then(res => {
            if(res.flag == true){
              this.activityList = res.data
            }else{
              Dialog.fail(res.message)
            }
          })
        },
        //点击评论
        comment() {
          //弹出评论列表
          this.$router.push('/comment')

        },
        //预览图片
        showImg(img){
          this.images = [img]
        },
        onRefresh() {
          setTimeout(() => {
            this.showActivity()
            this.$toast('刷新成功');
            this.isLoading = false;  
          },error => {
            this.$toast('刷新失败');
            this.isLoading = false;
          },500)
        },
        ownCancel(id){

          Dialog.confirm({
            title: '提示',
            message: '您确定要取消认领申请？'
          }).then(() => {
            ownCancelRequest(id).then(res => {
              if(res.code == 20000){
                  this.refresh()
              }
            })
          }).catch(() => {
            // on cancel
          });
        },
        //刷新
        refresh(){
            //请求该用户的已经发起认领的物品列表
            const _router = this.$router
            ownPropertyListRequest(getUser().id,_router).then(res => {
              if(res.code == 20004){
                _router.push({
                      name: 'login',
                      params: {page: 'own'}
                  })
              }else if(res.code == 20000){
                this.propList = res.data
              }else{
                this.propList = [{description: '您还没有添加认领记录或者已被管理员撤回申请~', picUrl: 'http://172.16.11.135/flag/flag.png'}]
              }
              
            })
        }
    },

    created () {
      this.refresh()
      if(getUser().id != undefined){
        this.user = getUser()
      }
    },

    //用于控制tabbar的item显示
    mounted () {
        this.$emit('currentPage',2)
    },
}
</script>

<style>

</style>