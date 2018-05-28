<template>
  <div class="goods-list layout">
    <div class="title">
      <p>围诚自营</p>
    </div>
    <ul class="clearfix">
      <li v-for="item in goods">
        <div>
          <div class="img-box tc">
            <!-- <img src="../assets/load.gif"> -->
            <img v-lazy="item.pic">
            <p class="name">{{ item.name }}</p>
            <p class="tip">{{ item.tip }}</p>
            <div class="price">
              <div class="operate clearfix">
                <router-link class="look fl" :to="{path:'/goods',query:{id : item.id}}">立即购买</router-link>
                <input type="button" class="join fl" value="随缘关注">
              </div>
              <p>
                <span>￥</span>{{ item.price }}
              </p>
            </div>

          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  import API from '../api/API'
  const api = new API();
  import { mapMutations, mapState } from 'vuex'
  export default {
      data() {
          return {
              goods: []
          }
      },
      created() {
          api.getSelfGoods().then((res) => {
              this.goods = JSON.parse(res.data).data;
          });
      },
      methods: {
       
      }
  }

</script>

<style>
  .goods-list {
    margin: 40px 0;
    border-radius: 20px;
    border: solid 1px #d4d4d4;
  }

  .goods-list .title {
    position: relative;
    height: 60px;
    border-radius: 20px 20px 0 0;
    line-height: 60px;
    text-align: left;
    border-bottom: solid 1px #d4d4d4;
    background: linear-gradient(#fbfbfb, #ececec);
    z-index: 10;
  }

  .goods-list .title p {
    font-size: 18px;
    color: #626262;

    font-weight: 400;
    text-indent: 40px;
  }

  .goods-list ul {
    position: relative;
    background: #fff;
    overflow: hidden;
  }

  .goods-list li {
    float: left;
    cursor: pointer;
    width: 50%;
    padding: 50px;
    text-align: center;
    transition: all .5s;
    transform: translateY(0px);
  }

  .goods-list li a {
    display: block;
  }

  .goods-list li:hover {
    transform: translateY(-5px);
    -webkit-box-shadow: 1px 1px 20px #333333;
    box-shadow: 0px 0px 11px #333333;
  }

  .goods-list li:hover .operate {
    visibility: visible;
  }

  .goods-list li:hover .price p{
    visibility: hidden;
  }
  .goods-list li img {
    width: 206px;
    height: 206px;
  }

  .goods-list .name {
    margin-top: 5px;
    color: #424242;
    font-size: 18px;
    font-weight: 400;
  }

  .goods-list .tip {
    margin-bottom: 40px;
    color: #d0d0d0;
    font-size: 14px;
  }

  .goods-list .price {
    position: relative;
    color: #e4393c;
    font-size: 20px;
    font-weight: bold;
  }

  .goods-list .price span {
    display: inline-block;
    margin-right: 10px;
    font-size: 16px;
  }

  .goods-list .operate {
    position: absolute;
    visibility: hidden;
    top: -20px;
    left: 100px;
    width: 270px;
    margin: 20px auto 0;
  }

  .goods-list .look {
    display: block;
    width: 130px;
    height: 30px;
    line-height: 30px;
    background: linear-gradient(180deg, #fff, #f9f9f9);
    border-radius: 5px;
    border: solid 1px #d4d4d4;
    font-size: 14px;
  }

  .goods-list .look:hover {
    background: #eee;
  }

  .goods-list .join {
    display: block;
    width: 130px;
    height: 30px;
    font-size: 14px;
    background: linear-gradient(180deg, #678ee7, #5078df);
    border-radius: 5px;
    border: solid 1px #d4d4d4;
    color: #fff;
    margin-left: 10px;
    cursor: pointer;
  }

  .goods-list .join:hover {
    background: #6c8cd4;
  }

</style>
