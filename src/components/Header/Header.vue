<template>
    <div class="header">
        <div class="header_top">
            <router-link to="/home" class="header_title">
                <div class="header_title_logo">
                    <img src="./images/logo.png" alt="logo"></img>
                </div>
                <div class="header_title_text">购天堂</div>
            </router-link>
            <transition name="searchbtn">
                <div class="search" @keyup.enter="goSearch">
                    <input type="text" class="search-txt" placeholder="请搜索商品名称" v-model="keyword">
                    <button class="search-btn-box" @click="goSearch">
                        <div class="search-btn">
                            <img src="./images/search.png" alt="search">
                        </div>
                    </button>
                </div>
            </transition>
            <div class="showbox" v-show="!isLogined">
                <router-link class="show-next-box" to="/login">
                    <div class="log_reg_item">登录</div>
                </router-link>
                <router-link class="show-next-box" to="/register">
                    <div class="log_reg_item">注册</div>
                </router-link>
            </div>
            <div class="showbox" v-show="isLogined" >
                <router-link class="show-next-box" to="/user/info">
                    <div class="log_reg_item">个人中心</div>
                </router-link>
                <router-link class="show-next-box" to="/user/cart">
                    <div class="log_reg_item" >
                        <div class="cart">
                                <img :src="cart" alt="购物车">
                                <b>{{this.list.length}}</b>
                        </div>
                    </div>
                </router-link>

            </div>
        </div>
        <div class="header_nav">
            <ul class="HorizontalList">
                <li class="Horizontal_Item" @mouseleave="leaveIndex(),showcategoryIndex=0"
                    @mouseenter="showcategoryIndex=1">
                    分类
                    <!-- 分级联动 -->
                    <div class="sort" :style="{display:showcategoryIndex?'block':'none'}">
                        <!-- 利用事件的委派+编程式导航实现路由的跳转与传递参数 -->
                        <div @click="agotoSearch">
                            <div class="item" v-for="(c1,index) in categoryList.data" :key="c1.categoryid"
                                :class="{cur:currentIndex==index}">
                                <h3 @mouseenter="changeIndex(index)">
                                    <a :data-categoryName="c1.categoryname"
                                        :data-category1Id="c1.categoryid">{{c1.categoryname}}</a>
                                </h3>
                                <div class="item-list" :style="{display:currentIndex==index?'block':'none'}">
                                    <div class="subitem" v-for="(c2,index) in c1.categorychild" :key="c2.categoryid">
                                        <dl class="fore">
                                            <dt>
                                                <a :data-categoryName="c2.categoryname"
                                                    :data-category2Id="c2.categoryid">{{c2.categoryname}}</a>
                                            </dt>
                                            <dd>
                                                <em v-for="(c3,index) in c2.categorychild" :key="c3.categoryid">
                                                    <a :data-categoryName="c3.categoryname"
                                                        :data-category3Id="c3.categoryid">{{c3.categoryname}}</a>
                                                </em>
                                            </dd>
                                        </dl>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </li>
                <li class="Horizontal_Item">购物</li>
                <li class="Horizontal_Item">关于我们</li>
                <li class="Horizontal_Item">联系我们</li>
            </ul>
        </div>
    </div>
</template>

<script>
import throttle from 'lodash/throttle'
import { mapState, mapMutations } from 'vuex';
console.log();
export default {
    name: "Header",
    data() {
        return {
            keyword: '',
            currentIndex: -1,
            showcategoryIndex: 0,
            list:[]
        }
    },
    mounted() {
        this.list = this.goodlist
    },
    computed: {
        ...mapState({
            categoryList: (state) => {
                return state.header.categoryList
            },
        }),
        ...mapState({
            isLogined: (state) => state.loginStatus.isLogined,
            totalnum: (state) => state.cart.totalnum
        }),
        cart() {
            if (this.list.length) {
                return require('./images/cartfull.png')
            }
            else return require('./images/cartnone.png')
        },
        goodlist() {
            let locallist
            if (localStorage.goods) {
                locallist = JSON.parse(localStorage.goods)
            }
            else locallist = []
            return locallist
        }
    },
    methods: {
        
        goSearch() {
            //校验数据
            if (!this.keyword.trim()) alert('输入不能为空')
            if (this.$route.query) {
                let location = { name: 'search', params: { keyword: this.keyword} }
                location.query = this.$route.query
                this.$router.push(location)
                this.keyword = ''
            }
        },
        //利用事件的委派
        agotoSearch(event) {
            //利用事件的委派存在一些问题:如何解决传参，如何解决点击的是否为a标签内容
            //解决如何是a标签问题
            //在a标签中添加自定义属性data-categoryName，其余子节点没有
            let element = event.target
            //节点有一个dataset属性，可以获取节点的自定义属性与属性值
            let {
                categoryname,
                category2id,
                category3id
            } = element.dataset
            if (categoryname) {
                //整理路由跳转的参数
                let location = { name: 'search' };
                let query = { categoryName: categoryname };
                if (category2id) {
                    query.category2Id = category2id
                } else {
                    query.category3Id = category3id
                }
                //如果路由跳转的时候有params参数，也要传递过去
                if (this.$route.params) {
                    location.params = this.$route.params
                    location.query = query
                    this.$router.push(location)
                }
            }
        },
        //鼠标进入修改响应式数组的currentIndex属性
        //index为一级分类的索引值
        //引入throttle进行节流
        //throttle不要用箭头函数
        changeIndex: throttle(function (index) {
            this.currentIndex = index
        }, 50),

        leaveIndex() {
            this.currentIndex = -1
        }
    },
    watch: {
        goodlist: {
            handler(val) {
                this.list = val
            },
            deep:true
        }
    }
};
</script>

<style scoped>
a {
    text-decoration: none;
}

b {
    float: right;
    margin-right: 16px;
    margin-top: 16px;
    color: white;
    width: 25px;
    height: 25px;
    border-radius: 50%;
    background-color: orange;
    text-align: center;
    line-height: 25px;
}

.router-link-active {
    text-decoration: none;
}

/* header包裹 */
.header_nav,
.header_top {
    height: 80px;
    margin: 0 1%;
    /* border-bottom: 1px solid #e9e9e9; */
    display: flex;
    align-items: center;
}

.header_top {
    justify-content: space-between;
}

.header_nav {
    border-bottom: 0.05rem solid #847878;
    justify-content: space-around;
}

/* logo_title样式 */
.header_title {
    height: 100%;
    width: 15%;
    /* border: 1px solid blue; */
    display: flex;
    justify-content: space-around;
    align-items: center;
}

.header_title_logo {
    width: 60%;
    height: 100%;
}

.header_title_logo img {
    height: 100%;
}

.header_title_text {
    width: 40%;
    text-align: 80px;
}

/* 登录/注册样式 */
.showbox {
    width: 18%;
    height: 100%;
    /* display:none; */
    /* border: 1px solid red; */
}

/* 购物车 */
.show-next-box {
    width: 35%;
    height: 70%;
    margin: 2.5% 2%;
    display: inline-block;
    border: 1px solid blue;
}

.show-next-box:hover {
    background-color: #b6b4b4;
}

.log_reg_item {
    font-size: 1rem;
    line-height: 56px;
}
.log_reg_item .cart img{
    text-align: center;
    line-height: 56px;
    vertical-align:middle;

}

/* 搜索框样式 */
.search {
    background: #353b48;
    height: 40px;
    border-radius: 40px;
    padding: 5px;
    margin-left: 5%;
}

.search:hover .search-txt {
    width: 300px;
    padding: 0 6px;
}

.search .search-btn-box {
    color: lightslategray;
    float: right;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: rgb(239, 229, 211);
    display: flex;
    justify-content: center;
    align-items: center;
}

.search-btn {
    border: 0;
    outline: none;
    background-color: transparent;
}

.search-btn img {
    width: 80%;
}

.search .search-txt {
    border: none;
    background: none;
    outline: none;
    float: left;
    padding: 0;
    color: white;
    font-size: 1rem;
    transition: 0.4s;
    line-height: 40px;
    width: 0px;
}

/* header头部导航栏 */
.HorizontalList {
    list-style: none;
    /* border-bottom: 0.05rem solid #000; */
    width: 40%;
    margin-right: 30%;
    margin-left: 30%;
}

/* .HorizontalList li:hover .sort {
    display: block;
} */
.Horizontal_Item {
    width: 23%;
    display: inline-block;
    margin-top: 4%;
    padding-bottom: 10px;
    height: 30%;
    font-size: 15px;
    border-left: 0.05rem solid black;
}

.HorizontalList li:last-child {
    border-right: 0.05rem solid black;
}

/* 显示类型列表 */

/* 判断鼠标移动到哪个子列表位置 */
.cur {
    background-color: skyblue;
}

.sort {
    left: 0px;
    top: 154px;
    width: 50%;
    margin-left: 25%;
    height: 461px;
    position: absolute;
    background: #fafafa;
    display: none;
    z-index: 9999 !important;
}



.sort .item {
    margin-left: 10%;
    width: 10%;
    /* background-color: #aaa; */
}

.sort .item .item-list {
    display: none;
    position: absolute;
    width: 75%;
    min-height: 460px;
    background: #eee;
    margin-left: 15%;
    /* border: 1px solid #ddd; */
    top: 0;
}

.sort .item .item-list .subitem {
    float: left;
    width: 100%;
    height: 40px;
    margin-left: 20px;
}

.sort .item .item-list .subitem dl {
    border-bottom: 1px solid #eee;
    padding-top: 2px;
    padding-bottom: 5px;
    overflow: hidden;
    zoom: 1;
}

.sort .item .item-list .subitem dl dt {
    float: left;
    width: 54px;
    line-height: 22px;
    text-align: right;
    /* padding: 3px 6px 0 0; */
    font-weight: 800;
}

.sort .item .item-list .subitem dl dd {
    float: left;
    width: 415px;
    padding-bottom: 4px;
    overflow: hidden;
}

.sort .item .item-list .subitem dl dd em {
    float: left;
    height: 14px;
    line-height: 14px;
    padding: 0 8px;
    margin-top: 5px;
    border-left: 1px solid #ccc;
}

/* .sort .item:hover .item-list {
    display: block;
} */
</style>