<template>
  <div class="shopcar-content layout">
    <div>
      <h2 class="title">购物车列表</h2>
      <el-table :data="tableData3" class="shopcar-table" ref="multipleTable" stripe border tooltip-effect="dark" style="width: 100%"
        @selection-change="handleSelectionChange">
        <!-- @select="handleSelectSingle(selection,row)" @select-all="handleSelectAll(selection)" -->
        <el-table-column type="selection" width="36" header-align="center">
        </el-table-column>
        <el-table-column label="商品ID" width="250" prop="productId" header-align="center">
        </el-table-column>
        <el-table-column label="商品名称" header-align="center">
          <template slot-scope="scope">
            <img :src="scope.row.productImg" class="productImg">
            <span class="rmb"></span>{{ scope.row.productName }}
          </template>
        </el-table-column>
        <el-table-column label="单价" width="120" header-align="center">
          <template slot-scope="scope">
            <span class="rmb">￥</span>
            {{ scope.row.salePrice }}
          </template>
        </el-table-column>
        <el-table-column prop="productCount" label="数量" width="160" header-align="center">
          <template slot-scope="scope">
            <el-input-number v-model="scope.row.productNum" controls-position="left" :min="1">
            </el-input-number>
          </template>
        </el-table-column>
        <el-table-column label="总价（元）" width="120" header-align="center">
          <template slot-scope="scope">
            <span class="rmb">￥</span>
            {{ scope.row.salePrice * scope.row.productNum }}
          </template>
        </el-table-column>
        <template slot="empty">
          当前未添加任何商品，赶紧去
          <router-link to="/sale" class="goto-sale">围诚三天</router-link>挑选吧！
        </template>

      </el-table>
      <p class="del" @click="delSelection()">删除所选商品</p>

      <div class="last">
        <div class="clearfix">
          <el-button type="primary" class="fr" @click="gotoPay" :loading="submitPayLoading">结算</el-button>
          <div class="fr total">总价：
            <span>￥{{ totalPrice }}</span>
          </div>
          <p class="fr kind">已选择
            <em>{{ multSelectionIndex.length }}</em>件商品</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    removeStore,
    getStore
  } from '../../utils/utils'
  export default {
    data() {
      return {
        submitPayLoading: false,
        num8: 1,
        tableData3: [],
        multipleSelection: [],
        multSelectionIndex: []
      }
    },
    mounted: function () {
      if (getStore('shopCar')) {
        var shopCarList = JSON.parse(getStore('shopCar'));
        this.tableData3 = shopCarList;
      }
    },
    computed: {
      totalPrice: function () {
        let total = 0;
        this.tableData3.forEach((value, index) => {
          total += value.productNum * value.salePrice;
        });
        return total.toFixed(2);
      }
    },
    methods: {
      delSelection() {
        if (this.multSelectionIndex.length != 0) {
          this.$confirm('即将删除所选商品, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            if (this.multSelectionIndex.length == this.tableData3.length) {
              this.tableData3 = [];
            } else {
              this.multSelectionIndex.forEach((value, index) => {
                // this.tableData3[value] = null;
                this.tableData3.forEach((v, i) => {
                  if (value == v.productId) {
                    this.tableData3.splice(i, 1);
                  }
                });
              });
            }
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          }).catch(() => {});
        } else {
          this.$message({
            type: 'error',
            message: '请选中所需删除的商品'
          });
        }
      },
      gotoPay: function () {
        if (this.multSelectionIndex.length != 0) {
          this.submitPayLoading = true;
          setTimeout(() => {
            this.submitPayLoading = false;
            // this.$router.push('/');
          }, 2000);
        } else {
          this.$message({
            type: 'info',
            message: '请勾选想要下单的商品'
          });
        }
      },
      handleSelectionChange(val) {
        let _this = this;
        this.multSelectionIndex = [];
        val.forEach((val, index) => {
          _this.tableData3.forEach((v, i) => {　　　　　　　 // id 是每一行的数据id
            if (val.productId == v.productId) {
              this.multSelectionIndex.push(v.productId);
              this.multSelectionIndex.sort();
            }
          });
        })
      }
    }
  }

</script>

<style lang="scss">
  .shopcar-content {
    margin: 40px auto;
    padding: 0 50px;
    .goto-sale {
      color: #09f;
    }
    .last {
      border: solid 1px #ededed;
      margin: 20px 0;
      background: #fff;
      button {
        display: block;
        width: 100px;
        height: 53px;
        background: #09f;
        border: 0;
        cursor: pointer;
        font-weight: "微软雅黑";
        text-align: center;
        color: #fff;
        font-size: 18px;
      }
      .total {
        line-height: 50px;
        margin: 0 50px 0 80px;
        color: #999;
        font-size: 16px;
        span {
          color: red;
          font-size: 22px;
        }
      }
      .kind {
        color: #999;
        font-size: 14px;
        line-height: 50px;
        margin-top: 3px;
        em {
          color: red;
        }
      }
    }
    .shopcar-table {
      .productImg {
        width: 40px;
        height: 40px;
        margin-right: 5px;
      }
      .cell {
        color: #333;
      }
      .el-input-number {
        width: 140px;
      }
    }
    .rmb {
      color: #808080;
    }
    .del {
      color: #09f;
      cursor: pointer;
      margin: 5px;
    }
    .title {
      font-family: "微软雅黑";
      color: #666;
      margin-bottom: 20px;
      border-left: solid 5px #09f;
      padding-left: 15px;
    }
  }

</style>
