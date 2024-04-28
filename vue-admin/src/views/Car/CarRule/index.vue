<template>
  <div class="rule-container">
    <div class="create-container">
      <el-button type="primary">增加停车计费规则</el-button>
      <el-button>导出Excel</el-button>
    </div>
    <!-- 表格区域 -->
    <div class="table">
      <el-table :data="ruleList" style="width: 100%">
        <el-table-column type="index" label="序号" :index="indexMethod" />
        <el-table-column label="计费规则编号" prop="ruleNumber" />
        <el-table-column label="计费规则名称" prop="ruleName" />
        <el-table-column label="免费时长(分钟)" prop="freeDuration" />
        <el-table-column label="收费上线(元)" prop="chargeCeiling" />
        <el-table-column label="计费方式">
          <template #default="scope">
            {{ scope.row.chargeType }}
          </template>
        </el-table-column>
        <el-table-column label="计费规则" prop="ruleNameView" />
        <el-table-column label="操作" fixed="right" width="120">
          <template #default="scope">
            <el-button size="mini" type="text">编辑</el-button>
            <el-button size="mini" type="text">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="page-container">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="params.page" :page-sizes="[2, 4, 10, 40]" :page-size="params.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total"> </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { getRuleListAPI } from '@/api/cardRule'
export default {
  name: 'Building',
  data() {
    return {
      ruleList: [],
      params: {
        page: 1,
        pageSize: 2
      },
      total: 0,
      dialogVisible: false,
      ruleList: []
    }
  },
  created() {
    this.getRuleList()
  },
  methods: {
    // 序号方法
    indexMethod(row) {
      return (this.params.page - 1) * this.params.pageSize + row + 1
    },
    async getRuleList() {
      const res = await getRuleListAPI(this.params)
      this.total = res.data.total
      this.ruleList = res.data.rows
    },
    // 分页
    handleSizeChange(val) {
      this.params.pageSize = val
      this.getRuleList()
    },
    handleCurrentChange(val) {
      this.params.page = val
      this.getRuleList()
    }
  }
}
</script>

<style lang="scss" scoped>
.rule-container {
  padding: 20px;
  background-color: #fff;
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
