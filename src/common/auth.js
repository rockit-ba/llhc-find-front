import Cookies from 'js-cookie'

const IdKey = 'User‐Id'
const NameKey = 'User‐Name'
const AvatarKey = 'User‐Avatar'
const PhoneKey = 'User‐Phone'
const TokenKey = 'User‐Token'

export function updateAvatar(avatarUrl){
    Cookies.set(AvatarKey, avatarUrl)
}

export function updateName(name){
    Cookies.set(NameKey, name)
}

//保存登录信息
export function setUser(id,name,avatar,token,phone) {
    Cookies.set(IdKey, id)
    Cookies.set(NameKey, name)
    Cookies.set(AvatarKey, avatar)
    Cookies.set(TokenKey, token)
    Cookies.set(PhoneKey, phone)
}
//获取登录信息
export function getUser() {
    //返回一个对象
    return {
        id: Cookies.get(IdKey),
        name:Cookies.get(NameKey),
        avatar:Cookies.get(AvatarKey),
        phone:Cookies.get(PhoneKey),
        token:Cookies.get(TokenKey),
    }
}
//退出登录
export function removeUser() {
    Cookies.remove(IdKey)
    Cookies.remove(NameKey)
    Cookies.remove(AvatarKey)
    Cookies.remove(PhoneKey)
    Cookies.remove(TokenKey)
}