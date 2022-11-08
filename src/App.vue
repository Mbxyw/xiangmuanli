<template>
  <div id="app">
    <Header></Header>
    <router-view></router-view>
    <Footer v-show="$route.meta.show"></Footer>
  </div>
</template>

<script>
import Header from './components/Header/Header.vue'
import Footer from './components/Footer/Footer.vue'
export default {
  name: 'App',
  components: {
    Header, Footer
  },
  provide() {
    return {
      isRouterAlive:true
    }
  },
  methods: {
    reload() {
      this.isRouterAlive = false
      this.$nextTick(function () {
        this.isRouterAlive=true
      })
    }
  },
  mounted() {
    //派发一个action获取商品分类的三级列表的数据
    this.$store.dispatch("header/getcategoryList");
    this.$store.dispatch("home/getbannerList");
    this.$store.dispatch("home/getrecommendList")
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
