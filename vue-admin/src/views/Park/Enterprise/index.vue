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
      <el-table style="width: 100%" :data="list" @expand-change="expandChange">
        <el-table-column type="expand">
          <template #default="scope">
            <el-table :data="scope.row.rentList">
              <el-table-column label="租赁楼宇" width="320" prop="buildingName" />
              <el-table-column label="租赁起始时间" prop="startTime">
                <template #default="rentObj"> {{ rentObj.row.startTime }} to {{ rentObj.row.endTime }} </template>
              </el-table-column>
              <el-table-column label="合同状态" prop="status">
                <template #default="rentObj">
                  <el-tag :type="formatInfoType(rentObj.row.status)">
                    {{ formatStatus(rentObj.row.status) }}
                  </el-tag>
                </template>
              </el-table-column>
              <el-table-column label="操作" width="180">
                <template #default="scope">
                  <el-button size="mini" type="text" @click="rentingOut(scope.row.id)" :disabled="scope.row.status === 3">退租</el-button>
                  <el-button size="mini" type="text" :disabled="!scope.row.status === 3">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </template>
        </el-table-column>
        <el-table-column type="index" label="序号" :index="indexMethod" />
        <el-table-column label="企业名称" width="320" prop="name" />
        <el-table-column label="联系人" prop="contact" />
        <el-table-column label="联系电话" prop="contactNumber" />
        <el-table-column label="操作">
          <template #default="scope">
            <el-button size="mini" type="text" @click="addContract(scope.row.id)">添加合同</el-button>
            <el-button size="mini" type="text">查看</el-button>
            <el-button size="mini" type="text" @click="toEdit(scope.row.id)">编辑</el-button>
            <el-button size="mini" type="text" @click="deleteEnterprise(scope.row.id)">删除</el-button>
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
    <!-- 添加合同弹框 -->
    <el-dialog title="添加合同" :visible.sync="rentDialogVisiable" width="580px" @close="closeDialog">
      <div class="form-container">
        <el-form ref="addForm" :model="rentForm" :rules="rentRules" label-position="top">
          <el-form-item label="租赁楼宇" prop="buildingId">
            <el-select v-model="rentForm.buildingId" placeholder="请选择">
              <el-option v-for="item in buildingList" :key="item.id" :label="item.name" :value="item.id" />
            </el-select>
          </el-form-item>
          <el-form-item label="租赁起止日期" prop="rentTime">
            <el-date-picker v-model="rentForm.rentTime" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd" />
          </el-form-item>
          <el-form-item label="租赁合同" prop="contractId">
            <!--
              上传实现流程：
                1. el-upload 打开本地文件 并且校验这个文件是否符合要求 - File
                2. :http-request = 'upload'
                3. 按照接口的要求格式 得到类型为FormData的对象  new FormData()
                4. 按照要求往formData中添加字段数据 fd.append('字段名', '字段值')
                5. 调用上传接口
                6. 拿到返回的文件地址和其他有用的信息id 存入data中的响应式数据的位置 将来提交表单
             -->
            <el-upload ref="uploadRef" action="#" :http-request="upload" :before-upload="beforeUpload" :limit="1" :on-exceed="onExceed" :on-remove="onRemove">
              <el-button size="small" type="primary" plain>上传合同文件</el-button>
              <div slot="tip" class="el-upload__tip">支持扩展名：.doc .docx .pdf, 文件大小不超过5M</div>
            </el-upload>
          </el-form-item>
        </el-form>
      </div>
      <template #footer>
        <el-button @click="rentDialogVisiable = false">取 消</el-button>
        <el-button type="primary" @click="confirmAdd">确 定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { rentingOutAPI, getEnterpriseAPI, deleteEnterpriseAPI, getBuildingListAPI, addRendAPI, getEnterpriseRentAPI } from '@/api/enterprise'
import { uploadFiles } from '@/api/common'
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
      total: 0,
      rentDialogVisiable: false,
      rentForm: {
        buildingId: null, // 楼宇id
        contractId: null, // 合同id
        contractUrl: '', // 合同Url
        enterpriseId: null, // 企业名称
        type: 0, // 合同类型
        rentTime: [] // 合同时间
      },
      rentRules: {
        buildingId: [{ required: true, message: '请选择楼宇', trigger: 'change' }],
        rentTime: [{ required: true, message: '请选择租赁日期', trigger: 'change' }],
        contractId: [{ required: true, message: '请上传合同文件' }]
      },
      buildingList: [] // 楼宇列表
    }
  },
  created() {
    this.getEnterpriseLIst()
  },
  methods: {
    // 退租
    rentingOut(id) {
      this.$confirm('确认退租该企业吗?').then(async () => {
        await rentingOutAPI(id)
        this.$message.success('退租成功')
        this.getEnterpriseLIst()
      })
    },
    formatInfoType(status) {
      const MAP = {
        0: 'warning',
        1: 'success',
        2: 'info',
        3: 'danger'
      }
      // return 格式化之后的中文显示
      return MAP[status]
    },
    // 格式化状态
    formatStatus(status) {
      const Map = {
        0: '待生效',
        1: '生效中',
        2: '已到期',
        3: '已退租'
      }
      return Map[status]
    },
    // 展开行
    async expandChange(row, expandRows) {
      // 判断当前点击是展开还是关闭
      const isInclude = expandRows.find(item => item.id === row.id)
      if (!isInclude) return
      const res = await getEnterpriseRentAPI(row.id)
      row.rentList = res.data
    },
    confirmAdd() {
      this.$refs.addForm.validate(async valid => {
        if (!valid) return
        const [startTime, endTime] = this.rentForm.rentTime
        this.rentForm.startTime = startTime
        this.rentForm.endTime = endTime
        delete this.rentForm.rentTime
        await addRendAPI(this.rentForm)
        this.$message.success('添加成功')
        this.getEnterpriseLIst()
        this.closeDialog()
      })
    },
    async getEnterpriseLIst() {
      const res = await getEnterpriseAPI(this.params)
      // 给列表的每一个数据添加额外属性
      this.list = res.data.rows.map(item => {
        return {
          ...item,
          rentList: []
        }
      })
      this.total = res.data.total
    },
    search() {
      this.params.page = 1
      this.getEnterpriseLIst()
    },
    // 编辑
    toEdit(id) {
      this.$router.push({
        path: '/park/addEnterprise',
        query: {
          id
        }
      })
    },
    // 删除
    async deleteEnterprise(id) {
      this.$confirm('确认删除该企业吗?')
        .then(async () => {
          await deleteEnterpriseAPI(id)
          if (this.list.length === 1 && this.params.page > 1) {
            this.params.page--
          }
          this.getEnterpriseLIst()
        })
        .catch(() => {})
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
    // 添加
    add() {
      this.$router.push('/park/addEnterprise')
    },
    // 添加合同
    async addContract(id) {
      this.rentForm.enterpriseId = id
      this.rentDialogVisiable = true
      const res = await getBuildingListAPI()
      this.buildingList = res.data
    },
    // 文件上传前校验
    beforeUpload(file) {
      const fileType = ['application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/pdf']
      const result = fileType.includes(file.type)
      const isLT5M = file.size / 1024 / 1024 < 5
      if (result && isLT5M) {
        return true
      } else {
        this.$message.error('上传文件错误，请重新选择文件')
        return false
      }
    },
    // 文件超出个数限制
    onExceed() {
      this.$message.warning('只能上传一个文件')
    },
    onRemove() {
      this.rentForm.contractId = null
      this.rentForm.contractUrl = null
      this.$refs.addForm.validateField('contractId')
    },
    // 上传合同文件
    async upload({ file }) {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('type', 2)
      const res = await uploadFiles(formData)
      this.rentForm.contractId = res.data.id
      this.rentForm.contractUrl = res.data.url
      this.$refs.addForm.validateField('contractId')
    },
    // 关闭添加合同弹框
    closeDialog() {
      this.rentDialogVisiable = false
      this.$refs.addForm.resetFields()
      ;(this.rentForm = {
        buildingId: null, // 楼宇id
        contractId: null, // 合同id
        contractUrl: '', // 合同Url
        enterpriseId: null, // 企业名称
        type: 0, // 合同类型
        rentTime: [] // 合同时间
      }),
        this.$refs.uploadRef.clearFiles()
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
