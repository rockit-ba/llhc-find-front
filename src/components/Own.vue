<template>
  <div>
    <!-- 下拉刷新 -->
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh" >

    <van-row  type="flex" justify="center">
      <van-col span="24" class="own-1" >
        <van-sticky>
        <van-collapse v-model="activeNames">
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
            <van-card
              v-for="item in ownList"
              :title=item.description
            >
              <van-image slot="thumb" :src="item.picUrl" @click="showImg(item.picUrl);show = true;"/>
              <div slot="footer">
                <van-button v-show="item.id !== undefined "  size="mini" type="danger" @click="ownCancel(item.id)">取消认领</van-button>
              </div>
            </van-card>
          </van-collapse-item>
        </van-collapse>
        </van-sticky>

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
import {ownPropertyListRequest} from "network/ownPropertyListRequest"
import {getUser} from 'common/auth'
import { Dialog } from 'vant';
import {ownCancelRequest} from "network/ownCancelRequest"
export default {
    name: 'Own',
    data () {
      return {
        images: [],  //预览图片列表
        show: false, //是否显示预览图片
        isLoading: false,
        activeNames: [],
        ownList: [
          {
            id:'',
            description: '',
            picUrl: ''
          },
          
        ],

      };
    },
    methods: {
        //预览图片
        showImg(img){
          this.images = [img]
        },
        onRefresh() {
          setTimeout(() => {
            this.refresh()
            this.$toast('刷新成功');
            this.isLoading = false;
            
          }, 500);
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
                this.ownList = res.data
              }else{
                this.ownList = [{description: '您还没有添加认领记录或者已被管理员撤回申请~', picUrl: 'http://172.16.11.135/flag/flag.png'}]
              }
              
            })
        }
    },

    created () {
      this.refresh()
    },

    //用于控制tabbar的item显示
    mounted () {
        this.$emit('currentPage',2)
    },
}
</script>

<style>

</style>