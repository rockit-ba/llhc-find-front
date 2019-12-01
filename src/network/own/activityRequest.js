import {request} from '../request'

export function activityRequest(userId){
    return request({
        url: "/campus/find/"+userId,
        method: 'get',
      })
}