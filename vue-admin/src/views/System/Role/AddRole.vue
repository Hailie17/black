<template>
  <div class="add-role">
    <header class="add-header">
      <div class="left">
        <span class="arrow" @click="$router.back()"><i class="el-icon-arrow-left" />返回</span>
        <span>|</span>
        <span>{{ id ? '编辑角色' : '添加角色' }}</span>
      </div>
      <div class="right">这是第n天</div>
    </header>
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
        <div class="form">
          <el-form ref="roleForm" class="form-box" :model="roleForm" :rules="roleRules">
            <el-form-item label="角色名称" prop="roleName">
              <el-input v-model="roleForm.roleName" />
            </el-form-item>
            <el-form-item label="角色描述" prop="remark">
              <el-input v-model="roleForm.remark" />
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div v-show="activeStep === 2" class="form-container">
        <div class="tree-wrapper">
          <div v-for="item in treeList" :key="item.id" class="tree-item">
            <div class="tree-title">{{ item.title }}</div>
            <el-tree ref="tree" :data="item.children" show-checkbox default-expand-all node-key="id" highlight-current :props="{ label: 'title' }" />
          </div>
        </div>
      </div>
      <div v-show="activeStep === 3" class="form-container">
        <div class="title">检查并完成</div>
        <div class="form">
          <div class="info">
            <div class="form-item">角色名称：{{ roleForm.roleName }}</div>
            <div class="form-item">角色描述：{{ roleForm.remark }}</div>
            <div class="form-item">角色权限：</div>
            <div class="tree-wrapper">
              <div v-for="item in treeList" :key="item.id" class="tree-item">
                <div class="tree-title">{{ item.title }}</div>
                <el-tree ref="diabledTree" :data="item.children" show-checkbox default-expand-all node-key="id" :highlight-current="false" :props="{ label: 'title', disabled: () => true }" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
    <footer class="add-footer">
      <div class="btn-container">
        <el-button v-if="activeStep > 1" @click="decreseStep">上一步</el-button>
        <el-button v-if="activeStep < 3" type="primary" @click="increseStep">下一步</el-button>
        <el-button v-if="activeStep === 3" type="primary" @click="confirmAdd">确认添加</el-button>
      </div>
    </footer>
  </div>
</template>
<script>
import { getTreeListAPI, createRoleUserAPI, getRoleDetailAPI, updateRoleAPI } from '@/api/system'
export default {
  data() {
    return {
      activeStep: 1,
      roleForm: {
        roleName: '',
        remark: ''
      },
      treeList: [], // 权限树形列表
      roleRules: {
        roleName: [{ required: true, message: '请输入角色名称', trigger: 'blur' }],
        remark: [{ required: true, message: '请输入角色描述', trigger: 'blur' }]
      }
    }
  },
  mounted() {
    // 在初始化时候就加载好
    this.getTreeList()
    if (this.id) {
      this.getRoleDetail()
    }
  },
  computed: {
    id() {
      return this.$route.query.id
    }
  },
  methods: {
    async getRoleDetail() {
      const res = await getRoleDetailAPI(this.id)
      const { perms, remark, roleId, roleName } = res.data
      // 回填基础表单
      this.roleForm = { perms, remark, roleId, roleName }
      // 回填Tree
      this.$refs.tree.forEach((tree, index) => {
        tree.setCheckedKeys(this.roleForm.perms[index])
      })
    },
    // 确认编辑 / 添加
    async confirmAdd() {
      if (this.id) {
        delete this.roleForm.userTotal
        await updateRoleAPI(this.roleForm)
        this.$message({
          type: 'success',
          message: '编辑角色成功'
        })
      } else {
        await createRoleUserAPI(this.roleForm)
        this.$message({
          type: 'success',
          message: '添加角色成功'
        })
      }
      this.$router.back()
    },
    // 获取功能权限列表
    async getTreeList() {
      const res = await getTreeListAPI()
      this.treeList = res.data
    },
    decreseStep() {
      if (this.activeStep === 1) return
      this.activeStep--
    },
    // 下一步
    increseStep() {
      if (this.activeStep === 3) return

      if (this.activeStep === 1) {
        // 当前是角色信息状态，进行表单校验
        this.$refs.roleForm.validate(valid => {
          if (valid) {
            // 校验通过才能进入下一个状态
            this.activeStep++
          }
        })
      } else if (this.activeStep === 2) {
        // 当前是权限信息状态
        this.roleForm.perms = []
        this.$refs.tree.forEach(tree => {
          this.roleForm.perms.push(tree.getCheckedKeys())
        })
        // 如果长度为零 没有选中任何东西
        if (this.roleForm.perms.flat().length === 0) {
          this.$message({
            type: 'error',
            message: '请至少选择一个权限点'
          })
        } else {
          // 如果长度不为零，进入到检查并完成
          this.activeStep++
          // 回填已选择数据
          this.$refs.diabledTree.forEach((tree, index) => {
            tree.setCheckedKeys(this.roleForm.perms[index])
          })
        }
      }
    }
  }
}
</script>
<style scoped lang="scss">
.add-role {
  background-color: #f4f6f8;
  height: 100vh;

  .add-header {
    display: flex;
    justify-content: space-between;
    padding: 0 20px;
    height: 64px;
    line-height: 64px;
    font-size: 16px;
    font-weight: bold;
    background-color: #fff;

    .left {
      span {
        margin-right: 4px;
      }

      .arrow {
        cursor: pointer;
      }
    }

    .right {
      text-align: right;
    }
  }

  .add-main {
    position: fixed;
    top: 64px;
    bottom: 88px;
    width: 100%;
    overflow-y: auto;
    background: #f4f6f8;
    padding: 20px 230px;
    display: flex;
    .step-container {
      height: 400px;
      width: 200px;
    }
    .form-container {
      flex: 1;
      background-color: #fff;
      overflow-y: auto;
      .title {
        height: 60px;
        line-height: 60px;
        padding-left: 20px;
      }
      .form {
        margin-bottom: 20px;
        padding: 20px 65px 24px;
        .el-form {
          display: flex;
          flex-wrap: wrap;
        }
        .info {
          font-size: 14px;
          color: #666;
          .form-item {
            margin-bottom: 20px;
          }
        }
      }
      .form-box {
        width: 600px;
        display: flex;
        flex-direction: column;
      }
    }
  }

  .add-footer {
    position: fixed;
    bottom: 0;
    width: 100%;
    padding: 24px 50px;
    color: #000000d9;
    font-size: 14px;
    background: #fff;
    text-align: center;
    z-index: 10001;
  }
  .tree-wrapper {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    .tree-item {
      flex: 1;
      padding: 0px 4px;
      text-align: center;
      .tree-title {
        background: #f5f7fa;
        text-align: center;
        padding: 10px 0;
        margin-bottom: 12px;
      }
    }
  }
}
</style>
