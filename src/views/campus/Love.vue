<template>
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
        <!-- 内容 -->
        <van-row type="flex" justify="center" slot="default" style="margin-top: 2%;">
        <van-col span="24" >
            <van-list
                v-model="loading"
                :finished="finished"
                finished-text="没有更多了"
                @load="onLoad"
            >
                <van-cell v-for="item in list" >
                    <van-row  slot="default" >
                        <!-- 头像日期 不需要居中-->
                        <van-row>
                            <van-col>
                            <van-image
                                fit="cover"
                                round
                                width="40px"
                                height="40px"
                                :src=item.avatarUrl
                            />
                            </van-col>
                            <van-col offset="1">
                                <!-- 昵称 -->
                                <p style="margin-top:10%">{{item.name}}</p>
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
                                    width="100%"
                                    height="220px"
                                    fit="contain"
                                    :src=item.picUrl
                                />
                            </van-col>
                        </van-row>
                        <!-- 点赞与评论 -->
                        <van-row type="flex" align="center" style="margin-top:4%">
                            <van-col span="10">
                                <p style="color: #616161">{{item.createTime}}</p>
                            </van-col>
                            <van-col span="5" offset="5">
                                <van-icon 
                                    name="good-job-o" 
                                    size="150%"
                                    :color=color
                                    @click="color='#EE0A24'"
                                />
                            </van-col>
                            <van-col span="4">
                                <van-icon 
                                    name="comment-o" 
                                    size="150%"
                                    :info="item.commentNum"
                                    @click="showComment=true;comment(item.id)"
                                />
                            </van-col>
                        </van-row>
                        <!-- 评论 -->

                    </van-row>
                </van-cell>
            </van-list>
        </van-col>
        </van-row>
    </van-tab>
    
</template>

<script>
import {listRequest} from "network/campus/listRequest"
export default {
    name: 'Love',
    data () {
        return {
            
            showComment:false,  //展示评论
            color: '',  //点赞颜色

            list: [],  //动态列表
            loading: false,  //是否显示加载
            finished: false,  //是否完成所有加载

            page: 0,
            size: 3,
            length: 0,

        }
    },
    props: ['newActivity'],
    watch: {
        newActivity: {
            handler(newValue, oldValue) {
                this.finished = false
                this.list = []
                this.page = 1
                listRequest(this.page,this.size,0).then(res => {
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
                })
            }
        }
    },
    methods: {
        //预览图片
        showImg(img){
            this.$emit('previewImg',img)
            
        },
        //点击评论
       comment(id) {
           this.$emit('comment')
         //弹出评论列表
          this.$router.push({
              name: 'comment',
              params: {itemId: id,page: 'campus',active:0}
          })

       },
       onLoad() {
            // 异步更新数据
            setTimeout(() => {
                this.page = this.page+1
                //love界面type固定是0
                listRequest(this.page,this.size,0).then(res => {
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
                })
                
            }, 500);
        }
    },
    created () {
        
    },
    

}
</script>

<style>

</style>