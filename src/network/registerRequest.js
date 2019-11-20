import {request} from './request'

export function registerRequest(phone,password){
    return request({
        url: "/user/add",
        data: {
            phone: phone,
            password: password,
        },
        method: 'post',
      })
}