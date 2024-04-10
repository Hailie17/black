<script setup>

</script>
<template>
  <RouterView />
  <p class="btn">我是主应用中的文字</p>
  <button @click="$router.push('/big-screen')">加载子应用</button>
  <!-- container 子应用容器 -->
  <div id="container"></div>
</template>
