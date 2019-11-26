import {request} from '../request'

export function feedSubmitRequest(feed){
    return request({
        url: "/front/feedSubmit",
        data: {
          feed: feed
        },
        method: 'post',
      })
}