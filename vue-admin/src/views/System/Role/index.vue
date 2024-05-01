<template>
  <div class="role-container">
    <div class="left-wrapper">
      <div v-for="(item, index) in roleList" :key="item.roleId" class="role-item" :class="{ active: activeIndex === index }" @click="menuChange(index)">
        <div class="role-info">
          <svg-icon icon-class="user" class="icon" />
          {{ item.roleName }}
        </div>
        <div class="more">
          <svg-icon icon-class="more" />
        </div>
      </div>
      <el-button class="addBtn" size="mini">添加角色</el-button>
    </div>
  </div>
</template>

<script>
import { getRoleListAPI } from '@/api/system.js'
export default {
  name: 'Role',
  data() {
    return {
      roleList: [],
      activeIndex: 0
    }
  },
  created() {
    this.getRoleList()
  },
  methods: {
    // 获取角色列表
    async getRoleList() {
      const res = await getRoleListAPI()
      this.roleList = res.data
    },
    // 切换菜单
    menuChange(index) {
      this.activeIndex = index
    }
  }
}
</script>

<style scoped lang="scss">
.role-container {
  display: flex;
  font-size: 14px;
  background-color: #fff;
  padding: 20px;
  .left-wrapper {
    width: 200px;
    border-right: 1px solid #e4e7ec;
    padding: 4px;
    text-align: center;

    .role-item {
      position: relative;
      height: 56px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 20px;
      cursor: pointer;

      &.active {
        background: #edf5ff;
        color: #4770ff;
      }
    }

    .role-info {
      display: flex;
      align-items: center;

      .icon {
        margin-right: 10px;
      }
    }

    .more {
      display: flex;
      align-items: center;
    }
    .addBtn {
      width: 100%;
      margin-top: 20px;
    }
  }

  .right-wrapper {
    flex: 1;

    .tree-wrapper {
      display: flex;
      justify-content: space-between;

      .tree-item {
        flex: 1;
        border-right: 1px solid #e4e7ec;
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

    ::v-deep .el-tabs__nav-wrap {
      padding-left: 20px;
    }

    .user-wrapper {
      padding: 20px;
    }
  }
}
</style>
