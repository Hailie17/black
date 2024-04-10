<template>
  <!--
    在组件标签身上通过@绑定的事件默认会被识别为自定义事件 都需要通过$emit触发

    在普通的元素身上通过@绑定的事件叫做浏览器原生事件 鼠标点击

    .native

    el-button @click
   -->
  <button :class="className" @click="clickHandler">
    <slot />
  </button>
</template>

<script>
export default {
  props: {
    size: {
      type: String,
      default: 'mini'
    }
  },
  computed: {
    className() {
      return this.size
    }
  },
  methods: {
    clickHandler() {
      // 触发自定义事件
      this.$emit('click')
    }
  }
}
</script>

<style scoped lang="scss">
.mini{
  padding:20px;
}
.large{
  padding:50px;
}
</style>
