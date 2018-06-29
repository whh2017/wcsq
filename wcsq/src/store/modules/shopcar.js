import { setStore, getStore } from '../../utils/utils'
export default {
    state: {
        count: 0,
        shopcarList:[]
    },
    mutations: {
        addThings: function( state, {productId, salePrice, productName, productImg , productNum = 1}) {
            state.shopcarList = JSON.parse(getStore('shopCar'));
            console.log(state.shopcarList);
            let cart = state.shopcarList;
            let flag = true;
            let item = {
                productId,
                productName,
                productImg,
                salePrice
            };
    
            if(cart.length) {
                cart.forEach(item => {
                    if (item.productId === productId) {
                        if(item.productNum >= 0) {
                            item.productNum += productNum
                            count++;
                            setStore('shopCar', cart);
                        }
                    }
                })
            }else{
                item.productNum = productNum;
                count++;
                cart.push(item);
                setStore('shopCar', cart);
            }

        },
        bb: function() {
            alert("sjb");
        }
    }
}