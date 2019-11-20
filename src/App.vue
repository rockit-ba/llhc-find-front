<template>
  <div id="app">
      <router-view/>
  </div>
</template>

<script>

import All from "components/All"
import Login from "components/Login"
import Register from "components/Register"
export default {
  name: 'App',
  components: {
    All,  //显示整个布局容器
    Login,
    Register,
  }
}
</script>

<style>
  @import "assets/css/base.css";
  
</style>
