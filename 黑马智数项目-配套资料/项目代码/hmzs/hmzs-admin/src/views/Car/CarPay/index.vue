
<script>
export default {
  // 写组件模版的另一种方式 直接通过脚本js去写模版
  // h: 方法 作用用来生成虚拟dom节点
  // 第一个参数: 标签名/组件引用
  // 第二个参数：对于标签/组件的属性配置  （如果是组件 父传子给子组件传入props）
  // 第三个参数: 配置子元素 默认数组 （子节点可以有多个） 如果只是一个文本节点直接写字符串
  // 结论：template和render都是编写组件模版的方式  绝大部分情况下都用template编写 只有
  // 想利用js的编程能力去写模版的时候才用render函数
  // 即使不写render函数 写的tempalte Vue依旧会把template编译成render函数在浏览器中实际运行的起始还是render

  // render函数适合的场景
  // level: 1 - 6之间 h1 - h6 标题元素

  // 有没有既可以写传统template同时还可以写js灵活的编程能力 - JSX

  data() {
    return {
      level: 3
    }
  },
  render(h) {
    return h(`h${this.level}`, {}, `this is h${this.level}`)
  }
}
</script>

<style scoped>
</style>
