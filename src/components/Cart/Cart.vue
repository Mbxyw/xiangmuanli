<template>
    <div class="cart_page">
        <table>
            <thead>
                <tr>
                    <th style="width: 8%">
                        <input type="checkbox" v-model="isSelectAll" @click="isPro(isSelectAll)">全选
                    </th>
                    <th style="width: 30%">商品信息</th>
                    <th>价格</th>
                    <th>数量</th>
                    <th>小计</th>
                    <th>操作</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(goods,index) in mycartgoods" :key="index">
                    <td>
                        <input type="checkbox" v-model="goods.choose">
                    </td>
                    <td>
                        <section>
                            <img width="84" :src="goods.imgUrl" alt="列表图片" />
                            <div class="info">
                                <h5>{{goods.goodsname}}</h5>
                            </div>
                        </section>
                    </td>
                    <td>{{goods.price}}</td>
                    <td>
                        <div class="step">
                            <span @click="minus(index)">-</span>
                            <input type="text" v-model="goods.skuNum">
                            <span @click="add(index)">+</span>
                        </div>
                    </td>
                    <td>{{goods.price*goods.skuNum}}</td>
                    <td>
                        <span class="del" @click="deleone(index)">删除</span>
                    </td>
                </tr>
            </tbody>
        </table>
        <div class="total"><span>{{getTotal.totalNum}}</span>件商品&nbsp&nbsp总计：<span>{{getTotal.totalPrice}}</span></div>
        <div class="submit">提交</div>
    </div>
</template>
<script>
import { mapState } from 'vuex';
export default {
    data() {
        return {
            mycartgoods: [],
        }
    },
    created() {
        this.initGet()
    },
    methods: {
        initSet() {
            if (localStorage.goods) {
                localStorage.setItem('goods', JSON.stringify(this.mycartgoods))
            }
        },
        initGet() {
            if (localStorage.goods)
            this.mycartgoods = JSON.parse(localStorage.goods)
        },

        isPro(isSelectAll) {
            this.mycartgoods.forEach((item) => {
                item.choose = !isSelectAll
            })
        },
        deleone(index) {
            this.mycartgoods.splice(index, 1),
            this.initSet()
        },
        add(index) {
            this.mycartgoods[index].skuNum++
            this.initSet()
        },
        minus(index) {
            if (this.mycartgoods[index].skuNum>1)
            {
                this.mycartgoods[index].skuNum--
            }
            else this.mycartgoods[index].skuNum=1
            this.initSet()
        }
    },
    computed: {
        isSelectAll() {
            return this.mycartgoods.every(function (val) {
                return val.choose
            })
        },
        getTotal() {
            let goods = this.mycartgoods.filter(function (val) {
                return val.choose
            }),
            totalPrice = 0, totalNum = 0
            goods.forEach((item) => {
                totalNum += item.skuNum
                totalPrice += item.price * item.skuNum
            })
            return {
                totalNum,
                totalPrice
            }
        },
    },
};
</script>
<style lang="less" scoped>
.cart_page {
    background: #fff;

    table {
        width: 100%;
        border: 1px solid #e6e6e6;
        box-sizing: border-box;
        color: #666;
        border-collapse: collapse;
        font-size: 14px;

        thead {
            background: #f2f2f2;

            th {
                padding: 19px 0;

            }
        }

        tbody {
            tr {
                td {
                    vertical-align: middle;
                    text-align: center;
                    padding: 19px 0;
                    table-layout: fixed; // td的宽度固定，不随内容变化

                    section {
                        padding-left: 5px;
                        display: flex;
                        box-sizing: border-box;

                        img {
                            margin-right: 12px;
                            width: 100px;
                        }

                        .info {
                            padding-top: 20px;
                            flex: 1;
                            overflow: hidden;
                            box-sizing: border-box;
                            text-align: left;
                            margin-left: 15px;

                            h5 {
                                overflow: hidden;
                                color: #333;
                                font-size: 18px;
                                white-space: nowrap;
                                text-overflow: ellipsis;
                                margin-bottom: 40px;

                            }

                            p {
                                color: #666;
                                overflow: hidden;
                                white-space: nowrap;
                                text-overflow: ellipsis;
                            }
                        }
                    }

                    .step {
                        width: 106px;
                        height: 32px;
                        margin: auto;

                        span {
                            float: left;
                            width: 30px;
                            height: 32px;
                            display: block;
                            border: solid 1px #d1d1d1;
                            font-size: 20px;
                            box-sizing: border-box;
                            font-weight: normal;
                            font-stretch: normal;
                            line-height: 30px;
                            color: #999999;
                            text-align: center;
                            cursor: pointer;
                            background: #fff;
                        }

                        input {
                            box-sizing: border-box;
                            width: 46px;
                            height: 32px;
                            float: left;
                            text-align: center;
                            font-size: 14px;
                            line-height: 23px;
                            letter-spacing: 0px;
                            color: #666666;
                            border: 0;
                            border-top: 1px solid #d1d1d1;
                            border-bottom: 1px solid #d1d1d1;
                            background: #fff;
                        }
                    }

                    .del {
                        border: 1px solid #ececec;
                        border-radius: 4px;
                        padding: 5px 10px;
                        cursor: pointer;

                        &:hover {
                            color: #fff;
                            background: #0a328e;
                        }
                    }
                }
            }
        }
    }

    .total {
        padding: 30px 0;
        text-align: right;
        font-size: 22px;

        span {
            font-weight: bold;
            color: #fd604d;
        }
    }

    .submit {
        width: 175px;
        height: 40px;
        text-align: center;
        line-height: 40px;
        font-family: SourceHanSansSC-Light;
        font-size: 18px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #ffffff;
        cursor: pointer;
        background-color: #0a328e;
        display: block;
        float: right;
    }
}
</style>