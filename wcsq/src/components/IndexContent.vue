<template>
  <div class="wc-index layout">
    <div class="clearfix">
      <el-carousel height="350px" class="banner fl" indicator-position="outside">
        <el-carousel-item v-for="item in banners" :key="item.src" name="SJB">
          <router-link :to="item.href">
            <img :src="item.src">
          </router-link>
        </el-carousel-item>
      </el-carousel>
      <div class="focus fl">
        <h2>今日推荐</h2>
        <ul>
          <li v-for="item in focusGroups">
            <router-link :to="item.href">{{ item.title }}</router-link>
          </li>
        </ul>
      </div>
    </div>
    <div class="news-item layout">
      <div class="clearfix">
        <div class="left-navgation fl">
          <h2>Plus热帖排行
            <router-link to="/test">更多>></router-link>
          </h2>
          <ul>
            <li class="clearfix" v-for="(item ,index) in plusGroups">
              <em class="fl">{{ ++index }}</em>
              <router-link :to="item.href" class="fl">{{ item.title }}</router-link>
            </li>
          </ul>
          <div class="friendly-link">
            <h2>友情链接</h2>
            <div class="clearfix">
              <a href="#">腾讯校招</a>
              <a href="#">华为校招</a>
              <a href="#">网易校招</a>
              <a href="#">广州商学院官网</a>
              <a href="#">华南师范大学官网</a>
              <a href="#">华南农业大学官网</a>
              <a href="#">华南理工大学官网</a>
              <a href="#">农工商职业学院官网</a>
              <a href="#">广州大学华软软件学院官网</a>
              <a href="#">广州财经大学华商学院官网</a>
            </div>
          </div>

        </div>
        <ul class="list fl">
          <li>
            <router-link to="/test">
              <p class="txt" href="#">抱着娃去上学！广西＂大叔＂毕业5年后重读本科</p>
              <div class="clearfix">
                <div class="img-box">
                  <a>
                    <img src="../assets/local/new/1.jpg">
                  </a>
                </div>
                <div class="img-box">
                  <a>
                    <img src="../assets/local/new/2.jpg">
                  </a>
                </div>
                <div class="img-box">
                  <a>
                    <img src="../assets/local/new/3.jpg">
                  </a>
                </div>
              </div>
              <div class="clearfix">
                <p class="fl">作者：
                  <span>小华华</span>
                </p>
                <p class="update fr">1小时前</p>
              </div>
            </router-link>
          </li>
        </ul>
        <div class="right-navigation fl">
          <h2>活动推广</h2>
          <ul class="tuiguang">
            <li class="cur">
              <router-link to="/test">
                <img src="../assets/local/ad/1.jpg">
                <div class="txt-mask">
                  <p>「教育无边界」
                    <br>
                    <span>立即查看！</span>
                  </p>
                </div>
              </router-link>
            </li>
          </ul>
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
        banners: [{
            src: "../../static/banner/new1.jpg",
            href: '/test'
          },
          {
            src: "../../static/banner/new2.jpg",
            href: '/test'
          },
          {
            src: "../../static/banner/new3.jpg",
            href: '/test'
          },
          {
            src: "../../static/banner/new4.jpg",
            href: '/test'
          }
        ],
        focusGroups: [{
            title: '农村籍大学生成劳动力市场上的"弱势群体"？',
            href: '/test'
          },
          {
            title: '新学年约1500名内地生赴香港入读公立大学。',
            href: '/test'
          }, {
            title: '开学日不统一 大学学期变短是不是质量"缩水"了。',
            href: '/test'
          }, {
            title: '台湾开学日 95%以上的大学生半工半读缴学费。',
            href: '/test'
          },
        ],
        plusGroups: []
      }
    },
    created: function() {
        api.getPlus().then((res) => {
            this.plusGroups = JSON.parse(res.data).data;
        });
    }
  }

</script>

<style>
  .wc-index {
    margin-top: 20px;
    border-top: solid 3px #f27532;
    padding: 20px 0;
  }

  .wc-index .banner {
    width: 800px;
  }

  .wc-index .banner img {
    width: 800px;
    height: 350px;
  }

  .wc-index .banner a {
    display: block;
  }

  .wc-index .focus {
    padding: 10px 30px;
    width: 390px;
    height: 350px;
    background: #f8f8f8;
  }

  .wc-index .focus h2 {
    margin-bottom: 15px;
    color: #0f9e59;
    font-size: 20px;
  }

  .wc-index .focus li {
    padding: 8px 0;
    border-top: solid 1px #bfbfbf;
  }

  .wc-index .focus li:first-child {
    border-top: 0;
  }

  .wc-index .focus li a {
    display: block;
    font-size: 18px;
    color: #666;
    font-weight: bold;
  }

  .wc-index .focus li a:hover {
    color: red;
  }


  .news-item {
    margin: 10px auto;
  }

  .news-item .list {
    width: 650px;
  }

  .news-item .list li {
    width: 620px;
    padding: 15px 10px;
  }

  .news-item .list li:hover {
    background: #f8f8f8;
  }

  .news-item .list li p {
    margin: 0 8px;
    font-size: 12px;
    color: #bbb;
  }

  .news-item .list li p.update {
    margin-right: 20px;
  }

  .news-item .list .txt {
    height: 45px;
    line-height: 45px;
    color: #404040;
    font-size: 20px;
    font-weight: bold;
  }
  
  .news-item .list a {
      display: block;
  }
  .news-item .list .txt:hover {
    color: #ff6600;
  }

  .news-item .list .img-box {
    position: relative;
    float: left;
    width: 180px;
    height: 120px;
    margin: 5px 16px 10px 0;
    overflow: hidden;
  }

  .news-item .list .img-box img {
    position: absolute;
    width: 100%;
    height: 120px;
    -webkit-transition: all .8s;
    -o-transition: all .8s;
    transition: all .8s;
    overflow: hidden;
  }

  .news-item .list .img-box img:hover {
    -webkit-transform: scale(1.2);
    -ms-transform: scale(1.2);
    transform: scale(1.2);
  }

  .left-navgation {
    background: #f8f8f8;
    padding: 20px;
    margin-right: 20px;
  }

  .left-navgation h2,
  .right-navigation h2 {
    position: relative;
    height: 25px;
    line-height: 25px;
    padding-left: 10px;
    border-left: solid 5px green;
    font-size: 18px;
    color: #000;
  }

  .left-navgation h2 a {
    position: absolute;
    right: -10px;
    bottom: -5px;
    color: #589bab;
    font-size: 12px;
    float: right;
  }

  .left-navgation h2 a:hover {
    color: #ff6600;
  }

  .left-navgation ul {
    margin-top: 15px;
    border-top: solid 1px #dfdfdf;
  }

  .left-navgation li {
    padding: 30px 5px 5px 5px;
    margin-bottom: 5px;
  }

  .left-navgation li em {
    margin-right: 20px;
    color: #0f9e59;
    font-size: 22px;
    font-family: "Georgia";
  }

  .left-navgation li a {
    display: block;
    width: 150px;
    color: #666;
    font-size: 14px;
  }

  .left-navgation li a:hover {
    color: #f33;
  }

  .right-navigation {
    width: 275px;
  }

  .right-navigation ul {
    margin-top: 30px;
  }

  .right-navigation li {
    position: relative;
    width: 260px;
    margin-bottom: 30px;
  }

  .right-navigation li a {
    display: block;
  }

  .right-navigation li a:hover .txt-mask {
    opacity: .95;
    height: 100%;
  }

  .right-navigation li img {
    width: 260px;
    height: 150px;
  }

  .txt-mask {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 0%;
    background: #409EFF;
    opacity: 0;
    transition: all .3s;
  }

  .txt-mask p {
    padding: 10px 0;
    margin: 30px 20px 0 20px;
    font-size: 24px;
    color: #fff;
    text-align: center;
    border-top: solid 1px #fff;
    border-bottom: solid 1px #fff;
    font-weight: bold;
  }

  .txt-mask span {
    font-size: 14px;
    color: #fff;
  }

  .friendly-link {
    margin-top: 40px;
    width: 200px;
  }

  .friendly-link h2 {
    margin-bottom: 10px;
  }

  .friendly-link a {
    float: left;
    display: block;
    margin: 5px 3px;
    color: #09f;
    font-size: 14px;
    text-align: center;
  }

  .friendly-link a:hover {
    opacity: .7;
    filter: Alpha(opacity=70);
  }

</style>
