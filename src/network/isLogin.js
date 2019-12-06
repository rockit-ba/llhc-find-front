import {request} from './request'

export function isLogin(){
    return request({
        url: "/user/isLogin",
        method: 'get',
      })
}