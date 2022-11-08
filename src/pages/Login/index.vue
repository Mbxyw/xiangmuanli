<template>
  <div class="login">
    <el-form v-loading="loading" element-loading-text="正在登录" element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)" :rules="loginRules" :model="loginForm" class="loginContainer">
      <h3 class="loginTitle">用户登录</h3>
      <el-form-item prop="username">
        <el-input type="text" v-model="loginForm.username" placeholder="请输入用户名" auto-complete="false"
          prefix-icon="el-icon-user">
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password" v-model="loginForm.password" placeholder="请输入用户密码" auto-complete="false"
          prefix-icon="el-icon-lock" show-password>
        </el-input>
      </el-form-item>
      <el-checkbox v-model="checked" class="loginRemeber" style="display:block;margin-left: 40%;">记住我</el-checkbox>
      <a @click="goRegister">无账号？点击注册</a>
      <el-button type="primary" style="width: 100%;margin-top:10px;" @click="Login">登录</el-button>
    </el-form>
  </div>
</template>
<script>
import {mapMutations, mapState} from 'vuex'
export default {
  name: 'Login',
  data() {
    return {
      visible: false,
      loginForm: {
        username: 'admin',
        password: '123456',
        code: ''
      },
      loading: false,
      // 记住我
      checked: true,
      loginRules: {
        username: [{
          required: true,
          message: '请输入用户名',
          trigger: 'blur'
        }],
        password: [{
          required: true,
          message: '请输入密码',
          trigger: 'blur'
        }],
      }
    }
  },
  computed: {
    ...mapState({
      isLogined: state => state.loginStatus.isLogined
    }),
    userInfo() {
      return this.$store.state.loginStatus.users
    }
  },
  methods: {
    Login() {
      // console.log(this.userInfo)
      if (this.userInfo) {
        let rel = false
        this.userInfo.map(item => {
          if (this.loginForm.username == item.username &&
            this.loginForm.password == item.password)
          {
            rel = true
            return 
          }
        })
        if (rel) {
          localStorage.setItem("token", this.loginForm.username)
          alert('登陆成功')
          // console.log(this.$store)
          this.$store.commit('loginStatus/CHANGEISLOGINED', true)
          window.location.reload()
          this.$router.push('home')
        } else {
          alert('账号或密码输入错误')
          this.loginForm.password=''
        }
      }
      
      
    },
    goRegister() {
      this.$router.push('Register')
    }
  }
}
</script>

<style lang="less" scoped>
.login {

  .loginContainer {
    border-radius: 15px;
    background-clip: padding-box;
    margin: 60px auto;
    width: 350px;
    padding: 15px 35px 15px 35px;
    background-color: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
  }

  .loginTitle {
    margin: 0px auto 40px auto;
    text-align: center;
  }

  .loginRemeber {
    text-align: left;
    margin: 0px 0px 15px 0px;
  }

  .el-form-item__content {
    display: flex;
    align-items: content;
  }
}
</style>