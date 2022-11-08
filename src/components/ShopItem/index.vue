<template>
    <div class="allShop clearfix" >
        <div class="Shop" v-for="(title,index) in recomList.title" :key="title.id">
            <div class="box">
            <div class="shoptitle">
                <h3 class="f1">{{title.shoptitle}}</h3>
            </div>
            <div class="product">
                <ul>              
                    <li v-for="(goods,index) in recomList.goods" :key="goods.id" v-if="goods.shoptitle===title.shoptitle">
                        <router-link :to="{name:'Detail',query:{id:goods.id}}">
                        <div class="pro-img">
                            <a href="#">
                                <img :src="goods.imgUrl" alt="商品">
                            </a>
                        </div>
                        <h3><a href="">{{goods.goodsname}}</a></h3>
                        <p class="desc">{{goods.descripte}}</p>
                        <p class="price">
                            <span>优惠:￥{{goods.price}}</span>元
                            <del>原价:￥{{goods.delprice}}元</del>
                        </p>
                        <div class="review">
                            <div class="add-product">
                                <a href="#" class="quickview">查看</a>
                            </div>
                        </div>
                        </router-link>
                    </li>

                </ul>
            </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ShopItem',
    props: ["recomList"],
}
</script>

<style scoped>
* {
    margin: 0;
    padding: 0;
}

ul,
ol {
    list-style: none;
}

input,
button {
    outline: none;
    border: none;
}

a {
    text-decoration: none;
}

.clearfix::before,
.clearfix::after {
    content: "";
    height: 0;
    line-height: 0;
    display: block;
    visibility: hidden;
}

.clearfix::after {
    clear: both;
}

/* shop */
.allShop{
    min-height: 900px;
    display: block;
}
.allShop .Shop {
    height: 47%;
}
.allShop .Shop .box{
    margin:2%;
    height: 400px;
    margin-top: 20px;
}

/* shoptitle */
.shoptitle {
    margin-bottom: 20px;
}
.product{
    padding-top: 10px;
}
/* shopitem */
.product ul{
    width: 100%;
    margin-top: 20px;
}
.product li {
    float: left;
    width: 22%;
    height: 246px;
    padding: 30px 4px 20px;
    z-index: 1;
    margin-left: 25px;
    margin-bottom: 14px;
    background: #fff;
    -webkit-transition: all .2s linear;
    transition: all .2s linear;
    position: relative;
    border: 0.05rem solid rgb(115, 114, 114);
    
}

.pro-img {
    width: 50%;
    height: 50%;
    margin: 0 auto 18px;
}

.pro-img a {
    width: 100%;
    height: 100%;
}

.pro-img img {
    display: block;
    width: 100%;
    height: 100%;
}

.product li h3 {
    margin: 0 10px;
    font-size: 14px;
    font-weight: 400;
    text-align: center;
}

.product li h3 a {
    color: #333;
}

.desc {
    margin: 0 10px 10px;
    height: 18px;
    font-size: 12px;
    text-align: center;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    color: #b0b0b0;
}

.price {
    font-size: 14px;
    margin: 0 10px 10px;
    text-align: center;
    color: #ff6700;
}

.price del {
    color: #b0b0b0;
}

.review {
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 3;
    width: 100%;
    height: 0;
    overflow: hidden;
    font-size: 12px;
    background: #b0b0b0;
    opacity: 0;
    -webkit-transition: all .2s linear;
    transition: all .2s linear;
}

.review .add-product {
    width: 100%;
    height: 100%;
}

.review .add-product a {
    color: white;
    font-size: 20px;
    display: block;
    padding: 8px 30px;
    outline: 0;
    margin: 10px;
}

.review .add-product a span {
    display: block;
    margin-bottom: 5px;
    color: #fff;
}

.product li:hover {
    -webkit-box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
    -webkit-transform: translate3d(0, -2px, 0);
    transform: translate3d(0, -2px, 0);
}


.product li:hover .review {
    opacity: 1;
    height: 54px;
}
</style>