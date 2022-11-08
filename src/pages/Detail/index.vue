<template>
  <div class="detail">
    <!-- 主要内容区域 -->
    <section class="con" >
      <div class="mainCon">
        <div class="previewWrap">
          <img :src="goodsList[this.id].imgUrl" alt="图片">
        </div>
        <!-- 右侧选择区域布局 -->
        <div class="InfoWrap">
          <div class="goodsDetail">
            <h3 class="InfoName">{{goodsList[this.id].goodsname}}</h3>
            <div class="priceArea">
              <div class="priceArea1">
                <div class="title">价&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;格</div>
                <div class="price">
                  <i>¥</i>
                  <em>{{goodsList[this.id].price}}</em>
                </div>
              </div>
            </div>
          </div>

          <div class="choose">
            <div class="cartWrap">
              <div class="controls">
                <el-input type="text" class="itxt" v-model="skuNum"></el-input>
                <el-button style="font-weight:1500;margin-left:10px" @click="skuNum>1?skuNum--:skuNum=1"><b>-</b></el-button>
                <el-button style="" @click="skuNum++"><b>+</b></el-button>
                
              </div>
              <div class="add">
                <el-button type="danger" plain @click="addCart">加入购物车</el-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapState } from 'vuex'
  export default {
  name: 'Detail',
  data() {
    return {
      id: '',
      //产品的数量
      skuNum: 1
    }
  },
  mounted() {
    this.id = this.$route.query.id-1
  },
  computed: {
    ...mapState({
      goodsList: (state) => state.home.recommendList.goods,
    }),
  },
  methods: {
    addCart() {
      if (localStorage.getItem('token'))
      {
        let data = JSON.parse(localStorage.getItem('goods'))
        if (!data) data = [];
        let goods = {}
        goods = this.goodsList[this.id]
        goods.skuNum = this.skuNum
        goods.choose = true
        if (data.findIndex(item => item.id === goods.id) !== -1) {
          alert('你已经加入购物车')
        }
        else {
          this.$store.state.cart.totalnum++;
          this.$store.commit('cart/ADDGOODS', goods)
          data.push(goods)
          localStorage.setItem('goods', JSON.stringify(data))
          alert('加入购物车成功')
          window.location.reload()
        }
       
      }
      else {
        alert('抱歉，您尚未登录')
        this.$router.push('/login')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.detail {
    .con {
      width: 1200px;
      margin: 15px auto 0;
      .mainCon {
        overflow: hidden;
        margin: 5px 0 15px;

        .previewWrap {
          float: left;
          width: 400px;
          height:450px;
          position: relative;
          img{
            width:100%;
            height:100%
          }
        }

        .InfoWrap {
          width: 700px;
          float: right;

          .InfoName {
            font-size: 14px;
            line-height: 21px;
            margin-top: 15px;
          }
          .priceArea {
            padding: 7px;
            margin: 13px 0;

            .priceArea1 {
              overflow: hidden;
              line-height: 28px;
              margin-top: 10px;

              .title {
                float: left;
                margin-right: 15px;
              }

              .price {
                float: left;
                color: #c81623;

                i {
                  font-size: 16px;
                }

                em {
                  font-size: 24px;
                  font-weight: 700;
                }

                span {
                  font-size: 12px;
                }
              }

            }

            .priceArea2 {
              overflow: hidden;
              line-height: 28px;
              margin-top: 10px;

              .title {
                margin-right: 15px;
                float: left;
              }

              .fixWidth {
                width: 520px;
                float: left;

                .red-bg {
                  background: #c81623;
                  color: #fff;
                  padding: 3px;
                }

                .t-gray {
                  color: #999;
                }
              }
            }


          }

          .choose {
            .cartWrap {
              .controls {
                float: left;
                margin-right: 15px;

                .itxt {
                  width: 80px;
                  height: 37px;
                  border: 1px solid #ddd;
                  color: #555;
                  float: left;
                  border-right: 0;
                  text-align: center;
                }
              }

              .add {
                float: left;

                a {
                  background-color: #e1251b;
                  padding: 0 25px;
                  font-size: 16px;
                  color: #fff;
                  height: 36px;
                  line-height: 36px;
                  display: block;
                }
              }
            }
          }
        }
      }
    }
  }
</style>