import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

// import shopcar from './modules/shopcar'
export default new Vuex.Store({
    modules: {
        // shopcar : shopcar
    },
    state:{
        islogin: false,
        user: {
            mobile: null,
            name: null,
            head_src: null
        },
        hasNotify: false,
        ActiveView: '1'
    },
    mutations: {
        hasLogin: function(state) {
            state.islogin = true;
        }
    },
    actions: {

    }
});