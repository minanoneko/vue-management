import axios from 'axios';
import {Message} from "element-ui";

const instance = axios.create({
    baseURL:'dev-api',
    timeout:1000
});

//请求拦截器
instance.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 响应拦截器
instance.interceptors.response.use(res=> {
    const code=res.data.status
    // 对响应数据做点什么
   if(code!==200){
       Message.error(res.data.message)
       return Promise.reject(false)
   }else {
       return res.data
   }
}, err=> {
    // 对响应错误做点什么
    return Promise.reject(error);
});

export default instance