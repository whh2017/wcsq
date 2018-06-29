<template>
  <div class="wc-sale layout">
    <h2 class="tt">Plus主发布
      <span>(本平台不提供线上支付，仅提供Plus主发布物品转让信息，可租可借，但平台不提供交易，只提供交易时间、交易地点和提醒功能，发布的信息三天内有效。)</span>
    </h2>
    <div class="content">
      <ul class="clearfix">
        <li v-for="(item, index) in GoodsList" :id="item.id" :key="index">
          <div class="box">
            <img v-lazy="item.src">
            <div class="box-content">
              <h3 class="title">{{ item.title }}</h3>
              <span class="post">{{ item.username }}</span>
              <p class="description">
                <span>交易地点：{{ item.loc }}</span>
                <br>
                <span>发布时间：{{ item.time }}</span>
              </p>
              <router-link :to="{ path: item.link, query:{id: item.id}}">
                <el-button type="success" plain icon="el-icon-search">查看详情</el-button>
              </router-link>
            </div>
          </div>
        </li>
      </ul>
      <!-- <el-button icon="el-icon-plus" class="getmore" :loading="goodsLoading" @click="getMore">刷新并加载更多</el-button> -->
    </div>
    <div class="report">
      <el-button type="primary" icon="el-icon-edit" @click="reportGoods">发起物品转让</el-button>
    </div>
   <self-support></self-support>


  </div>
</template>

<script>
  import selfSupport from '../components/selfSupport.vue'
  import API from '../api/API'
  const api = new API();
  export default {
    components: {
      selfSupport
    },
    data() {
      return {
        GoodsList: [],
        goodsLoading: false
      }
    },
    created: function () {
      api.getGoods().then((res) => {
        this.GoodsList = JSON.parse(res.data).data;
      })

    },
    methods: {
      reportGoods: function () {
        this.$message({
          showClose: true,
          message: '发布功能已在Plus模块开发，故不重复',
          type: 'warning'
        });
      },
      getMore: function () {
        this.goodsLoading = true;
        setTimeout(() => {
          api.getGoods().then((res) => {
            this.goodsLoading = false;
            let addList = [];
            addList = JSON.parse(res.data).data;
            this.GoodsList = this.GoodsList.concat(addList);
          })
        }, 1500);

      }

    }
  }

</script>

<style>
  .wc-sale .getmore.el-button {
    display: block;
    margin: 10px auto;
  }

  .wc-sale .report {
    position: fixed;
    right: 20px;
    top: 300px;
    z-index: 15;
  }

  .wc-sale h2.tt {
    margin-top: 30px;
    font-size: 20px;
    color: #333;
    padding-left: 10px;
    border-left: solid 5px green;
  }

  .wc-sale h2.tt span {
    margin-left: 5px;
    font-size: 15px;
    color: #c74039;
  }

  .wc-sale .content {
    padding: 20px;
    margin-top: 50px;
  }

  .wc-sale .content ul {
    padding: 0 15px;
  }

  .wc-sale .content li {
    float: left;
    margin: 0 30px 20px 0;
  }

  .wc-sale .content li:nth-child(2n) {
    margin-top: 20px;
  }

  .wc-sale .content li a {
    display: block;
  }

  .wc-sale .box {
    width: 250px;
    text-align: center;
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
    overflow: hidden;
    position: relative;
    cursor: pointer;
  }

  .wc-sale .box:before,
  .wc-sale .box:after {
    content: "";
    display: block;
    background: rgba(0, 0, 0, 0.3);
    position: absolute;
    top: 10%;
    left: 7%;
    bottom: 10%;
    right: 7%;
    z-index: 1;
    transform: scale(0, 1);
    transition: all 0.3s;
  }

  .wc-sale .box:after {
    top: 10.8%;
    bottom: 10.8%;
    transform: scale(1, 0);
  }

  .wc-sale .box:hover:before,
  .wc-sale .box:hover:after {
    transform: scale(1);
    animation: animate 1.5s;
  }

  .wc-sale .box:hover:before {
    border-top: 3px solid #fff;
    border-bottom: 3px solid #fff;
  }

  .wc-sale .box:hover:after {
    border-left: 3px solid #fff;
    border-right: 3px solid #fff;
  }

  .wc-sale .box img {
    width: 100%;
    height: 400px;
    transition: all 0.3s;
  }

  .wc-sale .box:hover img {
    transform: scale(1.2);
    filter: blur(5px);
    -moz-filter: blur(5px);
    -webkit-filter: blur(5px);
  }

  .wc-sale .box .box-content {
    padding: 30px 10px;
    position: absolute;
    top: 10%;
    left: 7%;
    bottom: 10%;
    right: 7%;
    opacity: 0;
    z-index: 2;
    transition: all 0.3s;
  }

  .wc-sale .box:hover .box-content {
    opacity: 1;
  }

  .wc-sale .box .title {
    font-size: 24px;
    font-weight: 600;
    color: #88c425;
    margin: 0 0 5px 0;
  }

  .wc-sale .box .post {
    display: block;
    margin: 0 0 5px 0;
    font-size: 14px;
    font-style: italic;
    color: rgba(255, 255, 255, 0.5);
  }

  .wc-sale .box .description {
    font-size: 14px;
    color: #fff;
    margin: 0 0 20px 0;
  }

  .wc-sale .box .icon {
    padding: 0;
    margin: 0;
    list-style: none;
  }

  .wc-sale .box .icon li {
    display: inline-block;
    margin: 0 10px 0 0;
  }

  .wc-sale .box .icon li a {
    display: block;
    width: 30px;
    height: 30px;
    line-height: 30px;
    color: #fff;
    background: #88c425;
    transition: all 0.5s;
  }

  .wc-sale .box .icon a:hover {
    text-decoration: none;
    border-radius: 50%;
    animation: animate-hover 0.5s;
  }

  @keyframes animate {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 1;
    }
  }

  @keyframes animate-hover {
    0% {
      box-shadow: 0 0 0 10px rgba(255, 255, 255, 0.3);
    }
    50% {
      box-shadow: 0 0 0 5px rgba(255, 255, 255, 0.3);
    }
    100% {
      box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.3);
    }
  }

</style>
