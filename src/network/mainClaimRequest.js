import {request} from './request'
//用户请求认领
export function mainClaimRequest(propId,userId){
    return request({
        url: "/front/mainclaim/"+propId+"/"+userId,
        method: 'put',
      })
}