import axios from 'axios'
import nprogress from 'nprogress'
//引入进度条样式
import "nprogress/nprogress.css"
//1.利用axios对象方法create去创建一个axios实例
//2.request就是axios
const requests = axios.create({
    //基础路径：发送请求中路径当中会出现api
    baseURL: '/mock',

    //代表请求超时时间5s
    timeout: 5000,
});

//请求拦截器，在发送请求前，请求拦截器可以检测到，可以在请求发送之前做一些事情
requests.interceptors.request.use((config) => {

    //start:进度条开始动
    nprogress.start()

    return config
})
//响应拦截器
requests.interceptors.response.use((res) => {
    //成功的回调函数：服务器相应数据回来以后，响应拦截器可以检测到可以做些事情
    //进度条结束
    nprogress.done()
    return res.data;
}, (err) => {
    alert("服务器响应数据失败", err.message);
})
export default requests;