<template>
  <div class="building-container">
    <!-- 搜索区域 -->
    <div class="search-container">
      <div class="search-label">企业名称：</div>
      <el-input clearable placeholder="请输入内容" v-model="params.name" @clear="search" class="search-main" />
      <el-button type="primary" @click="search">查询</el-button>
    </div>
    <div class="create-container">
      <el-button type="primary" @click="add">添加企业</el-button>
    </div>
    <!-- 表格区域 -->
    <div class="table">
      <el-table style="width: 100%" :data="list">
        <el-table-column type="index" label="序号" :index="indexMethod" />
        <el-table-column label="企业名称" width="320" prop="name" />
        <el-table-column label="联系人" prop="contact" />
        <el-table-column label="联系电话" prop="contactNumber" />
        <el-table-column label="操作">
          <template #default="scope">
            <el-button size="mini" type="text">添加合同</el-button>
            <el-button size="mini" type="text">查看</el-button>
            <el-button size="mini" type="text">编辑</el-button>
            <el-button size="mini" type="text">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="page-container">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="params.current" :page-sizes="[10, 20, 30, 40]" :page-size="params.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total"> </el-pagination>
      </div>
    </div>
    <div class="page-container">
      <el-pagination layout="total, prev, pager, next" />
    </div>
  </div>
</template>

<script>
import { getEnterpriseAPI } from '@/api/enterprise'
export default {
  name: 'Enterprise',
  data() {
    return {
      params: {
        name: '',
        page: 1,
        pageSize: 10
      },
      list: [],
      total: 0
    }
  },
  created() {
    this.getEnterpriseLIst()
  },
  methods: {
    async getEnterpriseLIst() {
      const res = await getEnterpriseAPI(this.params)
      this.list = res.data.rows
      this.total = res.data.total
    },
    search() {
      this.params.page = 1
      this.getEnterpriseLIst()
    },
    // 序号
    indexMethod(index) {
      return (this.params.page - 1) * this.params.pageSize + index + 1
    },
    // 分页
    handleSizeChange(val) {
      this.params.pageSize = val
      this.getEnterpriseLIst()
    },
    handleCurrentChange(val) {
      this.params.page = val
      this.getEnterpriseLIst()
    },
    add() {
      this.$router.push('/park/addEnterprise')
    }
  }
}
</script>

<style lang="scss" scoped>
.department-container {
  padding: 10px;
}

.search-container {
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgb(237, 237, 237, 0.9);
  padding-bottom: 20px;

  .search-label {
    width: 100px;
  }

  .search-main {
    width: 220px;
    margin-right: 10px;
  }
}
.create-container {
  margin: 10px 0px;
}
.page-container {
  padding: 4px 0px;
  text-align: right;
}
.form-container {
  padding: 0px 80px;
}
</style>
