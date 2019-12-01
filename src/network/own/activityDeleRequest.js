import {request} from '../request'

export function activityDeleRequest(id){
    return request({
        url: "/campus/delete/"+id,
        method: 'delete',
      })
}