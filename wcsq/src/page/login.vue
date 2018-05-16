<template>
  <div class="login-enroll">
    <div class="backbanner">
      <ul>
        <li :class="{ active : cur === 0}">
          <img src="../assets/local/1.jpg">
        </li>
        <li :class="{ active : cur === 1}">
          <img src="../assets/local/2.jpg">
        </li>
        <li :class="{ active : cur === 2}">
          <img src="../assets/local/3.jpg">
        </li>
        <li :class="{ active : cur === 3}">
          <img src="../assets/local/4.jpg">
        </li>
        <li :class="{ active : cur === 4}">
          <img src="../assets/local/5.jpg">
        </li>
      </ul>
    </div>
    <transition name="el-fade-in-linear" mode="out-in">
      <div v-show="loginView">
        <div class="login-ui">
          <p class="title">用户登录</p>
          <el-form :rules="loginRules" :model="loginForm" ref="loginForm">
            <el-form-item prop="mobile">
              <div class="group">
                <el-input placeholder="请输入您的手机号" class="ipt" type="text" v-model="loginForm.mobile"></el-input>
                <i class="user"></i>
              </div>
            </el-form-item>
            <el-form-item prop="password">
              <div class="group">
                <el-input placeholder="请输入您的密码" class="ipt" type="password" v-model="loginForm.password"></el-input>
                <i class="password"></i>
              </div>
            </el-form-item>
          </el-form>
          <el-button type="primary" class="btn" :loading="isLoadingLogin" @click="submitLogin('loginForm')">登录</el-button>
          <div class="other">
            <p>还不是会员？请先
              <span v-on:click="toggleStatu">注册</span>
              <p/>
          </div>
        </div>
      </div>
    </transition>
    <transition name="el-fade-in-linear" mode="out-in">
      <div v-show="!loginView">
        <div class="login-ui">
          <p class="title">用户注册</p>
          <el-form :rules="enrollRules" :model="enrollForm" ref="enrollForm">
            <el-form-item prop="mobile">
              <div class="group">
                <el-input placeholder="请输入您的注册手机号" class="ipt" type="text" v-model="enrollForm.mobile"></el-input>
                <i class="user"></i>
              </div>
            </el-form-item>
            <el-form-item prop="code">
              <div class="group">
                <el-input placeholder="请输入图片验证码" class="ipt" type="text" v-model="otherForm.code"></el-input>
                <div class="box">
                  <img :src="arrUrl[random]" @click="random = parseInt(Math.random()*(arrUrl.length)+0)" :alt="arrCode[random]">
                </div>
                <i class="message"></i>
              </div>
            </el-form-item>
            <el-form-item prop="password">
              <div class="group">
                <el-input placeholder="请输入您的注册密码" class="ipt" type="password" v-model="enrollForm.password"></el-input>
                <i class="password"></i>
              </div>
            </el-form-item>
            <el-form-item>
              <div class="group">
                <el-input placeholder="请再次确认密码" class="ipt" type="password" v-model="otherForm.confirm"></el-input>
                <i class="password"></i>
              </div>
            </el-form-item>
          </el-form>
          <el-button type="primary" class="btn" :loading="isLoadingEnroll" @click="submitEnroll('enrollForm')">注册</el-button>
          <div class="other">
            <p>还不是会员？请先
              <span v-on:click="toggleStatu">登录</span>
              <p/>
          </div>

        </div>
      </div>
    </transition>

  </div>
</template>

<script>
  import API from '../api/API'
  import {
    setStore
  } from '../utils/utils'
  const api = new API()
  export default {
    created: function () {
      this.random = parseInt(Math.random() * (this.arrUrl.length) + 0);

      setInterval(() => {
        this.cur++;
        if (this.cur === 4) {
          this.cur = 0;
          return;
        }
      }, 4000);
    },
    data() {
      var validateUser = (rule, value, callback) => {
        if (!(/^1[34578]\d{9}$/.test(value))) {
          return callback(new Error('请输入合法的手机格式！'));
        } else {
          callback();
        }
      };

      var validatePass = (rule, value, callback) => {
        if (!(/^[A-Za-z0-9]{5,10}$/.test(value))) {
          return callback(new Error('只能输入由5-10位字母或者数字组成的密码'));
        } else {
          callback();
        }
      };
      return {
        cur: 0,
        isLoadingLogin: false,
        isLoadingEnroll: false,
        loginView: true,
        arrUrl: ['../../static/code/code1.jpg', '../../static/code/code2.jpg', '../../static/code/code3.jpg',
          '../../static/code/code4.jpg', '../../static/code/code5.jpg', '../../static/code/code6.jpg',
          '../../static/code/code7.jpg', '../../static/code/code8.jpg'
        ],
        arrCode: ['bubw', 'mauw', '4wj4', '17en', 'ayur', 'jb75', '7hpn', 'wvq3'],
        random: null,
        loginForm: {
          mobile: '13660449184',
          password: '123456'
        },
        loginRules: {
          mobile: [{
            required: true,
            message: '请输入账号',
            trigger: 'blur'
          }, {
            validator: validateUser,
            trigger: 'blur'
          }],
          password: [{
              required: true,
              message: '请输入密码',
              trigger: 'blur'
            },
            {
              validator: validatePass,
              trigger: 'blur'
            }
          ]
        },
        enrollForm: {
          mobile: '13660449184',
          password: '123456'
        },
        otherForm: {
          code: '',
          confirm: ''
        },
        enrollRules: {
          mobile: [{
            required: true,
            message: '请输入账号',
            trigger: 'blur'
          }, {
            validator: validateUser,
            trigger: 'blur'
          }],
          password: [{
              required: true,
              message: '请输入密码',
              trigger: 'blur'
            },
            {
              validator: validatePass,
              trigger: 'blur'
            }
          ]
        }
      }
    },
    methods: {
      toggleStatu: function () {
        this.loginView = !this.loginView
      },
      submitEnroll: function (formname) {
        var that = this;
        this.$refs[formname].validate((valid) => {
          if (valid) {
            if (that.otherForm.code === that.arrCode[that.random]) {
              if (that.otherForm.confirm === that.enrollForm.password) {
                that.isLoadingEnroll = true;
                let EnrollForm = Object.assign({}, that.enrollForm);
                api.checkEnroll(EnrollForm).then((res) => {
                  if (JSON.parse(res.data).enableEnroll) {
                    that.$message({
                      message: '注册成功!',
                      type: 'success'
                    });
                    that.$store.state.islogin = true;
                    that.isLoadingEnroll = false;
                    setStore('data', JSON.stringify(EnrollForm));
                    that.$router.push({ path: '/'});
                  }else {
                     that.$message({
                      message: '该手机号码已被注册!',
                      type: 'error'
                    });
                  }
                }).catch((err) => {
                  consoloe.log(err);
                })
              } else {
                that.$message({
                  message: '两次输入密码不匹配，请重新输入！',
                  type: 'error'
                });
              }

            } else {
              that.$message({
                message: '图片验证码输入错误，或换张图片吧。',
                type: 'error'
              });
            }
          }
        })
      },
      submitLogin: function (formname) {
        var that = this;
        this.$refs[formname].validate((valid) => {
          if (valid) {
            that.isLoadingLogin = true;
            let LoginForm = Object.assign({}, that.loginForm);
            api.checkLogin(LoginForm).then((res) => {
              if (JSON.parse(res.data).enableLogin) {
                that.$message({
                  message: '登录成功!',
                  type: 'success'
                });
                that.$store.commit('hasLogin');
                that.isLoadingLogin = false;
                setStore('data', JSON.stringify(LoginForm));
                that.$router.push({ path: '/'});
              }
            })
          }
        })
      }
    }
  }

</script>

<style>
  .login-enroll .backbanner {
    display: block;
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: -999;
    overflow: hidden;
  }

  .login-enroll .backbanner ul {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .login-enroll .backbanner li img {
    display: block;
    width: 100%;
    height: 100%;
  }

  .login-enroll .backbanner li {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    -webkit-transition: all 1s linear;
    -o-transition: all 1s linear;
    transition: all 1s linear;
  }

  .login-enroll .backbanner li.active {
    opacity: 1;
  }

  .login-ui {
    position: fixed;
    top: 50%;
    left: 50%;
    width: 360px;
    padding: 20px;
    transform: translate(-50%, -50%);
    -webkit-transform: translate(-50%, -50%);
    text-align: center;
    border-radius: 10px;
  }

  .login-ui .title {
    font-size: 30px;
    color: #fff;
    margin-bottom: 30px;
  }

  .login-ui .group {
    position: relative;
  }

  .login-ui .group i {
    position: absolute;
    left: 10px;
    top: 6px;
    width: 35px;
    height: 35px;
  }

  .login-ui .group i.user {
    background: url(../assets/icons/user.png);
    background-size: cover;
  }

  .login-ui .group i.password {
    background: url(../assets/icons/password.png);
    background-size: cover;
  }

  .login-ui .group i.message {
    background: url(../assets/icons/message.png);
    background-size: cover;
  }

  .login-ui .group .box {
    position: absolute;
    right: 13px;
    top: 2px;
    cursor: pointer;
  }

  .login-ui .group .box img {
    width: 72px;
    height: 27px;
  }

  .login-ui .ipt input {
    text-indent: 35px;
    height: 48px;
    font-size: 18px;
    border-radius: 10px;
  }

  .login-ui .btn {
    display: block;
    width: 100%;
    margin-top: 30px;
  }

  .login-ui .other {
    text-align: left;
    margin-top: 10px;
    color: #fff;
    font-size: 15px;
  }

  .login-ui .other span {
    margin-left: 5px;
    color: #ff6600;
    cursor: pointer;
  }

  .el-fade-in-linear-enter-active,
  .el-fade-in-linear-leave-active {
    transition: all .3s;
  }

  .el-fade-in-linear-enter,
  .el-fade-in-linear-leave-to
  /* .fade-leave-active below version 2.1.8 */

    {
    opacity: 0;
  }

</style>
