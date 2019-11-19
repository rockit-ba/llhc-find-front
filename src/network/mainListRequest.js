import {request} from './request'

export function mainListRequest(){
    return request({
        url: "/front/listprop",
        method: 'get',
      })
}