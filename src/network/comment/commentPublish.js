import {request} from '../request'

export function commentPublish(userid,name,avatarurl,comment,activityid){
    return request({
        url: "/comment/add",
        data: {
            userid: userid,
            name: name,
            avatarurl: avatarurl,
            comment: comment,
            activityid: activityid,
        },
        method: 'post',
      })
}