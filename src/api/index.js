//当前这个模块：API进行统一管理
import mockrequests from './mockajax'
//api/students
export const reqcategoryList = () => {
    return mockrequests({ url: '/categoryList', method: 'get' })
};

//获取主页的轮播图
export const reqBannerList = () => {
    return mockrequests({ url: '/banner', method: 'get' })
};
//商品数据
export const reqRecommendList = () => {
    return mockrequests({ url: '/recommend', method: 'get' })
};