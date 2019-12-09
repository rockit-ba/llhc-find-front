<template>
  <div id="app">
      <keep-alive> 
          <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive"></router-view>
     
  </div>
</template>

<script>

import All from "components/All"
import Login from "components/Login"
import Register from "components/Register"
import Container from "components/Container"
export default {
  name: 'App',
  components: {
    All,  //显示整个布局容器
    Login,
    Register,
    Container,
  },
  created () {
    
  }
}
</script>

<style>
  @import "assets/css/base.css";
  
</style>
