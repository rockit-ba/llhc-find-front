<template>
  <div>
    <!-- 下拉刷新 -->
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh" style="background-color: #F0F0F0;">
      <!-- 轮播图 -->
      <swipe></swipe>
      <!-- 导航栏 -->
      <van-row type="flex" justify="center" style="background-color: #f0f0f0">
        <van-col span="24">

          <van-tabs 
            sticky 
            type="line" 
            style="margin-top:1%;" 
            title-active-color="#EE0A24"
            v-model="active"
            @click="onClick"
            >
            <keep-alive>
            <!-- 日常告白 -->
              <love @comment="commentpage" :newActivity="newActivity"  @previewImg=showPreviewImg></love>  
            </keep-alive>
            <!-- 物品交流 -->
            <things @previewImg=showPreviewImg></things>
            
            <!-- 问题求助 -->
            <problom @previewImg=showPreviewImg></problom>
            <!-- 考研话题 -->
            <postgraduate @previewImg=showPreviewImg></postgraduate>

          </van-tabs>
        </van-col>
      </van-row>
    </van-pull-refresh>

    <!-- 弹出添加动态 -->
    <van-icon @click="show=true" class="addActivity" size="40px" name="add" color="#EBDDC9" />
    <van-popup
      v-model="show"
      closeable
      close-icon="close"
      position="bottom"
      round
      :style="{ height: '90%' }"
    >
      
      <!-- 标题 -->
      <van-row type="flex" justify="center" align="center" style="margin-top:3%;">
        <van-col span="20">
          <p style="text-align: center"><strong>我的动态我做主</strong></p>
        </van-col>
      </van-row>
      <!-- 类型选择 -->
      <van-row type="flex" justify="center" style="margin-top:5%;" align="center">
        <van-col span="20">
          <van-dropdown-menu active-color="#ee0a24">
            <van-dropdown-item v-model="type" :options="options" />
          </van-dropdown-menu>
        </van-col>
      </van-row>
      <!-- 内容输入 -->
      <van-row type="flex" justify="center" align="center" >
        <van-col span="20">
          <van-cell-group>
            <van-field
              v-model="activityDesc"
              rows="3"
              autosize
              type="textarea"
              maxlength="200"
              placeholder="有什么想说的呢~"
              show-word-limit
            />
          </van-cell-group>

        </van-col>
      </van-row>
      <!-- 图片上传 -->
      <van-row type="flex" justify="center" align="center" style="margin-top:10%;">
        <van-col span="6">
          <van-uploader
            v-model="fileList"
            multiple
            preview-size="100px"
            :before-read="beforeRead"
            :after-read="afterRead"
            :max-count="1"
          />
        </van-col>
      </van-row>
      <!-- 提交 -->
      <!-- 后台需要的数据：{fileName}/{base64Str} 
        Campus： activityDesc  type  userid
                 
      -->
      <van-row type="flex" justify="center" align="center" style="margin-top:10%;">
        <van-col span="6" offset="15">
            <van-button round  icon="flag-o" type="primary" @click="activityUp">发布</van-button>
        </van-col>
      </van-row>
    
    </van-popup>
    <!-- 预览图片 -->
      <van-image-preview
          v-model="showImg"
          :images="images"
      />
  </div>
</template>

<script>
import Swipe from "views/campus/Swipe"
import Love from "views/campus/Love"
import Things from "views/campus/Things"
import Problom from "views/campus/Problom"
import Postgraduate from "views/campus/Postgraduate"
import {getUser} from 'common/auth'
import {activityUpRequest} from "network/campus/activityUpRequest"
import { Toast } from 'vant';
export default {
    name: 'Campus',
    data () {
      return {
        show: false,  //弹出添加动态
        isLoading: false,  //下拉刷新标志
        active: 0,  //当前的导航栏
        activityDesc: '',  //动态描述
        fileList: [],  //图片列表
        type: 0,
        options: [
          { text: '日常告白', value: 0 },
          { text: '物品交流', value: 1 },
          { text: '问题求助', value: 2 },
          { text: '考研话题', value: 3 }
        ],
        images: [],  //预览的图片列表
        showImg: false,  //预览图片

        newActivity: false,

        isCache: false
      }
    },
    methods: {
      commentpage() {
        this.isCache = true
      },
      showPreviewImg(img){
        this.showImg = true
        this.images = [img]
      },
      //发布动态
      activityUp() {
        if(this.activityDesc == '' || this.fileList.length == 0){
          Toast('内容或者图片不能为空');
        }else{
          const _router = this.$router
          activityUpRequest(this.activityDesc,this.type,getUser().id,this.fileList[0].file.name,this.fileList[0].content).then(res => {
            if(res.flag == true){
              Toast.success(res.message);
              this.activityDesc = ''
              this.fileList = []
              this.show = false
              this.onRefresh()
              
            }else{
              Toast.fail(res.message);
            }
          })
        }
      },
      beforeRead(file) {
          Toast.loading({
            message: '上传中...',
            forbidClick: true,
            loadingType: 'spinner'
          });
          if (file.type !== 'image/jpeg' && file.type !== 'image/png' && file.type !== 'image/jpg' && file.type !== 'image/gif') {
            Toast('请上传 jpg 格式图片');
            return false
          }else{
            return true
          }
        },
      afterRead(file) {
          // 大于1MB的jpeg和png图片都缩小像素上传
        if(file.file.size>1000000) {
            // 创建Canvas对象(画布)
            let canvas =  document.createElement('canvas')  
            // 获取对应的CanvasRenderingContext2D对象(画笔)
            let context = canvas.getContext('2d') 
            // 创建新的图片对象 
            let img = new Image()
            // 指定图片的DataURL(图片的base64编码数据)
            img.src = file.content
            //画布宽度
            let width = 512   
            // 监听浏览器加载图片完成，然后进行绘制
            img.onload = () => {
                //画布大小按照图片的比例生成
                let height = width / (img.naturalWidth / img.naturalHeight)
                // 指定canvas画布大小，该大小为最后生成图片的大小
                canvas.width = width
                canvas.height = height
                /* drawImage画布绘制的方法。(0,0)表示以Canvas画布左上角为起点， canvas.width, canvas.height 是将图片按给定的像素进行缩小。*/
                /* 如果不指定缩小的像素，图片将以图片原始大小进行绘制，图片像素如果大于画布将会从左上角开始按画布大小部分绘制图片，最后得到的图片就是张局部图。图片小于画布就会有黑边。*/ 
                context.drawImage(img, 0, 0, canvas.width, canvas.height)
                // 将绘制完成的图片重新转化为base64编码，file.file.type为图片类型，0.92为默认压缩质量
                //返回压缩后的文件
                this.fileList[0].content =  canvas.toDataURL(file.type, 0.92)
                Toast.clear();
            }                    
        }
      },
      // 点击导航栏的事件
      onClick(index,title) {
        this.active = index
      },
      onRefresh() {
          
          const _router = this.$router
          //注意回调函数中得不到当前对象，包括它的值
          let activeFlag = this.active
          const _this = this
          setTimeout(() => {
            // window.location.reload()
            //跳转到空白页面，然后立马跳回来
            // _router.replace("/all/black")
            // _router.replace({
            //   name: 'black',
            //   params: {page: 'campus',active: activeFlag}
            // })
            this.newActivity = !this.newActivity
            
            this.$toast('刷新成功');
            this.isLoading = false;  
          },error => {
            this.$toast('刷新失败');
            this.isLoading = false;
          },500)
          
      },

    },
    components: {
      Swipe,
      Love,
      Things,
      Problom,
      Postgraduate,
    },
    created () {
      if(this.$route.params.active != undefined){
        this.active = this.$route.params.active
      }
    },
    mounted () {
      //控制tabbar的item显示
        this.$emit('currentPage',1)
        
    },
    activated(){
      //默认不缓存，如果是要缓存就把他改为不缓存，也不必担心下次的缓存，因为一点点击了comment就会改变为 
      if(this.isCache == true){
        this.isCache =false
      }else if(this.isCache == false){
        this.newActivity = !this.newActivity
        // this.isCache = true
      }
      
        
    },
    //控制从其他页面回来的时候还在当前滚动的页面
    beforeRouteLeave (to, from, next) {
      this.scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      next()
    },
    beforeRouteEnter (to, from, next) {
      next(vm => {
        document.body.scrollTop = vm.scrollTop
      })
    },
    
    
}
</script>

<style>
  .addActivity {
    position:fixed;
    width:100%;
    bottom:0px;
    height:20%;
    left:85%;
    z-index:1;
    overflow:hidden;
  }

</style>