import {request} from './request'

export function loginRequest(){
    return request({
        url: "/user/loginPage",
        method: 'get',
      })
}