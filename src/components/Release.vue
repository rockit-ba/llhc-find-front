<template>
  <div>
    <!-- 下拉刷新 -->
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh" >
      release page{{$route.path}}
     
    </van-pull-refresh>
  </div>
</template>

<script>
export default {
    name: 'Release',
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
          this.count++;
        }, 500);
      }
    },
    created () {
      
    }
}
</script>

<style>

</style>