import {request} from './request'

export function mainListRequest(page,size){
    return request({
        url: "/front/listprop/"+page+"/"+size,
        method: 'get',
      })
}