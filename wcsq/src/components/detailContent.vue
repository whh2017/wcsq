<template>
  <div class="sale-detail layout">
    <div class="clearfix">


      <div class="img-box fl">
        <ul>
          <li v-for="(item, index) in goods.imgList" :class="{ cur: activeIndex == index }" @click="choose(index)">
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
          <el-button type="primary" icon="el-icon-check">发起支付</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import API from '../api/API'
const api = new API();
  export default {
    data() {
      return {
          count: 0,
          goods_id: null,
          goods: {
            imgList: [],
            name: '',
            price: null
          },
          activeIndex: 0,
          total: null,
          curImg: null
      }
    },
    mounted: function() {
        let id = this.$route.query.id;
        this.goods_id = id;
        api.getGoodDetail(this.goods_id).then((res) => {
          this.goods = JSON.parse(res.data);
          this.curImg = this.goods.imgList[0].pic;
        });
    },
    methods: {
       choose: function(index) {
         this.activeIndex = index;
         this.curImg = this.goods.imgList[index].pic;
       }
    },
    computed: {
      caculationTotal: function() {
        return  this.total = this.count * this.goods.price;
      }
    }
  }

</script>

<style lang="scss">
  .sale-detail {
    padding: 60px 40px;
    background: #fff;
    border-radius: 10px;
    margin: 40px auto;
    border: solid 1px #dfdfdf;
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
