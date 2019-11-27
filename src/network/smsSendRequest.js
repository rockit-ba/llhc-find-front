import {request} from './request'

export function smsSendRequest(phone){
    return request({
        url: "/user/getSmsCode/"+phone,
        method: 'get',
      })
}