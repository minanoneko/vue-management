import request from '@/utils/request';

export function getSms(email,type) {
    return request({
        method:'post',
        url:'/getSms',
        data:{
            email,
            type,
        }
    })
}

export function reg(data) {
    return request({
        method:'post',
        url:'/reg',
        data:{
            ...data
        }
    })
}

export function login(data) {
    return request({
        method:'post',
        url:'/login',
        data:{
         ...data
        }
    })
}