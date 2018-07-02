<template>
  <div class="sale-detail layout">
    <div class="clearfix">
      <div class="img-box fl">
        <ul>
          <li :key="index" v-for="(item, index) in goods.imgList" :class="{ cur: activeIndex == index }" @click="choose(index)">
            <img v-lazy="item.pic">
          </li>
        </ul>
      </div>
      <div class="big-img fl">
        <img :src="curImg">
      </div>
      <div class="content fl">
        <h2>{{goods.name}}</h2>
        <p>此仅为测试支付商品
          <span>¥
            <em>{{goods.price}}</em>
          </span>
        </p>
        <div class="count">
          <label>数量：</label>
          <el-input-number size="medium" :min="1" v-model="count" :max="99"></el-input-number>
        </div>
        <div class="pay">
          <!-- {{ caculationTotal }} -->
          <el-button type="primary" icon="el-icon-share" @click="startPay" :loading="payDialogLoading">发起支付</el-button>
        </div>
      </div>
    </div>
    <el-dialog title="订单详情" :visible.sync="selectAddressDialogVisible" width="60%" class="selectAddressDialog" :close-on-click-modal="false">
      <el-card shadow="always" class="order-card">
        <div slot="header" class="clearfix">
          <span>购物清单</span>
        </div>
        <div class="order-list clearfix">
          <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="product_name" label="商品信息" width="180">
            </el-table-column>
            <el-table-column prop="product_count" label="数量" width="180">
            </el-table-column>
            <el-table-column prop="product_price" label="单价（单位：元）">
            </el-table-column>
            <el-table-column prop="product_total" label="总计（单位：元）">
            </el-table-column>
          </el-table>
        </div>
      </el-card>
      <el-card shadow="always" class="address-card">
        <div slot="header" class="clearfix">
          <span>选择地址</span>
          <router-link class="fr" to="/center">前往个人中心添加地址</router-link>
        </div>
        <div class="address-list clearfix">
          <div v-for="(item, index) in addressList" :key="index" class="item fl">
            <el-radio v-model="radio" :label="++index">
              <span>收货人：
                <em>{{item.name}}</em>
              </span>
              <span>手机号码：
                <em>{{item.phone}}</em>
              </span>
              <span>收货地址：
                <em>{{item.address}}</em>
              </span>
            </el-radio>
          </div>
        </div>
      </el-card>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" :loading="hasSelectLoading" @click="confirmOrder">支付
          <span class="total">{{ tableData[0].product_total }}</span>元</el-button>
      </span>
    </el-dialog>
    <el-dialog title="支付窗口" :visible.sync="payDialogVisible" width="30%" class="payDialog" :close-on-click-modal="false">
      <span>请扫码支付，支付后点击“已支付”按钮</span>
      <div class="box tc">
        <img src="../assets/icons/code.jpg">
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="hadPay" :loading="hasPayLoading">已支付</el-button>
      </span>
    </el-dialog>
    <el-dialog title="支付结果" :visible.sync="paySuccessDialogVisible" width="30%" class="paySuccessDialog" :close-on-click-modal="false">
      <div class="box tc">
        <img src="../assets/icons/success.png">
        <span class="result">支付成功！</span>
        <p>请在订单中心查看你所购买的商品</p>
        <router-link to="/center">
          <el-button type="success">立即前往订单中心</el-button>
        </router-link>
      </div>
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
        tableData: [{
          product_name: '',
          product_count: null,
          product_price: null,
          product_total: null
        }],
        radio: null,
        hasSelectLoading: false,
        selectAddressDialogVisible: false,
        paySuccessDialogVisible: false,
        hasPayLoading: false,
        payDialogLoading: false,
        payDialogVisible: false,
        count: 0,
        goods_id: null,
        goods: {
          imgList: [],
          name: '',
          price: null
        },
        activeIndex: 0,
        total: null,
        curImg: null,
        addressList: []
      }
    },
    mounted: function () {
      let id = this.$route.query.id;
      this.goods_id = id;
      api.getGoodDetail(this.goods_id).then(res => {
        // console.log(res.data);
        console.log("加载成功 " + this.goods_id);
        this.goods = JSON.parse(res.data);
        this.curImg = this.goods.imgList[0].pic;
      });
      this.radio = 1;
    },
    methods: {
      choose: function (index) {
        this.activeIndex = index;
        this.curImg = this.goods.imgList[index].pic;
      },
      startPay: function () {
        if (this.islogin) {
          api.getAddressList(this.user.mobile).then(res => {
            this.addressList = JSON.parse(res.data).data;
          });
          this.payDialogLoading = true;
          setTimeout(() => {
            if (this.hadAddLoc) {
              this.tableData[0].product_name = this.goods.name;
              this.tableData[0].product_count = this.count;
              this.tableData[0].product_price = this.goods.price;
              this.tableData[0].product_total = this.tableData[0].product_count * this.tableData[0].product_price;
              this.selectAddressDialogVisible = true;
              this.payDialogLoading = false;
            } else {
              this.payDialogLoading = false;
              this.$message({
                message: '请先添加收货地址!（可在我的围诚-订单中心添加地址）',
                type: 'info'
              });
            }
          }, 1000)
        } else {
          // this.$message({
          //   message: '请先登录！',
          //   type: 'info'
          // });
          // this.$router.push({ path: '/login'});
          this.$router.push({ path:'/login' , query:{ redirect: this.$route.fullPath} })
        }
      },
      hadPay: function () {
        this.hasPayLoading = true;
        setTimeout(() => {
          this.hasPayLoading = false;
          this.payDialogVisible = false;
          this.paySuccessDialogVisible = true;
        }, 1000);
      },
      confirmOrder: function () {
        this.hasSelectLoading = true;
        setTimeout(() => {
          this.hasSelectLoading = false;
          this.payDialogVisible = true;
          this.selectAddressDialogVisible = false;
          this.paySuccessDialogVisible = false;
        }, 1000);
      }
    },
    computed: {
      ...mapState([
        'hadAddLoc', 'user', 'islogin'
      ]),
      caculationTotal: function () {
        return this.total = this.count * this.goods.price;
      }
    }
  }

</script>

<style lang="scss">
  .dialog-footer {
    .total {
      margin: 0 1px;
    }
  }

  .address-card {
    margin-top: 40px;
  }

  .address-list {
    .el-radio {
      width: 100%;
    }
    .item {
      margin-bottom: 10px;
      .long {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }

  .selectAddressDialog {
    a {
      color: #09f;
    }
  }

  .sale-detail {
    padding: 60px 40px;
    background: #fff;
    border-radius: 10px;
    margin: 40px auto;
    border: solid 1px #dfdfdf;
    .paySuccessDialog {
      .result {
        margin-left: 10px;
        font-size: 18px;
        color: green;
        font-weight: bold;
      }
      p {
        margin: 20px 0;
        font-size: 24px;
        color: #ff6600;
        padding-bottom: 20px;
      }
    }
    .payDialog {
      img {
        width: 350px;
        height: 350px;
      }
    }
    .img-box {
      margin-right: 20px;
      ul {
        padding: 0 20px;
        li {
          margin-bottom: 20px;
          padding: 10px;
          border: solid 3px #fff;
          border-radius: 5px;
          cursor: pointer;
          img {
            width: 54px;
            height: 54px;
          }
          &.cur {
            border: solid 3px #dfdfdf;
          }
        }
      }
    }
    .big-img {
      margin-right: 40px;
      img {
        width: 440px;
        height: 440px;
        border-radius: 5px;
      }
    }
    .content {
      width: 430px;
      margin-top: 10px;
      .pay {
        padding: 0 20px;
        margin-top: 30px;
        button {
          width: 145px;
          height: 50px;
          font-size: 20px;
        }
      }
      .count {
        margin-top: 10px;
        padding: 10px;
        padding-bottom: 25px;
        border-bottom: solid 1px #dfdfdf;
        label {
          margin-right: 30px;
        }
      }
      h2 {
        font-size: 24px;
        line-height: 1.25;
        color: #000;
        margin-bottom: 10px;
      }
      p {
        color: #bdbdbd;
        line-height: 45px;
        border-bottom: solid 1px #dfdfdf;
        span {
          float: right;
          margin-right: 20px;
          font-weight: bold;
          color: #d44d44;
          em {
            font-size: 24px;
          }
        }
      }
    }
  }

</style>
