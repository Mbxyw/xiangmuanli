//header模块的仓库
import { reqcategoryList } from "@/api";
const state = {
    //state中数据默认初始值别瞎写，服务器返回对象，服务器返回数组。[根据接口的返回值初始化]
    categoryList: [],
};
const actions = {
    //通过API里面的接口函数向服务器发送请求，获取服务器数据
    async getcategoryList({ commit }) {
        let result = await reqcategoryList();
        commit('CATEGORYLIST', result)
    },
};
const mutations = {
    CATEGORYLIST(state, categoryList) {
        state.categoryList = categoryList;
    },
};
const getters = {};
export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}