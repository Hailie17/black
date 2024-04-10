<template>
  <div class="card-container">
    <!-- 搜索区域 -->
    <!--
      思路分析: 把各种搜索条件当前请求参数发给后端 后端会根据字段对数据库数据做过滤筛选拿到符合条件的，返回
       1. 表单数据的双向绑定收集到当前的请求参数
       2. 把收集到的表单参数发送接口给后端拿符合条件的数据
       3. 把拿到的数据重新显示到table列表中
     -->
    <div class="search-container">
      <span class="search-label">车牌号码：</span>
      <el-input v-model="params.carNumber" clearable placeholder="请输入内容" class="search-main" />
      <span class="search-label">车主姓名：</span>
      <el-input v-model="params.personName" clearable placeholder="请输入内容" class="search-main" />
      <span class="search-label">状态：</span>
      <!--
        el-select: 双向绑定收集当前选中的数据
        el-option: 下拉框中的每一项 label（中文显示） / value（选中之后赋值给v-model的数据将来
        传给后端）
       -->
      <el-select v-model="params.cardStatus">
        <el-option v-for="item in statusList" :key="item.id" :label="item.name" :value="item.id" />
      </el-select>
      <el-button type="primary" class="search-btn" @click="doSearch">查询</el-button>
    </div>
    <!-- 新增删除操作区域 -->
    <div class="create-container">
      <el-button type="primary" @click="$router.push('/addCard')">添加月卡</el-button>
      <el-button @click="delAllCard">批量删除</el-button>
    </div>
    <!-- 表格区域 -->
    <div class="table">
      <el-table style="width: 100%" :data="list" @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="55"
        />
        <el-table-column type="index" label="序号" />
        <el-table-column label="车主名称" prop="personName" />
        <el-table-column label="联系方式" prop="phoneNumber" />
        <el-table-column label="车牌号码" prop="carNumber" />
        <el-table-column label="车辆品牌" prop="carBrand" />
        <el-table-column label="剩余有效天数" prop="totalEffectiveDate" />
        <el-table-column label="状态" prop="cardStatus" :formatter="formatStatus" />
        <el-table-column label="操作" fixed="right" width="180">
          <!--
            scope 作用域插槽
            scope.row -> 当前行的数据对象

            如果我们只是想使用插槽渲染模版 #default
            如果我们除了想要使用插槽渲染模版 而且还想要拿到它内部的数据 #default="scope" scope类似于函数的形参
            组件内部会把当前行数据对象当成一个实参传到scope的位置

            在内部传递实参的时候 实参的格式长这个样式 所以row是固定的
            {
              row: 当前行的对象数据
            }

            因为本来传下来就是一个对象 所以通过解构赋值的方式去取row参数 #default="{ row }"

           -->
          <template #default="scope">
            <el-button size="mini" type="text">续费</el-button>
            <el-button size="mini" type="text">查看</el-button>
            <el-button size="mini" type="text" @click="editCard(scope.row.id)">编辑</el-button>
            <el-button size="mini" type="text" @click="delCard(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页器 -->
    <!--
      1. 页数分出来 (页数 = 总条数 / 每页条数)
      2. 点击每页的时候获取当前页的数据重新渲染到table上
         1. 通过事件获取到当前点击的是第几页
         2. 以当前拿到的页数作为参数去和后端要数据
         3. 把获取到的当前页的列表数据重新渲染table组件上
     -->
    <div class="page-container">
      <el-pagination
        layout="total, prev, pager, next"
        :page-size="params.pageSize"
        :total="total"
        @current-change="currentChange"
      />
    </div>
  </div>
</template>

<script>
import { getCardListAPI, delCardAPI, delAllCardAPI } from '@/api/card'
export default {
  name: 'Card',
  data() {
    return {
      selectedList: [],
      list: [], // 月卡列表
      // 请求参数
      params: {
        page: 1,
        pageSize: 2,
        carNumber: '',
        personName: '',
        cardStatus: null
      },
      total: 0, // 总条数
      statusList: [
        {
          id: null,
          name: '全部'
        },
        {
          id: 0,
          name: '有效'
        },
        {
          id: 1,
          name: '已过期'
        }
      ]
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    async getList() {
      // 1. 调用接口
      const res = await getCardListAPI(this.params)
      // 2. 把后端数据赋值给响应式list
      this.list = res.data.rows
      this.total = res.data.total
    },
    // 格式化状态方法 跟着行走的 有几行就会执行几次 自动把当前行的数据当成实参传入 然后
    // 把函数执行的返回值显示到当前行对应列的位置
    formatStatus(row, column) {
      console.log(row, column)
      // return的数据就是要渲染到当前列的数据
      // 如果当前的状态除了0/1/2/3/4/5/6 怎么办？- if
      // 解决方案:通过映射的方式做匹配
      const MAP = {
        0: '有效',
        1: '已过期'
      }
      // 对象取值 点语法  []语法
      // return row.cardStatus === 0 ? '有效' : '已过期'
      return MAP[row.cardStatus]
    },
    currentChange(page) {
      console.log(page)
      // 1. 把请求参数中的page修改为当前点击的页数
      this.params.page = page
      // 2. 发送请求重新获取列表
      this.getList()
    },
    doSearch() {
      // 1. 把当前的请求页数重置为1
      this.params.page = 1
      // 2. 执行getList
      this.getList()
    },
    editCard(id) {
      console.log(id)
      // params - url/1001
      // query - url？id = 1001
      // 传参方式和取参方式要对应
      this.$router.push({
        path: '/addCard',
        query: {
          id
        }
      })
    },
    delCard(id) {
      this.$confirm('确认删除月卡吗, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        await delCardAPI(id)
        // 更新列表
        this.getList()
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    handleSelectionChange(value) {
      console.log(value)
      this.selectedList = value
      // 1. 添加新列 展示多选框
      // 2. 绑定事件 拿到选中项的所有对象组成的数组
      // 3. 调用接口需要做数据的处理 把对象数组中的每一项里的id拿到 拼接成逗号分割的写法
      // 目标：把对象组成的数组 -> id组成的数组  map
    },
    async delAllCard() {
      await delAllCardAPI(this.selectedList.map(item => item.id))
      this.getList()
      this.$message.success('批量删除成功')
    }
  }
}
</script>

<style lang="scss" scoped>
.card-container {
  padding: 20px;
  background-color: #fff;
}

.search-container {
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgb(237, 237, 237, .9);
  padding-bottom: 20px;
  .search-main {
    width: 220px;
    margin-right: 10px;
  }
  .search-btn{
    margin-left:20px;
  }
}
.create-container{
  margin: 10px 0px;
}
.page-container{
  padding:4px 0px;
  text-align: right;
}
.form-container{
  padding:0px 80px;
}
</style>
