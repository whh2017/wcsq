<template>
  <div class="wc-header">
    <div class="go-top">
      <el-button type="warning" icon="el-icon-arrow-up" circle size="medium" @click="gotop"></el-button>
    </div>
    <div class="bg">
      <div class="user">
        <div class="box">
          <template v-if="islogin">
            <el-dropdown class="message" placement="bottom-end">
              <span class="el-dropdown-link">
                <img :src="user.head_src">
                <template v-if=" user.name === null">
                  <span>用户
                    <em>{{ user.mobile }}</em>
                  </span>
                </template>
                <template v-else>
                  <span>{{ user.name }}</span>
                </template>
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown" class="user-drop">
                <el-dropdown-item>
                  <p @click="clearLogin">退出登录</p>
                </el-dropdown-item>
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
                <el-dropdown-item>
                  <router-link to="/login">注册/登录</router-link>
                </el-dropdown-item>
                <!-- <el-dropdown-item><router-link to="/login">登录</router-link></el-dropdown-item> -->
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </div>
      </div>
      <div class="layout clearfix">
        <div class="logo img-box fl">
          <img src="../assets/common/logo.png">
        </div>
        <el-menu router :default-active="$route.path" class="el-menu-demo fr" mode="horizontal" background-color="#c06d77" text-color="#fff"
          active-text-color="#ffe400">
          <el-menu-item index="/">
            围诚社区
          </el-menu-item>
          <el-menu-item index="/bbs">
            围诚Plus
          </el-menu-item>
          <el-menu-item index="/sale">
            围诚三天
          </el-menu-item>
          <el-menu-item index="/center">
            我的围诚
          </el-menu-item>
        </el-menu>
      </div>
    </div>
  </div>
</template>
<script>
  import {
    removeStore,
    getStore
  } from '../utils/utils'
  import {
    mapState
  } from 'vuex'
  import API from '../api/API'
  const api = new API();
  export default {
    data() {
      return {

      }
    },
    computed: {
      ...mapState([
        'user', 'islogin'
      ])
    },
    created: function () {
      // 判定是否有用户缓存
      if (getStore('data')) {
        var UserForm = JSON.parse(getStore('data'));
        api.checkLogin(UserForm).then((res) => {
          var data = JSON.parse(res.data);
          if (data.enableLogin) {
            if (!this.$store.state.hasNotify) {
              this.$notify({
                title: '当前提示',
                message: '已登录',
                type: 'success',
                position: 'bottom-right'
              });
              this.$store.commit('hasLogin');
              this.$store.state.user = data.user;
              this.$store.state.hasNotify = true;
            }
          }
        })
      }
      Math.easeout = function (A, B, rate, callback) {
        if (A == B || typeof A != 'number') {
          return;
        }
        B = B || 0;
        rate = rate || 2;
        var step = function () {
          A = A + (B - A) / rate;
          if (A < 1) {
            callback(B, true);
            return;
          }
          callback(A, false);
          requestAnimationFrame(step);
        };
        step();
      };
    },
    methods: {
      clearLogin: function () {
        this.$confirm('即将退出登录（需重新登录），是否继续？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          removeStore('data');
          window.location.reload();
        });
      },
      gotop: function () {
        var doc = document.body.scrollTop ? document.body : document.documentElement;
        Math.easeout(doc.scrollTop, 0, 4, function (value) {
          doc.scrollTop = value;
        });
      }
      // changeView: function(data) {
      //   this.$store.state.ActiveView = data;
      // }
    }
  }

</script>
<style lang="scss">
  @mixin button {
    font-size: 20px;
  }

  @mixin rounded-corners {
    -moz-border-radius: 5px;
    -webkit-border-radius: 5px;
    border-radius: 5px;
  }

  notice {
    background-color: green;
    border: 2px solid #00aa00;
    @include rounded-corners;
  }

  article a {
    color: blue;
    &:hover {
      color: red
    }
  }

  .go-top {
    position: fixed;
    right: 40px;
    bottom: 200px;
    z-index: 999;
  }

  /* .user-drop {
    top: 60px !important;
    li {
        padding: 0 30px;
        color: #fff;
        text-align: center;
    }
  } */

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

  .wc-header li a {
    display: block;
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
  } // .wc-header .box span {
  //   color: #fff;
  //   margin-left: 5px;
  // }
  .wc-header .box {
    span {
      color: #fff;
      margin-left: 5px;
    }
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
