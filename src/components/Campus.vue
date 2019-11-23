<template>
  <div>
    <!-- 下拉刷新 -->
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh" >
      Campus page
     
    </van-pull-refresh>
  </div>
</template>

<script>
export default {
    name: 'Campus',
    data () {
      return {
        isLoading: false
      }
    },
    methods: {
       onRefresh() {
        setTimeout(() => {
          
          this.$toast('刷新成功');
          this.isLoading = false;
        }, 500);
      }
    },
    created () {
      
    },
    mounted () {
      //控制tabbar的item显示
        this.$emit('currentPage',1)
    },
}
</script>

<style>

</style>