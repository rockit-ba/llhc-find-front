<template>
  
<div>
    
    <van-sticky>
      <van-row type="flex" style="background-color: #F0F0F0;">
        <van-col span="2" style="text-align: center;margin-top:3%">
            <van-icon size="25px" name="arrow-left" @click="commentBack" />
        </van-col>
        <van-col span="4" style="text-align: center;margin-top:4%;margin-bottom:4%">
            <p ><strong>评论</strong></p>
        </van-col>
      </van-row>
    </van-sticky>

    
    <van-row type="flex" justify="center" style="margin-bottom:41px;margin-top:1px">
        <van-col span="23" style="background-color:#F0F0F0">
            <van-list
                v-model="loading"
                :finished="finished"
                finished-text="没有更多了"
                @load="onLoad"
            >
                <van-cell v-for="item in list">
                    <van-row  slot="default" >
                        <!-- 头像日期 不需要居中-->
                        <van-row>
                            <van-col>
                            <van-image
                                fit="cover"
                                round
                                width="35px"
                                height="35px"
                                :src=item.avatarurl
                            />
                            </van-col>
                            <van-col offset="1">
                                <!-- 昵称 -->
                                <p style="font-size:13px;height: 15px;color: #656363;">{{item.name}}</p>
                                <p style="font-size:12px;height: 12px;color: #888686;">{{item.publishtime}}</p>
                            </van-col>
                            <van-col offset="9" v-show="item.userid == userid">
                                <!-- 删除自己的评论 -->
                                <van-icon size="16px" name="delete" @click="removeComment(item._id)"></van-icon>
                            </van-col>
                        </van-row>
                        <!-- 描述 不需要居中-->
                        <van-row style="margin-top:3%">
                            <van-col offset="4">
                                <p style="">{{item.comment}}</p>
                            </van-col>
                        </van-row>

                    </van-row>
                </van-cell>
            </van-list>
        </van-col>
        
    </van-row>
   
    <van-row type="flex" class="comment-tabbar" align="center" v-show="userid != undefined && userid != ''">
        <van-col span="19" >
            <van-field
                v-model="commentContent"
                rows="1"
                autosize
                type="textarea"
                placeholder="你就是下一个热评！"
            />
        </van-col>
        <van-col>
            <van-button size="small" type="primary" @click="publishComment">发送</van-button>
        </van-col>
        
    </van-row>
    

</div>
        
</template>

<script>
import {getUser} from "common/auth"
import {commentPublish} from "network/comment/commentPublish"
import {commentList} from "network/comment/commentList"
import { Toast } from 'vant';
import {removeComment} from "network/comment/removeComment"
import { Dialog } from 'vant'
export default {
    name: 'Comment',
    data () {
        return {
            commentContent: '',  //评论内容
            itemId: '',
            page: '',
            active: 0,

            list: [],  //动态列表
            loading: false,  //是否显示加载
            finished: false,  //是否完成所有加载

            currpage: 0,
            size: 10,
            length: 0,

            userid: '',
        }
    },
    methods: {
        //删除评论
        removeComment(_id) {
            Dialog.confirm({
                title: '删除',
                message: '确认删除评论吗？'
            }).then(() => {
                // on confirm
                removeComment(_id).then(res => {
                    if(res.flag == true){
                        Toast.success(res.message);
                        this.$router.push({
                            name: 'black',
                            params: {page: 'comment',backpage:this.page,active:this.active, itemId: this.itemId}
                        })
                    }
                })
            }).catch(() => {
                // on cancel
            });
            
        },
        commentBack(){
            this.$router.push({
                name: this.page,
                params: {active: this.active}
            })
        },
        publishComment(){
            //发布评论后台要做的事情：
            //userid（头像 名称 时间）评论的动态的id 评论内容 对动态的评论字段+1
            commentPublish(getUser().id,getUser().name,getUser().avatar,this.commentContent,this.itemId).then(res => {
                if(res.flag == true){
                    Toast.success(res.message);
                    this.$router.push({
                        name: 'black',
                        params: {page: 'comment',backpage:this.page,active:this.active, itemId: this.itemId}
                    })
                }else{
                    Toast.fail('评论失败稍后重试');
                }
            })
        },
        onLoad() {
            // 异步更新数据
            setTimeout(() => {
                this.currpage = this.currpage+1
                //love界面type固定是0
                commentList(this.currpage,this.size,this.itemId).then(res => {
                    for (let i = 0; i < res.data.content.length; i++) {
                        this.list.push(res.data.content[this.length])
                        this.length = this.length+1
                    }
                    this.length = 0
                    // 加载状态结束
                    this.loading = false;

                    // 数据全部加载完成
                    if (this.list.length >= res.data.totalElements) {

                        this.finished = true;
                    }
                })
                
            }, 500);
        }
    },
    created () {
        if(this.$route.params.itemId != undefined){
            this.itemId = this.$route.params.itemId
        }
        if(this.$route.params.page != undefined){
            this.page = this.$route.params.page
        }
        if(this.$route.params.active != undefined){
            this.active = this.$route.params.active
        }

        this.userid = getUser().id
        
        
    },
    activated () {
        
        this.userid = getUser().id
    },

}
</script>

<style>
    /* height:40px; */
    .comment-tabbar {
        position:fixed;
        width:100%;
        bottom:0px;
        height:px;  
        z-index:2;
        overflow:hidden;
        
    }
</style>



