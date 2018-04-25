export default {
    state: {
        count: 10,
        shopcarList:[]
    },
    mutations: {
        addThings: function( state, {productId, salePrice, productName, productImg , productNum = 1}) {
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
                        }
                    }
                })
            }else{
                item.productNum = productNum;
                cart.push(item);
            }

        }
    }
}