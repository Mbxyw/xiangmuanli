<template>
  <div class="register">
    <el-form element-loading-text="注册中" element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)" :rules="rules" :model="ruleForm" class="loginContainer">
      <h3 class="loginTitle">注册账号</h3>
      <el-form-item label="用户名" prop="name">
        <el-input type="text" autocomplete="off" v-model="ruleForm.name" prefix-icon="el-icon-user-solid"
          placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input :type="flagType" autocomplete="off" v-model="ruleForm.pass" prefix-icon="el-icon-lock" placeholder="请输入密码" show-password>
        </el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" autocomplete="off" v-model="ruleForm.checkPass" prefix-icon="el-icon-lock"
            placeholder="请确认密码" show-password></el-input>
      </el-form-item>
      <el-button type="primary" style="width: 100%" @click="goLogin">注册</el-button>
    </el-form>
  </div>
</template>

<script>
import { mapState } from 'vuex';

  export default {
  name: 'Register',
  data() {
    var validatePass = (rules, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validatePass2("checkPass");
        }
        callback();
      }
    };

    var validatePass2 = (rules, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };

    return {
      activeName: "second",
      ruleForm: {
        name: "",
        pass: "",
        checkPass: "",
      },
      rules: {
        name: [
          { required: true, message: "请输入您的名称", trigger: "blur" },
          { min: 3, max: 10, message: "长度在 3 到 10个字符", trigger: "blur" },
        ],
        pass: [{ required: true, validator: validatePass, trigger: "blur" }],
        checkPass: [{ required: true, validator: validatePass2, trigger: "blur" },
        ],
      },
      flagType:'password',
    };
  },
  computed: {
    users() {
      return this.$store.state.loginStatus.users
    }
  },
  methods: {
    goLogin() {
      if (this.users) {
        if (this.ruleForm.name && this.ruleForm.pass && this.ruleForm.pass === this.ruleForm.checkPass) {
          let newuser = {}
          newuser.username = this.ruleForm.name
          newuser.password=this.ruleForm.pass
          if (this.users.findIndex(item => item.username === this.ruleForm.name) !== -1) {
            alert('用户名已存在')
            // console.log('有该用户')
          }
          else {
            this.$store.commit('loginStatus/ADDUSERS', newuser)
            // console.log(this.$store.state.loginStatus)
            alert('注册成功')
            setTimeout(() => {
              this.$router.push('Login')
            }, 500)
          }
      }
        
        }
      }
    }
  }
</script>

<style lang="less" scoped>
.register {

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