
const state = {
    totalnum: 0,
    goods: [],
};
const actions = {
};
const mutations = {
    ADDGOODS(state, obj) {
        state.goods.push(obj)
    },
};
const getters = {

};
export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}