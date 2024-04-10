<template>
  <div class="add-card">
    <header class="add-header">
      <el-page-header :content="id?'编辑月卡':'新增月卡'" @back="$router.back()" />
    </header>
    <main class="add-main">
      <div class="form-container">
        <div class="title">车辆信息</div>
        <div class="form">
          <!--
            el-form： :model  :rules
            el-form-item:  prop指定要用哪条规则
            el-input  v-model双向绑定
           -->
          <el-form ref="carInfoForm" :model="carInfoForm" :rules="carInfoRules" label-width="100px">
            <el-form-item label="车主姓名" prop="personName">
              <el-input v-model="carInfoForm.personName" />
            </el-form-item>
            <el-form-item label="联系方式" prop="phoneNumber">
              <el-input v-model="carInfoForm.phoneNumber" />
            </el-form-item>
            <el-form-item label="车辆号码" prop="carNumber">
              <el-input v-model="carInfoForm.carNumber" />
            </el-form-item>
            <el-form-item label="车辆品牌" prop="carBrand">
              <el-input v-model="carInfoForm.carBrand" />
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div class="form-container">
        <div class="title">最新一次月卡缴费信息</div>
        <!-- 缴费信息 -->
        <div class="form">
          <el-form ref="feeForm" :model="feeForm" :rules="feeFormRules" label-width="100px">
            <el-form-item label="有效日期" prop="payTime">
              <el-date-picker
                v-model="feeForm.payTime"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                value-format="yyyy-MM-dd"
              />
            </el-form-item>
            <el-form-item label="支付金额" prop="paymentAmount">
              <el-input v-model="feeForm.paymentAmount" />
            </el-form-item>
            <el-form-item label="支付方式" prop="paymentMethod">
              <el-select v-model="feeForm.paymentMethod">
                <el-option
                  v-for="item in payMethodList"
                  :key="item.id"
                  :value="item.id"
                  :label="item.name"
                />
              </el-select>
            </el-form-item>
          </el-form>
        </div>
      </div>

    </main>
    <footer class="add-footer">
      <div class="btn-container">
        <el-button>重置</el-button>
        <el-button type="primary" @click="confirmAdd">确定</el-button>
      </div>
    </footer>
  </div>
</template>

<script>
import { createCardAPI, getDetailAPI, updateCardAPI } from '@/api/card'
export default {
  data() {
    const validateCarNumber = (rule, value, callback) => {
      // value:用户在表单里输入的最新的数据
      // callback：放行函数 必须调用 校验通过直接调用 如果是未通过callback(new Error('错误提示语'))
      const reg = /^[\u4E00-\u9FA5][\da-zA-Z]{6}$/
      if (!reg.test(value)) {
        // 校验不通过
        callback(new Error('请输入符合规范的车牌号'))
      } else {
        callback()
      }
    }
    return {
      // 表单对象
      carInfoForm: {
        personName: '',
        phoneNumber: '',
        carNumber: '',
        carBrand: ''
      },
      // 规则对象
      carInfoRules: {
        personName: [
          {
            required: true, message: '请输入车主姓名', trigger: 'blur'
          }
        ],
        phoneNumber: [
          {
            required: true, message: '请输入联系方式', trigger: 'blur'
          }
        ],
        carNumber: [
          {
            required: true, message: '请输入车辆号码', trigger: 'blur'
          },
          {
            validator: validateCarNumber,
            trigger: 'blur'
          }
        ],
        carBrand: [
          {
            required: true, message: '请输入车辆品牌', trigger: 'blur'
          }
        ]
      },
      // 缴费信息表单
      feeForm: {
        payTime: '', // 支付时间
        paymentAmount: null, // 支付金额
        paymentMethod: '' // 支付方式
      },
      // 缴费规则
      feeFormRules: {
        payTime: [
          {
            required: true,
            message: '请选择支付时间'
          }
        ],
        paymentAmount: [
          {
            required: true,
            message: '请输入支付金额',
            trigger: 'blur'
          }
        ],
        paymentMethod: [
          {
            required: true,
            message: '请选择支付方式',
            trigger: 'change'
          }
        ]
      },
      // 支付方式下拉列表
      payMethodList: [
        {
          id: 'Alipay',
          name: '支付宝'
        },
        {
          id: 'WeChat',
          name: '微信'
        },
        {
          id: 'Cash',
          name: '线下'
        }
      ]
    }
  },
  computed: {
    // 缓存id 方便调用
    id() {
      return this.$route.query.id
    }
  },
  mounted() {
    // 只有id存在 也就说是编辑状态 才有资格获取详情
    if (this.id) {
      this.getCardDetail()
    }
  },
  methods: {
    confirmAdd() {
      // 俩个表单统一校验
      // 调用实例的validate方法
      // 1. 串行校验 第一个表单校验通过之后再开始第二个表单
      // 2. 并行校验 俩个表单项同时进行校验
      // const p1 = this.$refs.feeForm.validate()
      // const p2 = this.$refs.carInfoForm.validate()
      // Promise.all([p1, p2]).then(res => {
      //   console.log(res)
      // })
      this.$refs.carInfoForm.validate(valid => {
        if (valid) {
          // 第二个表单校验
          this.$refs.feeForm.validate(async valid => {
            if (valid) {
              // TODO API
              // 二次处理请求参数
              const reqData = {
                ...this.carInfoForm,
                ...this.feeForm,
                cardStartDate: this.feeForm.payTime[0],
                cardEndDate: this.feeForm.payTime[1]
              }
              delete reqData.payTime
              console.log(reqData)
              // 调用接口需要区分是编辑还是新增
              if (this.id) {
                // 编辑
                await updateCardAPI(reqData)
              } else {
                await createCardAPI(reqData)
              }

              // 后续处理
              // 提示用户
              this.$message.success(`${this.id ? '更新成功' : '新增成功'}`)
              // 跳回列表
              this.$router.back()
            }
          })
        }
      })
    },
    async getCardDetail() {
      const id = this.id
      const res = await getDetailAPI(id)
      // 第一个表单
      const { carInfoId, rechargeId, personName, phoneNumber, carNumber, carBrand } = res.data
      this.carInfoForm = { carInfoId, rechargeId, personName, phoneNumber, carNumber, carBrand }
      // 第二个表单
      const { cardStartDate, cardEndDate, paymentAmount, paymentMethod } = res.data
      this.feeForm.payTime = [cardStartDate, cardEndDate]
      this.feeForm.paymentAmount = paymentAmount
      this.feeForm.paymentMethod = paymentMethod
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
      .arrow{
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
    .preview{
      img{
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
