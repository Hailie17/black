<template>
  <div class="add-card">
    <header class="add-header">
      <el-page-header content="增加月卡" @back="$router.back()" />
    </header>
    <main class="add-main">
      <div class="form-container">
        <div class="title">车辆信息</div>
        <div class="form">
          <el-form ref="carInfoForm" :model="carInfoForm" :rules="rules" label-width="100px">
            <el-form-item label="车主姓名" prop="personName">
              <el-input v-model="carInfoForm.personName" />
            </el-form-item>
            <el-form-item label="联系方式" prop="phoneNumber">
              <el-input v-model="carInfoForm.phoneNumber" />
            </el-form-item>
            <el-form-item label="车辆号码" prop="carNumber">
              <el-input v-model="carInfoForm.carNumber" />
            </el-form-item>
            <el-form-item label="汽车品牌" prop="carBrand">
              <el-input v-model="carInfoForm.carBrand" />
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div class="form-container">
        <div class="title">最新一次月卡缴费信息</div>
        <div class="form">
          <el-form label-width="100px" ref="feeInfoForm" :model="feeInfoForm" :rules="feeInfoFormRules">
            <el-form-item label="有效日期" prop="payTime">
              <el-date-picker v-model="feeInfoForm.payTime" type="daterange" format="yyyy-MM-dd" value-format="yyyy-MM-dd" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
            </el-form-item>
            <el-form-item label="支付金额" prop="paymentAmount">
              <el-input v-model="feeInfoForm.paymentAmount" />
            </el-form-item>
            <el-form-item label="支付方式" prop="paymentMethod">
              <el-select v-model="feeInfoForm.paymentMethod">
                <el-option v-for="item in payMethodList" :key="item.value" :value="item.value" :label="item.text" />
              </el-select>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </main>
    <footer class="add-footer">
      <div class="btn-container">
        <el-button @click="resetForm">重置</el-button>
        <el-button type="primary" @click="confirmAdd">确定</el-button>
      </div>
    </footer>
  </div>
</template>

<script>
import { addCardAPI, getCardDetailAPI } from '@/api/card'
export default {
  name: 'addCard',
  data() {
    return {
      carInfoForm: {
        personName: '',
        phoneNumber: '',
        carNumber: '',
        carBrand: ''
      },
      feeInfoForm: {
        payTime: '',
        paymentAmount: '',
        paymentMethod: ''
      },
      payMethodList: [
        { text: '支付宝', value: 'Alipay' },
        { text: '微信', value: 'Wechat' },
        { text: '现金', value: 'Cash' }
      ],
      rules: {
        personName: [{ required: true, message: '车主姓名不能为空', trigger: 'blur' }],
        phoneNumber: [{ required: true, message: '联系方式不能为空', trigger: 'blur' }],
        carNumber: [
          { required: true, message: '车牌号码不能为空', trigger: 'blur' },
          { validator: this.validatorCarNumber, trigger: 'blur' }
        ],
        carBrand: [{ required: true, message: '汽车品牌不能为空', trigger: 'blur' }]
      },
      feeInfoFormRules: {
        payTime: [{ required: true, message: '有效日期不能为空' }],
        paymentAmount: [{ required: true, message: '支付金额不能为空', trigger: 'blur' }],
        paymentMethod: [{ required: true, message: '支付方式不能为空', trigger: 'change' }]
      }
    }
  },
  computed: {
    id() {
      return this.$route.query.id
    }
  },
  created() {
    if (this.id) {
      this.getCardDetail(this.id)
    }
  },
  methods: {
    async getCardDetail(id) {
      const { data } = await getCardDetailAPI(id)
      const { personName, phoneNumber, carNumber, carBrand } = data
      this.carInfoForm = { personName, phoneNumber, carNumber, carBrand }
      const { cardStartDate, cardEndDate, paymentAmount, paymentMethod } = data.rechargeList[0]
      this.feeInfoForm = { payTime: [cardStartDate, cardEndDate], paymentAmount, paymentMethod }
    },
    confirmAdd() {
      this.$refs.carInfoForm.validate(valid => {
        if (!valid) return
        this.$refs.feeInfoForm.validate(async valid => {
          if (!valid) return
          const requestData = {
            ...this.carInfoForm,
            ...this.feeInfoForm,
            cardStartDate: this.feeInfoForm.payTime[0],
            cardEndDate: this.feeInfoForm.payTime[1]
          }
          delete requestData.payTime
          await addCardAPI(requestData)
          this.$message.success('添加月卡成功')
          this.$router.back()
        })
      })
    },
    // 重置表单
    resetForm() {
      // resetFields 只能清空加了 prop的表单域
      this.$refs.carInfoForm.resetFields()
      this.$refs.feeInfoForm.resetFields()
    },
    // 自定义表单验证规则
    validatorCarNumber(rule, value, callback) {
      const plateNumberRegex = /^[\u4E00-\u9FA5][\da-zA-Z]{7}$/
      if (plateNumberRegex.test(value)) {
        callback()
      } else {
        callback(new Error('车牌号码不正确'))
      }
    }
  }
}
</script>

<style scoped lang="scss">
.add-card {
  background-color: #f4f6f8;
  height: 100vh;

  .add-header {
    display: flex;
    align-items: center;
    padding: 0 20px;
    height: 64px;
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
    .preview {
      img {
        width: 100px;
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
