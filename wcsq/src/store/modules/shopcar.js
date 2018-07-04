import {
  setStore,
  getStore
} from '../../utils/utils'
export default {
  state: {
    count: 0,
    shopcarList: []
  },
  mutations: {
    addThings: function (state, {
      productId,
      salePrice,
      productName,
      productImg,
      productNum = 1
    }) {
      if (!getStore('shopCar')) {
        var InitArray = [];
        setStore('shopCar', JSON.stringify(InitArray));
      }
      state.shopcarList = JSON.parse(getStore('shopCar'));
      let cart = state.shopcarList;
      let flag = false;
      let item = {
        productId,
        productName,
        productImg,
        salePrice
      };
      if (cart.length) {
        cart.forEach(item => {
          if (item.productId === productId) {
            if (item.productNum >= 0) {
              item.productNum += productNum
              state.count++;
              setStore('shopCar', cart);
              flag = true;
            }
          }
        });
        if (!flag) {
          item.productNum = productNum;
          state.count++;
          cart.push(item);
          setStore('shopCar', cart);
        }
      } else {
        item.productNum = productNum;
        state.count++;
        cart.push(item);
        setStore('shopCar', cart);
      }

    },
    bb: function () {
      
    },
    changeCount: function(state, count) {
      state.count = count;
    }
  }
}
