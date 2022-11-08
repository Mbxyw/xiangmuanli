//创建mockserve.js 通过mock插件实现模拟数组
import Mock from 'mockjs'
//把JSON数据引入
//webpack默认对外暴露：图片、JSON数据格式
import banner from './banner.json'
import recommend from './recommend.json'
import categoryList from './categoryList'
import goods from './goods'
//mock我们的数组
//第一个参数，请求的地址
//第二个参数，请求的数据
Mock.mock("/mock/banner", { code: 200, data: banner });
Mock.mock("/mock/recommend", { code: 200, title: recommend, goods: goods });
Mock.mock("/mock/categoryList", { code: 200, data: categoryList });