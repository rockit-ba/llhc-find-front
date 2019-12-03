import {request} from '../request'

export function commentList(page,size,activityid){
    return request({
        url: "/comment/find/"+page+"/"+size+"/"+activityid,
        method: 'get',
      })
}