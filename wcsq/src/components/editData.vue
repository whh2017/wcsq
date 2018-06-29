<template>
  <div class="list-content">
    <div class="tt">
      <p>编辑资料</p>
    </div>
    <div class="txt" v-loading="userFormLoading">
      <!-- <div class="img-box">
        <img src="../assets/local/mafeifei.jpg">
      </div> -->
      <div class="first clearfix">
        <div class="head fl">
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <img v-else src="../assets/local/init.jpg" class="init">
          <el-upload :data="userUpload" ref="upload" class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false"
            :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload" :on-error="handleAvatarError">
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过2MB</div>
            <el-button size="mini">上传头像
              <i class="el-icon-upload el-icon--right"></i>
            </el-button>
          </el-upload>
        </div>
        <div class="message fl">
          <ul class="clearfix">
            <li>
              <label>昵称：</label>
              <span>{{userForm.username}}</span>
            </li>
            <li>
              <label>学校：</label>
              <span>{{userForm.school}}</span>
            </li>
            <li>
              <label>性别：</label>
              <span>{{userForm.sex}}</span>
            </li>
            <li>
              <label>专业：</label>
              <span>{{userForm.major}}</span>
            </li>
            <li>
              <label>年龄：</label>
              <span>{{userForm.age}}岁</span>
            </li>
            <li>
              <label>地区：</label>
              <span>{{userForm.location}}</span>
            </li>
            <li>
              <label>积分：</label>
              <span>{{userForm.integration}}</span>
            </li>
            <li>
              <label>等级：</label>
              <span>{{userForm.rank}}</span>
            </li>
          </ul>
        </div>
      </div>

      <div class="second clearfix">
        <el-form label-width="80px" class="edit fl" :model="editUserForm" ref="editUserForm">
          <el-form-item label="昵称">
            <el-input size="small" placeholder="请输入昵称...." v-model="editUserForm.username" maxlength="12"></el-input>
          </el-form-item>
          <el-form-item label="学校">
            <el-input size="small" placeholder="请输入学校...." v-model="editUserForm.school" maxlength="12"></el-input>
          </el-form-item>
          <el-form-item label="性别">
            <el-select size="small" v-model="editUserForm.sex" placeholder="请选择">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="专业">
            <el-input size="small" placeholder="请输入专业...." v-model="editUserForm.major" maxlength="12"></el-input>
          </el-form-item>
          <el-form-item label="年龄">
            <el-input-number v-model="editUserForm.age" controls-position="right" :min="15" :max="30"></el-input-number>
          </el-form-item>
          <el-form-item label="居住地">
            <el-input size="small" placeholder="请输入居住地...." v-model="editUserForm.location" maxlength="12"></el-input>
          </el-form-item>
        </el-form>
        <div class="fl">
          <el-button type="primary" class="submit" plain @click="submitUser('editUserForm')">提交信息</el-button>
        </div>
      </div>

      <div class="third clearfix">
        <el-form label-width="130px" class="user-pd fl" :model="passwordForm" :rules="passwordFormRules" ref="passwordForm">
          <el-form-item label="请输入原密码" prop="originpd">
            <el-input size="small" type="password" v-model="passwordForm.originpd"></el-input>
          </el-form-item>
          <el-form-item label="请输入新密码" prop="newpd">
            <el-input size="small" type="password" v-model="passwordForm.newpd"></el-input>
          </el-form-item>
          <el-form-item label="请重新確認密碼" prop="confirmpd">
            <el-input size="small" type="password" v-model="passwordForm.confirmpd"></el-input>
          </el-form-item>
        </el-form>
        <div class="fl">
          <el-button type="primary" class="submit" plain @click="changePassword('passwordForm')">更改密码</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import API from '../api/API'
  const api = new API();
  import {
    mapState
  } from 'vuex'
  export default {
    created: function () {
      this.userFormLoading = true;
      api.getUser(this.user.mobile).then(res => {
        this.userForm = JSON.parse(res.data).user;
        this.editUserForm = this.userForm;
        this.userFormLoading = false;
      });
    },
    data() {
      var validatePassword = (rule, value, callback) => {
        api.isCorrect(this.passwordForm.originpd).then(res => {
          if (JSON.parse(res.data).flag) {
            callback();
          } else {
            return callback(new Error('原密码验证不匹配请重新输入。'));
          }
        });
      };

      var validateConfirmPassword = (rule, value, callback) => {
        if (value === this.passwordForm.newpd) {
          callback();
        } else {
          return callback(new Error('两次密码输入不一致!'));
        }
      };

      return {
        userFormLoading: true,
        passwordForm: {
          phone: null,
          originpd: '',
          newpd: '',
          confirmpd: ''
        },
        passwordFormRules: {
          originpd: [{
            required: true,
            message: '请输入原密码',
            trigger: 'blur'
          }, {
            validator: validatePassword,
            trigger: 'blur'
          }],
          newpd: [{
            required: true,
            message: '请输入新密码',
            trigger: 'blur'
          }],
          confirmpd: [{
            required: true,
            message: '请重新输入密码',
            trigger: 'blur'
          }, {
            validator: validateConfirmPassword,
            trigger: 'blur'
          }]
        },
        userForm: {
          phone: null,
          username: '',
          sex: '',
          age: null,
          integration: null,
          school: '',
          majot: '',
          location: '',
          rank: ''
        },
        editUserForm: {
          phone: null,
          username: '',
          sex: '',
          age: '',
          integration: null,
          school: '',
          majot: '',
          location: '',
          rank: ''
        },
        imageUrl: '',
        userUpload: {
          phone: ''
        },
        options: [{
          value: '男',
          label: '男'
        }, {
          value: '女',
          label: '女'
        }],
        value: ''
      }
    },
    computed: {
      ...mapState([
        'user', 'islogin'
      ])
    },
    mounted: function () {
      this.userUpload.phone = this.user.mobile;
      this.userForm.phone = this.user.mobile;
      this.passwordForm.phone = this.user.mobile;
    },
    methods: {
      changePassword: function (formname) {
        this.$refs[formname].validate((valid) => {
          if (valid) {
            api.submitPassword(this.passwordForm).then((res) => {
              if (JSON.parse(res.data).flag) {
                this.$message({
                  message: '当前修改密码成功!',
                  type: 'success'
                });
              }
            });
          }
        });
      },
      submitUser: function (formname) {
        api.submitUserForm(this.editUserForm).then((res) => {
          if (JSON.parse(res.data).flag) {
            this.$message({
              message: '当前更改个人信息成功!',
              type: 'success'
            });
            this.userFormLoading = true;
            //模拟延迟加载当前内容
           
              api.getUser(this.user.mobile).then((res) => {
                this.userForm = JSON.parse(res.data).user;
                this.editUserForm = this.userForm;
                this.userFormLoading = false;
              });
            

          }
        });
      },
      handleAvatarError: function (res, file) {
        this.$message({
          message: '头像上传失败！请重新选择头像或刷新页面',
          type: 'error'
        });
      },
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
        this.$message({
          message: '头像上传成功！',
          type: 'success'
        });
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message({
            message: '上传头像图片只能是 JPG 格式!',
            type: 'error'
          });
        }
        if (!isLt2M) {
          this.$message({
            message: '上传头像图片大小不能超过 2MB!',
            type: 'error'
          });
        }
        return isJPG && isLt2M;
      }
    }
  }

</script>

<style>
  .list-content .user-pd {
    width: 750px;
  }

  .list-content .edit {
    width: 750px;
  }

  .list-content .submit {
    margin-top: 10px;
    width: 120px;
    height: 120px;
    font-size: 20px;
  }

  .list-content .second .el-form-item {
    float: left;
    width: 35%;
    margin-right: 40px;
    margin-bottom: 10px;
  }

  .list-content .third {
    margin-top: 10px;
    padding-bottom: 20px;
    border-bottom: solid 1px #dfdfdf;
  }

  .list-content .third .el-form-item {
    width: 300px;
    margin-right: 40px;
    margin-bottom: 15px;
  }

  .list-content .head {
    margin-left: 20px;
  }

  .list-content .first {
    padding-bottom: 20px;
    border-bottom: solid 1px #dfdfdf;
  }

  .list-content .second {
    margin-top: 20px;
    padding-bottom: 20px;
    border-bottom: solid 1px #dfdfdf;
  }

  .list-content .message li {
    float: left;
    width: 300px;
    height: 40px;
    margin-right: 40px;
    margin-bottom: 6px;
  }

  .list-content .message li:first-child {
    margin-left: 0;
  }

  .list-content .message ul {
    width: 700px;
  }

  .list-content .message {
    margin: 5px 0 0 100px;
  }

  .list-content .message li label {
    font-size: 18px;
    color: #666;
  }

  .list-content .message li span {
    margin-left: 5px;
    font-size: 20px;
    color: #a1c4fd;
  }

  .avatar-uploader .el-upload__tip {
    width: 110px;
    margin: 7px auto 0;
  }

  .avatar-uploader .el-upload {
    display: block;
    margin: 0 auto;
  }

  .avatar-uploader .el-button {
    width: 100px;
    margin-top: 10px;
  }

  .avatar-uploader .init {
    width: 120px;
    height: 120px;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }

  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }

  .list-content .tt p {
    padding-bottom: 10px;
    font-size: 20px;
    text-align: center;
    border-bottom: solid 1px #dfdfdf;
    color: #09f;
  }

  .list-content {
    padding-top: 10px;
    height: 800px;
    overflow: auto;
  }

  .list-content .txt {
    padding: 20px;
  }

  .list-content .txt img {
    width: 120px;
    height: 120px;
  }

</style>
