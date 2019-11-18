<template>
  <div id="outer">
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh" >
      <div id="inner">   
        <main-list></main-list>
      </div>
    </van-pull-refresh>
  </div>
</template>

<script>
import MainList from "components/MainList"
export default {
    name: 'Main',
    data () {
      return {
        isLoading: false,
      }
    },
    components: {
      MainList
    },
    methods:{
      onRefresh() {
        setTimeout(() => {
          this.$toast('刷新成功');
          this.isLoading = false;
          this.count++;
        }, 500);
      }
    },
    
    
}
</script>

<style>
  #outer {
    background-color: #F0F0F0;
  }
  #inner {
    background-color: aquamarine;
    margin-left: 15px;
    margin-right: 15px;
  }
</style>