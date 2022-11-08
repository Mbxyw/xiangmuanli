//配置路由
import VueRouter from "vue-router"
//使用组件
//引入路由组件
import Home from '@/pages/Home/Home'
import Search from '@/pages/Search/'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Detail from '@/pages/Detail/index.vue'
import User from '@/pages/User'
import Cart from '@/components/Cart/Cart.vue'
import Info from '@/pages/UserInfo/Info.vue'
//先把VueRouter原型对象的push保存一份
let originPush = VueRouter.prototype.push
let originReplace = VueRouter.prototype.replace

//重写push|replace
//第一个参数：告诉原来push方法往哪里跳转(传递哪些参数)
//第二个参数:成功回调
//第三个参数:失败回调
VueRouter.prototype.push = function (location, resolve, reject) {
    if (resolve && reject) {
        //call||applay
        //相同点: 都可以调用函数一此，都可以篡改函数的上下文一次
        //不同点:call传递参数逗号隔开，apply法用执行传递数组
        originPush.call(this, location, resolve, reject)
    }
    else {
        originPush.call(this, location, () => { }, () => { })
    }
}
VueRouter.prototype.replace = function (location, resolve, reject) {
    if (resolve && reject) {
        //call||applay
        //相同点: 都可以调用函数一此，都可以篡改函数的上下文一次
        //不同点:call传递参数逗号隔开，apply法用执行传递数组
        originReplace.call(this, location, resolve, reject)
    }
    else {
        originReplace.call(this, location, () => { }, () => { })
    }
}

//配置组件
let router = new VueRouter({
    routes: [
        {
            path: '*',
            redirect: '/home',
            title: '主页'
        },
        {
            path: "/home",
            component: Home,
            meta: { title: '主页', show: true, isAuth: false }
        },
        {
            name: 'search',
            path: "/search/:keyword?",
            component: Search,

            meta: { title: '搜索', show: true, isAuth: false },
            //使用props后只能使用params参数
            // props: true
            //对象写法：将传递一些额外的props参数给路由
            // props:{a:1,b:2}
            //函数写法：可以params参数、query参数，通过props传递给路由组件
            props: ($route) => ({ keyword: $route.params.keyword })
        },
        {
            name: 'Login',
            path: "/login",
            component: Login,
            meta: { title: '登录', show: false, isAuth: false }

        },
        {
            name: 'Register',
            path: "/register",
            component: Register,

            meta: { show: false, title: '注册', isAuth: false }
        },
        {
            name: 'Detail',
            path: "/detail",
            component: Detail,
            meta: { show: true, title: '商品详情', isAuth: false },
        },
        {
            name: 'User',
            path: "/user",
            component: User,
            meta: { show: true, title: '个人信息', isAuth: true },
            children: [
                {
                    name: 'Cart',
                    path: "cart",
                    component: Cart,
                    meta: { title: '购物车', isAuth: true },
                },
                {
                    name: 'Info',
                    path: "info",
                    component: Info,
                    meta: { title: '个人信息', isAuth: true }
                }
            ]
        },
    ],
})
let token = localStorage.getItem('token')
router.beforeEach((to, from, next) => {
    //to可以获取要跳转到哪个路由信息
    //from可以获取到要从那个路由来的信息
    //next：放行函数
    next();

    //用户已经登录
    if (token) {
        //用户还想去login
        if (to.path == '/login') {
            next('/home')
        }
        else {
            //登陆了但不去login
            next()

        }
    } else {
        //未登录
        let topath = to.path
        if (topath.indexOf('/user') !== -1 || topath.indexOf('/cart') !== -1) {
            alert('目前尚未登录')
            next('/login')
        }
        else {
            next()
        }
    }
})
router.afterEach((to, from) => {
    document.title = to.meta.title || '购天堂'
})
export default router;