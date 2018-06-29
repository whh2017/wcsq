<template>
  <div class="order-manage">
    <el-dialog title="编辑地址" :visible.sync="editDialogVisible" width="30%">
      <el-form ref="editform" :model="editForm" label-width="80px">
        <el-form-item label="姓名">
          <el-input v-model="editForm.name"></el-input>
        </el-form-item>
        <el-form-item label="手机号码">
          <el-input v-model="editForm.phone"></el-input>
        </el-form-item>
        <!-- :getBigAddress="getAddressFromSelect" -->
        <!-- <el-form-item label="收货地区">
                                    <address-select @get-data="getAddressFromSelect"></address-select>
                                </el-form-item> -->
        <el-form-item label="详细地址">
          <el-input type="textarea" v-model="editForm.address"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitEditAddress">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="添加地址" :visible.sync="addDialogVisible" width="30%">
      <el-form ref="addform" :model="addForm" label-width="80px">
        <el-form-item label="姓名">
          <el-input v-model="addForm.name"></el-input>
        </el-form-item>
        <el-form-item label="手机号码">
          <el-input v-model="addForm.phone"></el-input>
        </el-form-item>
        <!-- :getBigAddress="getAddressFromSelect" -->
        <el-form-item label="收货地区">
          <address-select @get-data="getAddressFromSelect" ref="selectchild"></address-select>
        </el-form-item>
        <el-form-item label="详细地址">
          <el-input type="textarea" v-model="addForm.address"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitAddress">确 定</el-button>
      </span>
    </el-dialog>
    <el-card class="box-card" shadow="hover" v-loading="Addressloading">
      <div slot="header" class="clearfix">
        <span>地址管理</span>
      </div>
      <div class="text">
        <ul class="clearfix">
          <li v-for="(item, index) in addressList" :key="index">
            <p>收货人：
              <span>{{item.name}}</span>
            </p>
            <p>手机号码：
              <span>{{item.phone}}</span>
            </p>
            <p>收货地址：
              <span>{{item.address}}</span>
            </p>
            <div class="operate clearfix">
              <div class="fl" @click="editAddress(index)">编辑</div>
              <div class="fr" @click="removeAddress(index)">删除</div>
            </div>
          </li>
          <li class="addAddress" @click="addAddress">
            <i class="el-icon-plus"></i>
          </li>
        </ul>
      </div>
    </el-card>
  </div>
</template>

<script>
  import API from '../api/API'
  import {
    mapState
  } from 'vuex'
  const api = new API();
  import addressSelect from '../components/addressSelect'
  export default {
    data() {
      return {
        selectedOptions: [],
        Addressloading: false,
        editForm: {
          id: null,
          mobile: '',
          name: '',
          phone: null,
          address: ''
        },
        addForm: {
          mobile: '',
          name: '',
          phone: null,
          address: ''
        },
        BigAddress: '',
        editDialogVisible: false,
        addDialogVisible: false,
        addressList: []
      }
    },
    computed: {
      ...mapState([
        'user'
      ])
    },
    components: {
      addressSelect
    },
    mounted: function () {
      this.Addressloading = true;
      api.getAddressList(this.user.mobile).then(res => {
        this.addressList = JSON.parse(res.data).data;
        this.Addressloading = false;
      });
    },
    methods: {
      editAddress: function (index) {
        this.editForm = this.addressList[index];
        this.editDialogVisible = true;
      },
      removeAddress: function (index) {
        this.$confirm('即将删除该条地址信息，是否继续？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let removeObject = {
            mobile: this.user.mobile,
            AddressId: this.addressList[index].addressId
          }
          api.removeAddress(removeObject).then(res => {
            if (JSON.parse(res.data).flag) {
              this.$message({
                message: '成功删除该条地址信息!',
                type: 'success'
              });
              this.Addressloading = true;
              this.editForm = {};
              api.getAddressList(this.user.mobile).then(res => {
                this.addressList = JSON.parse(res.data).data;
                this.Addressloading = false;
              });
            }
          });
        });
      },
      getAddressFromSelect: function (data) {
        this.BigAddress = data;
      },
      addAddress: function () {
        this.addDialogVisible = true;
      },
      submitEditAddress: function () {
        this.editDialogVisible = false;
        let submitAddress = Object.assign({}, this.editForm);
        this.editForm.mobile = this.user.mobile;
        console.log(this.editForm);
        api.editAddressList(submitAddress).then(res => {
          if (JSON.parse(res.data).flag) {
            this.$message({
              message: '成功修改收货地址!',
              type: 'success'
            });
            this.Addressloading = true;
            this.editForm = {};
            api.getAddressList(this.user.mobile).then(res => {
              this.addressList = JSON.parse(res.data).data;
              this.Addressloading = false;
            });
          }
        });
      },
      submitAddress: function () {
        this.addDialogVisible = false;
        let submitAddress = Object.assign({}, this.addForm);
        this.addForm.address = this.BigAddress + this.addForm.address;
        this.addForm.mobile = this.user.mobile;
        console.log(this.addForm.address);
        api.addAddressList(submitAddress).then(res => {
          if (JSON.parse(res.data).flag) {
            this.$message({
              message: '成功新增收货地址!',
              type: 'success'
            });
            this.Addressloading = true;
            this.addForm = {};
            api.getAddressList(this.user.mobile).then(res => {
              this.addressList = JSON.parse(res.data).data;
              this.Addressloading = false;
              this.$refs.selectchild.clearValue();
            });
          }
        });
      }
    }
  }

</script>

<style lang="scss">
  .order-manage {
    margin: 20px;
    .box-card {
      .text {
        li {
          position: relative;
          overflow: hidden;
          float: left;
          background: #fafafa;
          padding: 10px;
          margin-left: 30px;
          width: 280px;
          height: 150px;
          border: 1px dashed #d9d9d9;
          cursor: pointer;
          .operate {
            width: 100%;
            position: absolute;
            height: 25px;
            line-height: 25px;
            background: #fff;
            left: 0px;
            bottom: -25px;
            -webkit-transition: all .3s;
            -o-transition: all .3s;
            transition: all .3s;
            div {
              border-top: solid 1px #d9d9d9;
              text-align: center;
              width: 50%;
              &:hover {
                background: #f2f2f2;
              }
            }
            div.fl {
              border-right: solid 1px #d9d9d9;
            }
          }
          &:hover {
            background: #f2f2f2;
            .operate {
              bottom: 0px;
            }
          }
          p {
            line-height: 1.8;
            font-size: 15px;
            span {
              color: #09f;
            }
          }
          i {
            display: block;
            font-size: 32px;
            color: #8c939d;
            text-align: center;
            line-height: 130px;
          }
        }
        li:first-child {
          margin-left: 0;
        }
        .addAddress:hover {
          border: 1px dashed #09f;
          background: #fafafa;
        }
      }
    }
  }

</style>
