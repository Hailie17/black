<script>
// 高阶组件：把一个组件当成参数传给另一个组件 在组件内部你可以做好多事
// 最后再返回一个新的组件
// wrapperComponent:既没有业务功能也没有相关的样式 只做一个事
// 帮助我们做条件判断 最后根据条件返回我要控制的按钮

export default {
  props: {
    // 按钮的权限标识数据 要控制谁就把它的标识传入
    btnPerm: {
      type: String,
      default: ''
    }
  },
  render(h) {
    // 如何获取父组件传过来的待显示的按钮组件？
    // 如何在render中获取插槽模版？
    // template  slot接收插槽参数
    // render  this.$slots.插槽的名称
    // 获取当前用户下所有的权限标识
    const permissions = this.$store.state.user.userProfile.permissions
    // 判断props传入的当前按钮的权限标识this.btnPerm是否能在用户的权限列表中permissions找到
    // 如果能找到 则正常返回按钮组件 如果找不到什么都不返回
    const isShow = permissions.includes(this.btnPerm)
    // 如果isShow为true 代表找到了 显示出来传入的要显示的button组件
    return isShow && this.$slots.default
  }
}
</script>
