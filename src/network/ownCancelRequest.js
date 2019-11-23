import {request} from './request'

//撤销操作
// 设置upcoming=1，表示已经办理
// 删除userID的值
// 因此只需要propertyid
export function ownCancelRequest(id){
    return request({
        url: "/front/ownCancel?id="+id,
        method: 'put',
      })
}