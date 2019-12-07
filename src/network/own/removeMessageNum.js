import {request} from '../request'

export function removeMessageNum(userId){
    return request({
        url: "/user/removeMessageNum/"+userId,
        method: 'get',
      })
}