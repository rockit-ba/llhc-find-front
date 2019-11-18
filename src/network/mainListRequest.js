import {request} from './request'

export function mainListRequest(){
    return request({
        url: "/property/listprop",
        method: 'get',
      })
}