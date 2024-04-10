<template>
  <div id="app">
    <!-- 一级路由渲染出来 -->
    <router-view />
    <!-- 准备 一个挂载子应用的节点 -->
    <div id="bigContainer"></div>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>
