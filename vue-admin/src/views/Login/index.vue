<template>
  <div class="login_body">
    <div class="bg" />
    <div class="box">
      <div class="title">智慧园区-登录</div>
      <el-form ref="form" :model="loginForm" :rules="rules">
        <el-form-item label="账号" prop="username">
          <el-input v-model="loginForm.username" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="loginForm.password" />
        </el-form-item>
        <el-form-item prop="remember">
          <el-checkbox v-model="rememberMe">记住我</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="login_btn" @click="submit">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [{ required: true, message: '请输入账号', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      },
      rememberMe: true
    }
  },
  created() {
    const loginData = localStorage.getItem('form-key')
    if (loginData) {
      const { username, password } = JSON.parse(loginData)
      this.loginForm.username = username
      this.loginForm.password = password
    }
  },
  methods: {
    submit() {
      this.$refs.form.validate(async valid => {
        if (!valid) return false
        await this.$store.dispatch('user/loginActions', this.loginForm)
        if (this.rememberMe) {
          localStorage.setItem('form-key', JSON.stringify(this.loginForm))
        } else {
          localStorage.removeItem('form-key')
        }
        if (this.$route.query.redirect) {
          this.$router.push(this.$route.query.redirect)
        } else {
          this.$router.push('/')
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
.login_body {
  display: flex;
}
.bg {
  width: 60vw;
  height: 100vh;
  background: url('~@/assets/login-bg.svg') no-repeat;
  background-position: right top;
  background-size: cover;
}
.box {
  margin: 200px 10% 0;
  flex: 1;
  .title {
    padding-bottom: 76px;
    font-size: 26px;
    font-weight: 500;
    color: #1e2023;
  }
  ::v-deep() {
    .ant-form-item {
      display: flex;
      margin-bottom: 62px;
      flex-direction: column;
    }
    .ant-form-item-label label {
      font-size: 16px;
      color: #8b929d;
    }
    .ant-input,
    .ant-input-password {
      border-radius: 8px;
    }
  }
}
.login_btn {
  width: 100%;
}
</style>
