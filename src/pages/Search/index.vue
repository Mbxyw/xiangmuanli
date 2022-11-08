<template>
  <el-container>
    <!-- <el-aside class="sortform" v-if="this.isshowaside">
      <div class="salefont">销售排序</div>
      <div v-for="(item,index) in this.list" :key="index" class="saleitem">
        <div class="rank" style="color:red">top{{index+1}}</div>
        <div class="goodbox">
          <div class="goodsname">{{item.goodsname}} </div>
          <div class="goodssale" style="color: blue;">月销售额：{{item.salenum}}件</div>
        </div>
      </div>
    </el-aside> -->
  <el-main>
  <div class="outerbox">
    <div class="category">
      <div class="category_bar">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>{{keyword}}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>

    </div>
    <div class="sort">
      <div class="list">
        <a href="#" @click="chushi()">
          <div>所有商品</div>
        </a>
        <a href="#">
          <div>推荐</div>
        </a>
        <a href="#" @click="upsort()">
          <div>价格</div>
        </a>
        <a href="#" @click="salesort()">
          <div>销售额</div>
        </a>
        
        
      </div>
    </div>
    <div class="goods">
      <div class="product" >
        <ul v-if="this.siftList.length" class="productlist">
          <li v-for="(good,index) in this.list" :key="good.id" class="listitem">
            <!-- <li v-for="(good,index) in siftlist" :key="good.id"> -->
            <router-link :to="{name:'Detail',query:{id:good.id}}">
            <div class="pro-img">
              <a href="#">
                <img :src="good.imgUrl" alt="商品">
              </a>
            </div>
            <h3><a href="#">{{good.goodsname}}</a></h3>
            <p class="desc">{{good.descripte}}</p>
            <p class="price">
              <span>优惠:￥{{good.price}}</span>元
              <del>原价：￥{{good.delprice}}元</del>
            </p>
            <p class="price" style="color:blue">
              <span>销售额：{{good.salenum}}件</span>
            </p>
            <div class="review">
              <div class="add-product">
                <a href="#" class="quickview">查看</a>
              </div>
            </div>
            </router-link> 
          </li>
        </ul>
        <div class="none" v-if="!this.list.length"><h3>暂无该商品</h3></div>
      </div>
    </div>
  </div>
  </el-main>
  </el-container>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'Search',
  data() {
    return {
      list: [],
      isshowaside:false
    }
  },
  mounted() {
    this.list=this.siftList
  },
  computed: {
    ...mapState({
      goodsList: (state) => state.home.recommendList.goods,
    }),
    keyword() {
      return this.$route.params.keyword
    },
    siftList() {
      let arrList = [];
      if (this.keyword) {
        this.goodsList.forEach(item => {
          if (item.goodsname.indexOf(this.keyword) != -1) {
            arrList.push(item)
          }
        })
      }
      else if (this.querys) {
        this.goodsList.forEach(item => {
          if (item.categoryName === this.querys.categoryName)
          {
            arrList.push(item)
          }
        })
      }
      return arrList;
    },
    querys() {
      return this.$route.query
    }
  },
  methods: {
    usort(array, key) {
      return array.sort(function (a, b) {
        let x = a[key];
        let y = b[key];
        return ((x<y?-1:((x>y)?1:0)))
      })
    },
    upsort()
    {
      let sortlist = this.usort(this.list, 'price')
      this.list= sortlist
    },
    dsort(array, key) {
      return array.sort(function (a, b) {
        let x = a[key];
        let y = b[key];
        return ((x > y ? -1 : ((x < y) ? 1 : 0)))
      })
    },
    salesort() {
      let sortlist = this.dsort(this.list, 'salenum')
      this.list = sortlist
    },
    chushi() {
      this.list = this.goodsList
    },
  },
  watch: {
    siftList:{
      handler(val){
        this.list=val
      },
      deep: true
    }
  }
}
</script>

<style lang="less" scope>
a {
  text-decoration: none;
}

ul,
ol {
  list-style: none;
}

.outerbox {
  margin: 0 1%;

  .category {
    width: 100%;
    height: 40px;
    padding-top: 20px;

    // background-color: cyan;
    .category_bar {
      margin-left: 50px;
      height: 100%;
    }
  }

  .sort {
    width: 100%;
    height: 80px;
    display: block;
    float: left;
    background-color: rgb(167, 171, 171);

    .list {
      width: 100%;
      height: 60px;
      margin: 0 auto;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      font-size: 16px;
      margin-left: 50px;
      line-height: 60px;

      a {
        margin-right: 30px;

      }

      div {
        padding-top: 20px;
        height: 20px;
        line-height: 20px;
      }
    }
  }

  .goods {
    .product {
      padding-top: 10px;
      .productlist {
        margin-top: 20px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin: 13px 0px;
        flex-flow: row wrap;
          .listitem {
          height: 246px;
          padding: 34px 0 20px;
          z-index: 1;
          flex: 0 0 22%;
          margin-top: 50px;
          margin-left: 30px;
          margin-bottom: 14px;
          background: #fff;
          transition: all .2s linear;
          border: 0.05rem solid rgb(115, 114, 114);

        h3 {
          margin: 0 10px;
          font-size: 14px;
          font-weight: 400;
          text-align: center;

          a {
            color: #333;
          }
        }
      }
       
      }
      .none{
        color: #ff6700;
      }
      li:hover {
        -webkit-box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
        box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
        -webkit-transform: translate3d(0, -2px, 0);
        transform: translate3d(0, -2px, 0);
      }

      li:hover .review {
        opacity: 1;
        height: 54px;
      }

    }

    .pro-img {
      width: 60%;
      height: 60%;
      margin: 0 auto 18px;

      a {
        width: 100%;
        height: 100%;
      }

      img {
        display: block;
        width: 100%;
        height: 100%;
      }
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

      del {
        color: #b0b0b0;
      }
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

      .add-product {
        width: 100%;
        height: 100%;

        a {
          color: white;
          font-size: 20px;
          display: block;
          padding: 8px 30px;
          outline: 0;
          margin: 10px;

          span {
            display: block;
            margin-bottom: 5px;
            color: #fff;
          }
        }
      }
    }
  }
}
.sortform {
  .salefont{
    color: #ff6700;
  }
  .saleitem {
    margin-top: 10px;
    .goodbox{
      display: inline-block;
    }
  }
}
</style>