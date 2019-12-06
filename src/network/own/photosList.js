import {request} from '../request'

export function photosList(userId){
    return request({
        url: "/front/photosList/"+userId,
        method: 'get',
      })
}