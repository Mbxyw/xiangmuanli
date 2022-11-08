
const state = {
    //表示用户的登录状态值
    isLogined: localStorage.getItem("token") ? true : false,
    users: [{ username: 'admin', password: '123456' }, { username: 'admin123', password: '123456' }],
};
const actions = {
};
const mutations = {
    CHANGEISLOGINED(state, value) {
        state.isLogined = value
    },
    ADDUSERS(state, value) {
        let a = state.users.findIndex((item) => {
            value.username === item.username
        })
        if (a) {
            state.users.splice(a - 1, 1, value)
        }
        else state.users.push(value)
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