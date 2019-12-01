import {request} from '../request'

export function activityUpRequest(description,type,userId,fileName,base64Str){
    return request({
        url: "/campus/add",
        data: {
            description: description,
            type: type,
            userId: userId,
            fileName: fileName,
            base64Str: base64Str,
        },
        method: 'post',
      })
}