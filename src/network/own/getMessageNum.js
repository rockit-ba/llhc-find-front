import {request} from '../request'

export function getMessageNum(userId){
    return request({
        url: "/user/messageNum/"+userId,
        method: 'get',
      })
}