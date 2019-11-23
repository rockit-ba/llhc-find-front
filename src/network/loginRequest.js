import {request} from './request'

export function loginRequest(phone,password){
    return request({
        url: "/user/login",
        data: {
          phone: phone,
          password: password,
        },
        method: 'post',
      })
}