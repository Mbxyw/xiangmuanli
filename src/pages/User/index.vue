<template>
  <el-container>
    <el-aside class="myaside" width="200px">
      <div class="name">{{username}}<span style="cursor:pointer;" @click="logout">[退出]</span></div>
      <div class="title">
        <i class="el-icon-s-goods"></i>
        交易管理
      </div>
      <ul class="list">
        <router-link to="/user/cart" active-class="active"><li>购物车</li></router-link>
        <li>我的订单</li>
      </ul>
      <div class="title">
        <i class="el-icon-user-solid"></i>
        个人信息管理
      </div>
      <ul class="list">
        <router-link to="/user/Info"><li>个人中心</li></router-link>
      </ul>
    </el-aside>
    <el-main>
      <article>
        <router-view>
        </router-view>
      </article>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: 'User',
  computed: {
    username() {
      return localStorage.getItem('token')
    }
  },
  methods: {
    logout() {
      localStorage.removeItem('token')
      this.$router.push('/home')
      this.$router.go(0)
    }
  }
}
</script>

<style lang="less" scoped>
.myaside{
  margin-left: 20px;
  margin-top: 20px;
  height: 600px;
  background-color: rgb(199, 197, 197);
  .name {
      text-align: center;
      margin-top: 19px;
      margin-bottom: 43px;
  
      span {
        text-decoration: underline;
        color: #2a5df1;
      }
    }
  
    .title {
      margin-left: 25px;
      font-size: 16px;
      color: #333333;
      display: flex;
      align-items: center;
      margin-bottom: 14px;
    }
  
    .list {
      margin-right: 35px;
      li {
        margin-bottom: 17px;
        font-weight: 300;
        color: #666666;
        cursor: pointer;
      }
    }
}
</style>