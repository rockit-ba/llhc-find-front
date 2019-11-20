<template>
  <div>
       <p class="sign">ByteFuture</p>
       <div class="form">
           <van-cell-group class="form-group">
                <van-field
                    class="username"
                    v-model="username"
                    size=large
                    :border=border
                    label-align=center
                    input-align=center
                    left-icon="manager"
                    required
                    clearable
                    placeholder="用户名为11位手机号"
                    right-icon="question-o"
                    @click-right-icon="$toast('手机号只用作登录唯一标识，绝不会用作其它商用~')"
                    
                />
                <van-divider dashed :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 0 0 0',margin:'0 0 5px 0' }"></van-divider>
                <van-field
                    class="password"
                    v-model="password"
                    size=large
                    label-align=center
                    left-icon="browsing-history"
                    input-align=center
                    type="password"
                    placeholder="请输入密码"
                    required
                    right-icon=" "
                />
                <van-field
                    class="password"
                    v-model="configurePassword"
                    size=large
                    label-align=center
                    input-align=center
                    left-icon="warning"
                    type="password"
                    placeholder="确认密码"
                    required
                    right-icon=" "
                />
            </van-cell-group>
            <div class="register-button">
                <van-button round 
                    class="register-login"
                    size="large"
                    icon="medel"
                    @click=register
                    type="info"
                    :disabled=isIllegal()
                    style="margin-left:33%;margin-top:20%;width: 35%;"
                >注册
                </van-button>
            </div>

       </div>
  </div>
</template>

<script>
import {registerRequest} from "network/registerRequest"
export default {
    name: 'Register',
    data () {
        return {
            border: false,
            username: '',
            password: '',
            configurePassword: '',

        }
    },
    methods: {
        //判断用户是否填好了信息
        isIllegal() {
            const regu = "^[ ]+$";
            const re = new RegExp(regu);
            if(this.username.length == 11 && this.password!= '' && !re.test(this.password) && this.configurePassword!= '' && !re.test(this.configurePassword) && this.password.length == this.configurePassword.length){
                return false
            }else{
                return true
            }
        },
        register() {
            if(this.password == this.configurePassword){
                const _router = this.$router
                registerRequest(this.username,this.password,_router).then(res => {
                    const notify = this.$notify
                    if(res.code == 20000){
                        notify.setDefaultOptions({type:"success"})
                        notify('恭喜您注册成功！');
                        _router.push({
                            //注册成功携带原来的参数在登录端显示
                            path: '/login',
                            query: {username: this.username,password: this.password}
                            })
                    }else if(res.code == 20001){
                        notify.setDefaultOptions({type:"warning"})
                        notify('注册出了些问题，您可以稍等重新注册');
                        _router.push("/login")
                    }else if(res.code == 20006){
                        notify.setDefaultOptions({type:"warning"})
                        notify('此手机已经被注册~');
                        _router.push("/login")
                    }
                })
            }else{
                const notify = this.$notify
                notify.setDefaultOptions({type:"warning"})
                notify('两次密码不匹配呀~');
            }
        },
    }

}
</script>

<style>
    .form{
        margin-top: 50px;
        
    }
    .form-group{
        margin: auto;
        width: 80%;
    }
    .username{
        margin: auto;
        height: 60px;
       
    }
    .password {
        margin: auto;
        height: 55px;
    }
    .register-button {
       margin: auto;
        width: 80%;
    }
</style>