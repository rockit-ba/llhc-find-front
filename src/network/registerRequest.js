import {request} from './request'

export function registerRequest(phone,password,code){
    return request({
        url: "/user/add",
        data: {
            phone: phone,
            password: password,
            code: code
        },
        method: 'post',
      })
}