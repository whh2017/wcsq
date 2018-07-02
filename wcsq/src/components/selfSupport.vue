<template>
  <div class="goods-list layout">
    <div class="title">
      <p>围诚自营</p>
    </div>
    <ul class="clearfix">
      <li v-for="(item, index) in goods" :key="index">
        <div>
          <div class="img-box tc">
            <!-- <img src="../assets/load.gif"> -->
            <img v-lazy="item.pic">
            <p class="name">{{ item.name }}</p>
            <p class="tip">{{ item.tip }}</p>
            <div class="price">
              <div class="operate clearfix">
                <router-link class="look fl" :to="{path:'/goods',query:{id : item.id}}">查看详情</router-link>
                <input type="button" class="join fl" value="加入购物车" @click="joinShopCar(item,$event)">
              </div>
              <p>
                <span>￥</span>{{ item.price }}
              </p>
            </div>
          </div>
        </div>
      </li>
    </ul>
    <div id="ttt" class="d-target"></div>
  </div>
</template>

<script>
  import API from '../api/API'
  const api = new API();
  import {
    mapMutations,
    mapState
  } from 'vuex'
  export default {
    data() {
      return {
        goods: []
      }
    },
    mounted() {
      /* add elements */
      function addElements(CLASSNAME_OUTER, CLASSNAME_INNER) {}
      /* 获取终止点的相对于窗口的坐标 */
      function getEndCoordinate(ele) {}
      /* 获取outer下myshow属性为hide的第一个元素 */
      function getElementMyShowHide(parentElement, CLASSNAME_SHOW_NONE) {}
      // 真实中的购物车实现是这里的click事件绑在添加购物车的按钮或者类似按钮的dom上
      window.addEventListener('click', function(event) {});
      CLASSNAME_OUTER = 'outer';
      CLASSNAME_INNER = 'inner';
      // 增加小球元素
      outerWrapper = this.addElements(CLASSNAME_OUTER, CLASSNAME_INNER);
      endLeft = this.getEndCoordinate(document.getElementById('ttt'))[0];
      endTop = this.getEndCoordinate(document.getElementById('ttt'))[1];
      api.getSelfGoods().then((res) => {
        this.goods = JSON.parse(res.data).data;
      });
    },
    computed: {
      ...mapState([
        'user', 'islogin'
      ])
    },
    methods: {
      ...mapMutations([
        'addThings', 'bb'
      ]),
      _addThing: function(id, price, name, pic) {
        this.addThings({
          productId: id,
          salePrice: price,
          productName: name,
          productImg: pic
        });
      },
      addElements: function(CLASSNAME_OUTER, CLASSNAME_INNER) {
        var outerWrapper = document.createElement('div');
        var outer = null;
        var inner = null;
        for (var i = 0; i < 5; i++) {
          outer = document.createElement('div');
          outer.classList.add(CLASSNAME_OUTER);
          outer.classList.add('point-pre');
          // outer.setAttribute('class', CLASSNAME_OUTER+" point-pre");
          // outer.setAttribute('myshow', 'hide');
          inner = document.createElement('div');
          inner.setAttribute('class', CLASSNAME_INNER);
          outer.appendChild(inner);
          outerWrapper.appendChild(outer);
          inner = null;
          outer = null;
        }
        document.body.appendChild(outerWrapper);
        return outerWrapper;
      },
      getEndCoordinate: function(ele) {
        var left = ele.offsetLeft;
        var top = ele.offsetTop;
        return [left, top];
      },
      getElementMyShowHide: function(parentElement, CLASSNAME_SHOW_NONE) {
        var result = null;
        var childElements = parentElement.getElementsByClassName(CLASSNAME_SHOW_NONE);
        result = childElements[0];
        return result;
      },
      joinShopCar: function(item, event) {
        if (this.islogin) {
          this._addThing(item.id, item.price, item.name, item.pic);
          // 当双击的时候,小球会从(0,0)的位置落入目标区,以下为当双击的时候,只会第一次点击的setTimeout会被清除
          // 所以只会显示一次从点击地点到目标区的运动
          // 但是依然会执行第一次的逻辑,因为内部两个setTimeout没有被清除
          var that = this;
          clearTimeout(timer);
          var timer = setTimeout(function() {
            var left = event.pageX;
            var top = event.pageY;
            // 定位球元素
            var childElement = that.getElementMyShowHide(outerWrapper, 'point-pre');
            childElement.style.left = left + 'px';
            childElement.style.top = top + 'px';
            // 计算坐标差
            var leftDifference = -(left - endLeft);
            var topDifference = -(top - endTop) + window.scrollY;
            // 开始
            childElement.classList.remove('point-pre');
            setTimeout(function() {
              childElement.getElementsByClassName('inner')[0].style.transform =
                `translateY(${topDifference}px)`;
              childElement.getElementsByClassName('inner')[0].style.backgroundImage = "url(" + item.pic + ")";
              childElement.style.transform = `translateX(${leftDifference}px)`;
              setTimeout(function() {
                childElement.getElementsByClassName('inner')[0].setAttribute('style', '');
                childElement.setAttribute('style', '');
                childElement.classList.add('point-pre');
              }, 300);
            }, 100);
          }, 30);
        } else {
          this.$confirm('当前无法添加购物车，请先登录', '登录提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            // this.$router.push({
            //   path: '/login'
            // });
            this.$router.push({ path:'/login' , query:{ redirect: this.$route.fullPath} })
          });
        }
      }
    }
  }
  var CLASSNAME_OUTER;
  var CLASSNAME_INNER;
  // 增加小球元素
  var outerWrapper;
  var endLeft;
  var endTop;
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
    border-radius: 20px;
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
    -webkit-box-shadow: 1px 1px 10px #333333;
    box-shadow: 0px 0px 10px #333333;
  }
  .goods-list li:hover .operate {
    visibility: visible;
  }
  .goods-list li:hover .price p {
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
  .d-target {
    width: 100px;
    height: 100px;
    position: fixed;
    right: -50px;
    top: 40px;
  }
  .outer {
    width: 30px;
    height: 30px;
    position: absolute;
    left: 0px;
    top: 0px;
    transition: all .35s linear;
    z-index: 999;
  }
  .outer .inner {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    transition: all .35s cubic-bezier(0, 0, .58, 1);
    position: absolute;
    z-index: 999;
    /* background: url("http://dummyimage.com/234x60"); */
    /* background: url(../assets/local/background.jpg) no-repeat; */
  }
  .outer.point-pre {
    display: none;
  }
</style>
