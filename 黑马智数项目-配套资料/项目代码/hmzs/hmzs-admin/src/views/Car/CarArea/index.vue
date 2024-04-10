<template>
  <div>
    {{ form.name }}
    {{ form.age }}
    <button @click="changeName">修改name</button>
    <button @click="addAge">动态添加age</button>

    <!-- v-model -->
    <input v-model="form.age">
    <!-- 渲染组件 -->
    <sf-button size="mini" @click="clickHandler">click me</sf-button>
    <sf-button size="large">click me</sf-button>
  </div>
</template>

<script>
// Vue2 响应式缺点  对象的属性动态添加 不是响应式的 Object.defineProperty
// 解决办法：this.$set(要修改的对象,要添加的属性名,新属性的值)

// 特殊的情况：v-model  视图修改的时候同样可以被收集到本来不存在的属性身上

export default {

  data() {
    return {
      form: {
        name: 'cp'
      }
    }
  },
  methods: {
    clickHandler() {
      console.log('click触发了')
    },
    changeName() {
      this.form.name = 'this is new name'
    },
    addAge() {
      this.form.age = 20
      // this.$set(this.form, 'age', 20)
    }
  }
}
</script>
