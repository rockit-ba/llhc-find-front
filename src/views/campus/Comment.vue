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
            <van-row>
                cat
            </van-row>
            <van-row>
                cat
            </van-row>
        </van-col>
        
    </van-row>
    
    
    <van-row type="flex" class="comment-tabbar" align="center" >
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
            <van-button size="small" type="primary">发送</van-button>
        </van-col>
    </van-row>
    

</div>
        
</template>

<script>
export default {
    name: 'Comment',
    data () {
        return {
            commentContent: '',  //评论内容
        }
    },
    methods: {
        commentBack(){
            
        },
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