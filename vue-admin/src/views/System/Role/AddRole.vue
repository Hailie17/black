<template>
  <div class="add-role">
    <main class="add-main">
      <div class="step-container">
        <el-steps direction="vertical" :active="activeStep">
          <el-step title="角色信息" />
          <el-step title="权限信息" />
          <el-step title="检查并完成" />
        </el-steps>
      </div>
      <div v-show="activeStep === 1" class="form-container">
        <div class="title">角色信息</div>
        <div class="form">角色信息内容</div>
      </div>
      <div v-show="activeStep === 2" class="form-container">
        <div class="title">权限配置</div>
        <div class="form">权限配置内容</div>
      </div>
      <div v-show="activeStep === 3" class="form-container">
        <div class="title">检查并完成</div>
        <div class="form">检查并完成内容</div>
      </div>
    </main>
    <footer class="add-footer">
      <div class="btn-container">
        <el-button v-if="activeStep > 1" @click="decreseStep">上一步</el-button>
        <el-button v-if="activeStep < 3" type="primary" @click="increseStep">下一步</el-button>
        <el-button v-if="activeStep === 3" type="primary">确认添加</el-button>
      </div>
    </footer>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeStep: 1
    }
  },
  methods: {
    decreseStep() {
      if (this.activeStep === 1) return
      this.activeStep--
    },
    increseStep() {
      if (this.activeStep === 3) return
      this.activeStep++
    }
  }
}
</script>
