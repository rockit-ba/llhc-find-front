import {request} from '../request'

export function removeComment(_id){
    return request({
        url: "/comment/delete/"+_id,
        method: 'delete',
      })
}