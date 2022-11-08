import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);

import header from './header'
import home from './home';
import loginStatus from './loginStatus';
import cart from './cart'
//对外暴露store类的一个实例
export default new Vuex.Store({
    modules: {
        header, home, loginStatus, cart
    }
});