import {request} from './request'

export function settingNicknameRequest(name,id){
    return request({
        url: "/user/updateName/"+name+"/"+id,
        method: 'put',
      })
}