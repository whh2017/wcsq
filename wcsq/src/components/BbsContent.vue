<template>
  <div class="wc-bbs">
    <div class="layout clearfix">
      <div class="left fl">
        <div class="top clearfix">
          <div class="fl">
            <el-select v-model="value" placeholder="请选择" class="sort">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div class="fr">
            <el-button plain icon="el-icon-edit" type="info" class="report" @click="publishNew">发表新主题</el-button>
          </div>
        </div>
        <ul class="content">
          <li class="clearfix" v-for="(item , index) in plusGroups" :key="index">
            <div class="icon fl">
              <img v-lazy="item.head_src">
            </div>
            <div class="fl">
              <div class="clearfix tt">
                <span class="kind fl">{{ item.kinds }}</span>
                <router-link class="title fl" :to="{ path: item.href, query:{id: item.id}}">{{ item.title }}</router-link>
              </div>
              <div class="txt">
                <p>
                  <span class="w">{{ item.name }}</span>&nbsp;发表于：
                  <span class="time">{{ item.start }}</span>&nbsp;最新回复：
                  <span class="new">{{ item.end }}</span>
                </p>
              </div>
            </div>
            <div class="fr mt-10 mr-10">
              <span class="comment">{{ item.comments }}</span>
            </div>
          </li>
        </ul>

        <ul class="pagination-lump clearfix">
          <li class="first" v-on:click="changePage(1)">
            <p>首页</p>
          </li>
          <li class="prev" v-on:click="changePage(--curPage)">
            <p>上一页</p>
          </li>
          <li class="next" v-on:click="changePage(++curPage)">
            <p>下一页</p>
          </li>
          <li>
            <input type="text" class="ipt" placeholder="请输入页数" maxlength="2" v-model="searchPage" onkeyup="this.value=this.value.replace(/\D/g,'')"
              onafterpaste="this.value=this.value.replace(/\D/g,'')">
          </li>
          <li>
            <p class="search" v-on:click="changePage(searchPage)">搜索</p>
          </li>
          <!-- <li class="last"><p>返回上个状态</p></li> -->
        </ul>
        <p class="cur-page tc">当前页数为第
          <span>{{ curPage }}</span>页</p>
      </div>
      <div class="right fl tc">
        <img src="../assets/local/no.jpg">
        <img src="../assets/local/no.jpg">
      </div>
    </div>

    <!-- 发表帖子弹窗 -->
    <el-dialog title="发布Plus" class="publish-plus" :visible.sync="publishPlusDialogVisible">
      <el-form ref="publishForm" :model="publishForm" label-width="100px" :rules="publishRules">
        <el-form-item label="帖子分类" prop="kinds">
          <el-select v-model="publishForm.kinds" placeholder="请选择活动区域">
            <el-option label="谈天说地" value="ttsd"></el-option>
            <el-option label="活动发布" value="hdfb"></el-option>
            <el-option label="BUG反馈" value="bugfk"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="帖子标题" prop="title">
          <el-input v-model="publishForm.title"></el-input>
        </el-form-item>
        <el-form-item label="帖子内容" prop="content">
          <el-input type="textarea" v-model="publishForm.content"></el-input>
        </el-form-item>
        <el-form-item label="是否上传图片">
          <el-switch v-model="uploadImg"></el-switch>
        </el-form-item>
        <transition name="el-fade-in-linear">
          <el-form-item label="上传图片" class="upload-img" v-show="uploadImg">
            <el-upload :data="publishContent" ref="upload" :auto-upload="false" action="https://jsonplaceholder.typicode.com/posts/"
              list-type="picture-card" :on-preview="handlePictureCardPreview" :on-change="uploadChange" :on-remove="uploadRemove"
              :on-success="uploadSuccess">
              <i class="el-icon-plus"></i>
            </el-upload>
          </el-form-item>
        </transition>
        <el-button type="primary" class="submit-upload" @click="submitUpload('publishForm')">发布Plus
          <i class="el-icon-upload"></i>
        </el-button>
      </el-form>
    </el-dialog>
    <el-dialog :visible.sync="uploadVisible">
      <img width="400" height="400" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>
  import API from '../api/API'
  const api = new API();
  import {
    mapState
  } from 'vuex'
  export default {
    data() {
      return {
        publishRules: {
          kinds: [{
            required: true,
            message: '请选择帖子主题',
            trigger: 'blur'
          }],
          title: [{
            required: true,
            message: '请输入帖子标题',
            trigger: 'blur'
          }],
          content: [{
            required: true,
            message: '请输入帖子内容',
            trigger: 'blur'
          }]
        },
        publishForm: {
          kinds: '',
          title: '',
          content: '',
          hasImg: false
        },
        uploadImg: false,
        publishPlusDialogVisible: false,
        dialogImageUrl: '',
        uploadVisible: false,
        publishContent: {
          phone: null
        },
        options: [{
          value: 'new',
          label: '最新主题'
        }, {
          value: 'hot',
          label: '最热评论'
        }],
        value: 'new',
        plusGroups: [],
        curPage: 1,
        searchPage: 1,
        page: 1
      }
    },
    created: function () {
      // api.getBbsPlus().then((res) => {
      //   this.plusGroups = JSON.parse(res.data).data;
      // });
      api.getPlusByPage(1).then(res => {
        this.plusGroups = JSON.parse(res.data).data;
      }).catch((error) => {

      });
    },
    computed: {
      ...mapState([
        'user', 'islogin'
      ])
    },
    methods: {
      publishNew: function () {
        if (this.islogin) {
          this.publishPlusDialogVisible = true;
        } else {
          this.$message({
            message: '请先登录！',
            type: 'warning'
          });
        }
      },
      uploadChange: function (file, fileList) {
        var isRepeat;
        if (fileList.length >= 2) {
          fileList.forEach((item, index) => {
            if (index < fileList.length - 1) {
              if (item.name == file.name) {
                fileList.pop();
                this.$message({
                  message: '请不要重复添加相同图片哦!',
                  type: 'warning'
                });
              }
            }
          });
        }
        if (fileList.length > 0) {
          this.publishForm.hasImg = true;
        } else {
          this.publishForm.hasImg = false;
        }
      },
      uploadRemove: function (file, fileList) {
        if (fileList.length == 0) {
          this.publishForm.hasImg = false;
        }
      },
      uploadSuccess: function (response, file, fileList) {
        this.$message({
          message: '发布Plus动态成功!',
          type: 'success'
        });
        this.publishPlusDialogVisible = false;
      },
      handlePictureCardPreview: function (file) {
        this.dialogImageUrl = file.url;
        this.uploadVisible = true;
      },
      submitUpload: function (formname) {
        this.$refs[formname].validate((valid) => {
          if (valid) {
            this.publishContent.phone = this.user.mobile;
            this.publishContent = Object.assign({}, this.publishContent, this.publishForm);
            if (this.uploadImg) {
              if (this.publishForm.hasImg) {
                this.$refs.upload.submit();
              } else {
                this.$message({
                  message: '请先添加图片!',
                  type: 'info'
                });
              }
            } else {
              api.publishPlus(this.publishContent).then((res) => {
                if (JSON.parse(res.data).flag) {
                  this.$message({
                    message: '发布Plus动态成功!',
                    type: 'success'
                  });
                  this.publishPlusDialogVisible = false;
                  api.getPlusByPage(1).then((res) => {
                    this.plusGroups = JSON.parse(res.data).data;
                  }).catch((error) => {

                  });
                }
              });
            }
          }
        })
      },
      changePage: function (page) {
        if (page <= 0) {
          page = 1;
        }
        this.curPage = page;
        this.searchPage = page;
        api.getPlusByPage(page).then((res) => {
          this.plusGroups = JSON.parse(res.data).data;
          this.$message({
            message: '成功刷新当前页面!',
            type: 'success'
          });
        }).catch((error) => {

        });
      }
    }
  }

</script>

<style>
  .publish-plus .el-dialog__body {
    padding: 15px 20px;
  }

  .submit-upload.el-button {
    display: block;
    width: 140px;
    margin: 10px auto 0;
  }

  .submit-upload.el-button span {
    font-size: 18px;
  }

  .upload-img .el-upload--picture-card {
    width: 100px;
    height: 100px;
    line-height: 100px;
  }

  .upload-img .el-upload-list--picture-card .el-upload-list__item {
    width: 100px;
    height: 100px;
  }

  .publish-plus .el-dialog {
    width: 500px;
  }

  .publish-plus .el-input__inner {
    width: 300px;
  }

  .publish-plus {}

  .wc-bbs {
    background: #f1f4f9;
  }

  .wc-bbs .right {
    margin: 40px 20px;
    padding: 20px;
    width: 500px;
    height: 800px;
    background: #dfdfdf;
    font-size: 36px;
    color: #bfbfbf;
  }

  .wc-bbs .right img {
    width: 450px;
    margin-top: 40px;
  }

  .wc-bbs .left {
    width: 650px;
    padding: 10px;
    margin: 40px 0;
    background: #fff;
  }

  .wc-bbs .left .sort {
    width: 110px;
  }

  .wc-bbs .left .sort .el-input__inner {
    background: #e7edf3;
    color: #667d99;
    border: 0;
  }

  .wc-bbs .left .sort:hover .el-input__inner {
    background: #c2e9fb;
    -webkit-transition: all .5s;
    -o-transition: all .5s;
    transition: all .5s;
  }

  .wc-bbs .left .report {
    border: 0;
    background: #e7edf3;
    color: #667d99;
  }

  .wc-bbs .left .report:hover {
    background: #c2e9fb;
    -webkit-transition: all .5s;
    -o-transition: all .5s;
    transition: all .5s;
  }

  .wc-bbs .top {
    padding-bottom: 10px;
  }

  .wc-bbs .content li {
    padding: 15px 0;
    border-top: solid 1px #dfdfdf;
  }

  .wc-bbs .content {
    padding: 10px;
    background: #fff;
  }

  .wc-bbs .content li {
    padding: 15px 0;
    border-top: solid 1px #dfdfdf;
  }

  .wc-bbs .content .icon {
    margin-right: 15px;
  }

  .wc-bbs .content .icon a {
    display: block;
  }

  .wc-bbs .content .icon img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }

  .wc-bbs .content .tt span {
    padding: 2px 5px;
    font-size: 14px;
    margin-right: 10px;
    border-radius: 0.3em;
  }

  .wc-bbs .content .tt span.kind {
    background: #09c;
    color: #FFF;
  }

  .wc-bbs .content .tt span.nor {
    border: solid 1px #c4c4c4;
    color: #666;
  }

  .wc-bbs .content .tt a {
    font-weight: bold;
    color: #09c;
    line-height: 25px;
  }

  .wc-bbs .content .tt a:hover {
    color: #ff6600;
  }

  .wc-bbs .content .txt p {
    margin-top: 6px;
    color: #b2b2b2;
    font-size: 12px;
  }

  .wc-bbs .comment {
    padding: 3px 7px;
    background: #969cb1;
    color: #fff;
    border-radius: 10px;
    font-size: 12px;
  }

  .light {
    background-image: -webkit-linear-gradient(left, #147B96, #E6D205 25%, #147B96 50%, #E6D205 75%, #147B96);
    -webkit-text-fill-color: transparent;
    -webkit-background-clip: text;
    -webkit-background-size: 200% 100%;
    -webkit-animation: masked-animation 4s infinite linear;
  }

  @-webkit-keyframes masked-animation {
    0% {
      background-position: 0 0;
    }
    100% {
      background-position: -100% 0;
    }
  }

  @keyframes masked-animation {
    0% {
      background-position: 0 0;
    }
    100% {
      background-position: -100% 0;
    }
  }

  .pagination-lump {
    width: 400px;
    margin: 30px auto 0;
  }

  .pagination-lump li {
    float: left;
    margin-right: 5px;
    margin-bottom: 5px;
  }

  .pagination-lump li p {
    padding: 0 10px;
    height: 30px;
    line-height: 30px;
    border: solid 1px #dfdfdf;
    text-align: center;
    cursor: pointer;
    color: #666;
  }

  /*.pagination-lump li.cur p{ color: #fff; background: #30cfd0;}*/

  .pagination-lump li p:hover {
    color: #fff;
    background: #30cfd0;
    -webkit-transition: all .3s;
    -o-transition: all .3s;
    transition: all .3s;
  }

  /*.pagination-lump li:nth-last-child(3){ background: #ff6600;}*/

  .pagination-lump .ipt {
    display: block;
    width: 100px;
    height: 30px;
    border: solid 1px #dfdfdf;
    padding-left: 5px;
  }

  .cur-page span {
    color: red;
  }

</style>
