<template>
  <div>
      <!-- 数据列表 -->
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <!-- 每一列的数据 -->
            <van-cell v-for="item in list" >
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
</template>

<script>
export default {
    name: 'MainList',
    data() {
        return {
            list: [
                {
                    picUrl: 'https://img.yzcdn.cn/vant/cat.jpeg',
                    description: '小猫丢失很多天了，现在非常着急，有谁看到了麻烦联系一下',
                    createTime : '2019/12/12'
                },
                {
                    picUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1574075173680&di=0773c7ddb2b09782db8e87ac04fbb3b5&imgtype=0&src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2Fd%2F56667c2077ff6.jpg',
                    description: '灰太狼的日常',
                    createTime : '2019/12/12'
                },
                {
                    picUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1574075173679&di=7f20aaf48e2eb24ec0a788a8f7b96a00&imgtype=0&src=http%3A%2F%2Fimg.taopic.com%2Fuploads%2Fallimg%2F110915%2F8880-11091500294591.jpg',
                    description: '灰太狼的日常',
                    createTime : '2019/12/12'
                },
                {
                    picUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1574075173678&di=d35b5dceaca92e4f6fa7c0e6370363eb&imgtype=0&src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2F4b8bfa989db31e3f37302e8f9c39c59f9431507616a9e-bzIfqn_fw658',
                    description: '灰太狼的日常',
                    createTime : '2019/12/12'
                },
            ],
            loading: false,
            finished: false
        };
    },
    methods: {
        onLoad() {
            console.log("加载")
        // 异步更新数据
            setTimeout(() => {
                console.log("1")
                for (let i = 0; i < 10; i++) {
                    this.list.push(this.list.length + 1);
                }
                // 加载状态结束
                this.loading = false;

                // 数据全部加载完成
                if (this.list.length >= 2) {
                    this.finished = true;
                }
            }, 500);
        }
    }
}
</script>

<style>
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