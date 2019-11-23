<template>
  <div class="own-outer">
    <!-- 下拉刷新 -->
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh" >

    <van-row  type="flex" justify="center">
      <van-col span="23" class="own-1" >
        
        <van-collapse v-model="activeNames">
          <van-collapse-item
            title="我的认领"
            name="1"
            icon="bag"
          >
            <van-card
              centered
              v-for="item in ownList"
              :title=item.description
              :thumb=item.picUrl
            >
            
              <div slot="footer">
                <van-button v-show="item.id !== undefined "   size="mini" type="danger" @click="ownCancel(item.id)">取消认领</van-button>
              </div>
            </van-card>
          </van-collapse-item>
        </van-collapse>

      </van-col>
    </van-row>

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
                this.ownList = [{description: '您还没有添加认领记录或者已被管理员撤回申请~', picUrl: 'http://image.llhc.com/images/flag/flag.png'}]
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
  .own-outer {
    background-color: #F0F0F0;
  }

</style>