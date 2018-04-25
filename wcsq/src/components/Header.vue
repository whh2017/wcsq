<template>
  <div class="wc-header">
    <div class="bg">
      <div class="user">
        <div class="box">
          <template v-if="this.$store.state.islogin">
            <el-dropdown class="message" placement="bottom-end">
              <span class="el-dropdown-link">
                <img src="../assets/local/mafeifei.jpg">
                <span>用户13660449184</span>
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown" class="user-drop">
                <el-dropdown-item>个人中心</el-dropdown-item>
                <el-dropdown-item>退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
          <template v-else>
            <el-dropdown class="message" placement="bottom-end">
              <span class="el-dropdown-link">
                <img src="../assets/local/init.jpg">
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown" class="user-drop">
                <el-dropdown-item><router-link to="/login">注册</router-link></el-dropdown-item>
                <el-dropdown-item><router-link to="/login">登录</router-link></el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </div>
      </div>
      <div class="layout clearfix">
        <div class="logo img-box fl">
          <img src="../assets/common/logo.png">
        </div>
        <el-menu :default-active="ActiveView" class="el-menu-demo fr" mode="horizontal" background-color="#c06d77" text-color="#fff"
          active-text-color="#ffe400">
          <el-menu-item index="1">
            <router-link to="/test">围诚社区</router-link>
          </el-menu-item>
          <el-menu-item index="2">
            <router-link to="/test">围诚Plus</router-link>
          </el-menu-item>
          <el-menu-item index="3">
            <router-link to="/test">围诚三天</router-link>
          </el-menu-item>
          <el-menu-item index="4">
            <router-link to="/test">我的围诚</router-link>
          </el-menu-item>
        </el-menu>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        ActiveView: '1'
      }
    }
  }

</script>
<style>
  .user-drop {
    top: 60px !important;
  }

  .user-drop li {
    padding: 0 30px;
    text-align: center;
  }

  .user-drop li a {
    display: block;
  }

  .wc-header .bg {
    position: relative;
    background: #c06d77;
  }

  .wc-header .user {
    position: absolute;
    padding-top: 20px;
    top: 0;
    bottom: 0;
    right: 10px;
  }

  .wc-header .box img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }

  .wc-header .box {
    cursor: pointer;
  }

  .message-lump a {
    display: block;
    color: #409EFF;
    font-size: 18px;
    text-align: center;
  }

  .wc-header .box span {
    color: #fff;
    margin-left: 5px;
  }

  .wc-header .logo {
    height: 80px;
    line-height: 80px;
  }

  .wc-header .el-menu--horizontal {
    border: 0;
  }

  .wc-header .el-menu--horizontal>.el-menu-item {
    height: 79px;
    line-height: 79px;
  }

  .wc-header .el-menu--horizontal>.el-menu-item a {
    font-size: 17px;
  }

  .wc-header .el-menu-demo {
    margin-right: 50px;
  }

</style>
