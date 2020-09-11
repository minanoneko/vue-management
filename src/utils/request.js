import axios from 'axios';
import {Message} from "element-ui";

const instance = axios.create({
    baseURL:'dev-api',
    timeout:1000
});
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(res=> {
    const code=res.data.code
    // 对响应数据做点什么
    if(code===-1){
        Message.error('验证码发送失败');
        return Promise.reject(res)
    }else {
        return  res
    }
}, err=> {
    // 对响应错误做点什么
    return Promise.reject(error);
});

export default instance