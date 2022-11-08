//banner模块的小仓库
import { reqBannerList, reqRecommendList } from "@/api";
const state = {
    //轮播图数组
    bannerList: [],
    recommendList: [],
};
const actions = {
    //通过API里面的接口函数向服务器发送请求，获取服务器数据
    async getbannerList({ commit }) {
        let result = await reqBannerList();
        // console.log(result);
        if (result.code == 200)
            commit('GETBANNERLIST', result)
    },
    async getrecommendList({ commit }) {
        let result = await reqRecommendList();
        // console.log(result);
        if (result.code == 200)
            commit('GETRECOMMENDRLIST', result)
    },
};
const mutations = {
    GETBANNERLIST(state, bannerList) {
        state.bannerList = bannerList;
    },
    GETRECOMMENDRLIST(state, recommendList) {
        state.recommendList = recommendList;
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