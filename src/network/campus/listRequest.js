import {request} from '../request'

export function listRequest(page,size,type){
    return request({
        url: "/campus/find/"+page+"/"+size+"/"+type,
        method: 'get',
      })
}