<template>
  <div class="footer-lump">
    <div class="layout">
      <ul class="clearfix">
        <li>
          <router-link to="/">围诚热点</router-link>
        </li>
        <li>
          <router-link to="/bbs">围诚论坛</router-link>
        </li>
        <li>
          <router-link to="/test">围诚二手</router-link>
        </li>
        <li>
          <router-link to="/test">我的围诚</router-link>
        </li>
      </ul>
      <div class="txt">
        <p>广告合作热线： 温先生 13660449184 麦先生 15999987056
          <br/> 网站运营
          <span>：</span>围诚社区
          <br/> 公司地址
          <span>：</span>广东省广州市黄埔区九龙镇广州商学院
          <br/> 版权所有：Copyright &copy; 2017-2020 物联科技有限公司</p>
        <div class="img-box">
          <img src="../assets/local/other.png">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {

  }

</script>

<style>
  .footer-lump {
    background: url(../assets/local/background.jpg) no-repeat;
  }

  .footer-lump ul {
    padding: 60px 0;
    height: 30px;
    border-bottom: solid 1px #666;
  }

  .footer-lump li {
    float: left;
    margin-right: 50px;
  }

  .footer-lump li a {
    display: block;
    padding-bottom: 10px;
    color: #FFF;
    font-family: "微软雅黑";
    font-size: 18px;
  }

  .footer-lump li a:hover {
    border-bottom: #00ABC0 solid 3px;
    color: #00abc0;
  }

  .footer-lump li.cur a {
    border-bottom: #00ABC0 solid 3px;
    color: #00abc0;
  }

  .footer-lump .txt {
    position: relative;
    margin-top: 30px;
    padding-bottom: 20px;
    line-height: 24px;
  }

  .footer-lump .img-box {
    position: absolute;
    right: 100px;
    bottom: 50px;
  }

  .footer-lump .img-box img {
    width: 144px;
    height: 44px;
  }

</style>
