<template>
  <div class="add-enterprise">
    <header class="add-header">
      <div class="left">
        <span class="arrow" @click="$router.back()"><i class="el-icon-arrow-left" />返回</span>
        <span>|</span>
        <span>添加企业</span>
      </div>
      <div class="right">黑马程序员</div>
    </header>
    <main class="add-main">
      <div class="form-container">
        <div class="title">企业信息</div>
        <div class="form">
          <el-form ref="ruleForm" :model="addForm" :rules="rules" label-width="100px">
            <el-form-item label="企业名称" prop="name">
              <el-input v-model="addForm.name" />
            </el-form-item>
            <el-form-item label="法人" prop="legalPerson">
              <el-input v-model="addForm.legalPerson" />
            </el-form-item>
            <el-form-item label="注册地址" prop="registeredAddress">
              <el-input v-model="addForm.registeredAddress" />
            </el-form-item>
            <el-form-item label="所在行业" prop="industryCode">
              <el-select v-model="addForm.industryCode">
                <el-option v-for="item in list" :key="item.industryCode" :label="item.industryName" :value="item.industryCode"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="企业联系人" prop="contact">
              <el-input v-model="addForm.contact" />
            </el-form-item>
            <el-form-item label="联系电话" prop="contactNumber">
              <el-input v-model="addForm.contactNumber" />
            </el-form-item>
            <el-form-item label="营业执照" prop="businessLicenseUrl">
              <el-upload class="upload-demo" action="" :http-request="uploadImg" :before-upload="beforeUpload">
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
              </el-upload>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </main>
    <footer class="add-footer">
      <div class="btn-container">
        <el-button>重置</el-button>
        <el-button type="primary">确定</el-button>
      </div>
    </footer>
  </div>
</template>

<script>
import { getEnterpriseListAPI } from '@/api/enterprise'
import { uploadFiles } from '@/api/common'

export default {
  data() {
    return {
      addForm: {
        name: '', // 企业名称
        legalPerson: '', // 法人
        registeredAddress: '', // 注册地址
        industryCode: '', // 所在行业
        contact: '', // 企业联系人
        contactNumber: '', // 联系人电话
        businessLicenseUrl: '', // 营业执照url
        businessLicenseId: '' // 营业执照id
      },
      list: [],
      rules: {
        name: [{ required: true, message: '请输入企业名称', trigger: 'blur' }],
        legalPerson: [{ required: true, message: '请输入企业法人', trigger: 'blur' }],
        registeredAddress: [{ required: true, message: '请输入企业注册地址', trigger: 'blur' }],
        industryCode: [{ required: true, message: '请输入所在行业', trigger: 'blur' }],
        contact: [{ required: true, message: '请输入企业联系人', trigger: 'blur' }],
        contactNumber: [
          { required: true, message: '请输入联系人电话', trigger: 'blur' },
          { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的联系人电话', trigger: 'blur' }
        ],
        businessLicenseUrl: [{ required: true, message: '请输入营业执照', trigger: 'blur' }]
      }
    }
  },
  created() {
    this.getEnterpriseList()
  },
  methods: {
    async getEnterpriseList() {
      const res = await getEnterpriseListAPI()
      this.list = res.data
    },
    async uploadImg({ file }) {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('type', 1)
      const res = await uploadFiles(formData)
      this.addForm.businessLicenseUrl = res.data.url
      this.addForm.businessLicenseId = res.data.id
    },
    beforeUpload(file) {
      const imageType = ['image/png', 'image/jpg']
      if (!imageType.includes(file.type)) {
        this.$message.warning('图片格式不正确')
        return
      }
      if (file.size / 1024 / 1024 > 5) {
        this.$message.warning('图片大小不能超过5M')
        return
      }
    }
  }
}
</script>

<style scoped lang="scss">
.add-enterprise {
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
    background: #f4f6f8;
    padding: 20px 130px;

    .form-container {
      background-color: #fff;
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
          .el-form-item {
            width: 50%;
          }
        }
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
  }
}
</style>
