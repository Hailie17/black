<template>
  <div class="rule-container">
    <div class="create-container">
      <el-button type="primary">增加停车计费规则</el-button>
      <el-button @click="exportToExcel">导出Excel</el-button>
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
            {{ formatChargeType(scope.row) }}
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
import { utils, writeFileXLSX } from 'xlsx'
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
    // 格式化收费模式
    formatChargeType(row) {
      const Map = {
        duration: '时长收费',
        turn: '次数收费',
        partition: '分段收费'
      }
      return Map[row.chargeType]
    },
    // 导出excel
    async exportToExcel() {
      const res = await getRuleListAPI(this.params)
      const ruleHeaderKey = ['ruleNumber', 'ruleName', 'freeDuration']
      const list = res.data.rows.map(item => {
        const obj = {}
        ruleHeaderKey.forEach(key => {
          obj[key] = item[key]
        })
        return obj
      })
      // 标头
      const ruleHeaderValue = ['计费规则编号', '计费规则名称', '免费时长(分钟)']
      // 创建一个新的工作簿
      const workbook = utils.book_new()
      // 创建一个工作表 要求一个对象数组格式
      const worksheet = utils.json_to_sheet(list)
      // 把工作表添加到工作簿  Data为工作表名称
      utils.book_append_sheet(workbook, worksheet, 'Data')
      // 改写表头
      utils.sheet_add_aoa(worksheet, [ruleHeaderValue], { origin: 'A1' })
      // 导出方法进行导出
      writeFileXLSX(workbook, 'SheetJSVueAoO.xlsx')
    },
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
