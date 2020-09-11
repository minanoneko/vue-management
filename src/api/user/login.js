import request from '@/utils/request';

export function getSms(email) {
    return request({
        method:'post',
        url:'/getSms',
        data:{
            email
        }
    })
}