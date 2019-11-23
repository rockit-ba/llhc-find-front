import {request} from './request'

export function settingAvatarRequest(base64Str,filename,userId){
    return request({
        url: "/front/uploadAvator/"+userId,
        data: {
          base64Str: base64Str,
          filename: filename
        },
        method: 'post',
      })
}
