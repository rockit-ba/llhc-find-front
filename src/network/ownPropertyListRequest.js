import {request} from './request'

export function ownPropertyListRequest(userId){
    return request({
        url: "/front/ownlistprop/"+userId,
        method: 'get',
      })
}