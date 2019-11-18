<template>
  <div id="app">
      <all/>
  </div>
</template>

<script>

import All from "components/All"
export default {
  name: 'App',
  components: {
    All,  //显示整个布局容器
  }
}
</script>

<style>
  @import "assets/css/base.css";
  
</style>
