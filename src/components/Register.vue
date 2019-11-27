<template>
  <div>
        <van-row type="flex" justify="center" style="margin-top:10%;">
            <van-col span="20">
                <p style="text-align: center;" class="register-sign">ByteFuture</p>
            </van-col>
        </van-row>
       
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
                    @blur=isPhone
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
                    clearable
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
                    clearable
                    right-icon=" "
                />
            </van-cell-group>
            <van-row type="flex" justify="center">
                <van-col span="20">
                    <van-cell-group>
                        <van-field
                            v-model="sms"
                            center
                            clearable
                            label="验证码"
                            placeholder="请输入6位短信验证码"
                            maxlength=6
                        >
                            <van-button slot="button" size="small" type="primary" @click="smsSend">发送验证码</van-button>
                        </van-field>
                    </van-cell-group>
                </van-col>
            </van-row>

            <van-row type="flex" justify="center">
                <van-col span="20">
                    <van-button round 
                    class="register-login"
                    size="large"
                    icon="medel"
                    @click=register
                    :disabled=isIllegal()
                    style="margin-left:33%;margin-top:20%;width: 35%;"
                >注册
                </van-button>
                </van-col>
            </van-row>

       </div>
  </div>
</template>

<script>
import {registerRequest} from "network/registerRequest"
import {isMobileNumber} from "common/isMobileNumber"
import {smsSendRequest} from "network/smsSendRequest"
export default {
    name: 'Register',
    data () {
        return {
            border: false,
            phoneFlag: false,
            username: '',
            password: '',
            configurePassword: '',
            sms: '',

        }
    },
    methods: {
        smsSend(){
            const notify = this.$notify
            smsSendRequest(this.username).then(res => {
                if(res.code == 20000){
                    notify.setDefaultOptions({type:"success"})
                    notify(res.message);
                }else if(res.code == 20001){
                    notify.setDefaultOptions({type:"warning"})
                    notify(res.message);
                }else if(res.code == 20006){
                    notify.setDefaultOptions({type:"warning"})
                    notify(res.message);
                }
            })
        },
        isPhone(){
            this.phoneFlag = isMobileNumber(this.username)
            if(!this.phoneFlag){
                const notify = this.$notify
                notify.setDefaultOptions({type:"warning"})
                notify('手机号不合法~');
            }
        },
        //判断用户是否填好了信息
        isIllegal() {
            const regu = "^[ ]+$";
            const re = new RegExp(regu);
            if(this.phoneFlag == true && this.password!= '' && !re.test(this.password) && this.configurePassword!= '' && !re.test(this.configurePassword) && this.password.length == this.configurePassword.length && this.sms.length == 6){
                return false
            }else{
                return true
            }
        },
        register() {
            if(this.password == this.configurePassword){
                const _router = this.$router
                registerRequest(this.username,this.password,this.sms,_router).then(res => {
                   const notify = this.$notify
                    if(res.flag == true){
                        notify.setDefaultOptions({type:"success"})
                        notify('恭喜您注册成功！');
                        _router.push({
                            //注册成功携带原来的参数在登录端显示
                            //这里使用name和param传参是为了不然参数在地址栏显示出来
                            name: 'login',
                            params: {username: this.username,password: this.password}
                            })
                    }else if(res.flag == false){
                        notify.setDefaultOptions({type:"warning"})
                        notify(res.message);
                        _router.push("/register")
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
    .register-sign {
        font-size: 35px;
        font-family: 'Lucida Console';
        text-shadow: 3px 3px 3px #A6A5A5;
        animation:register-sign 100s;
    }
    .register-login {
        animation:register 100s;
    }

    @keyframes register-sign
    {
        3%   {color:#FF9E00;}
        6%   {color:#FFAD00;}
        9%   {color:#FFD500;}
        12%   {color:#C6FF00;}
        15%   {color:#77FF00;}
        18%   {color:#00FF68;}
        21%   {color:#77FF00;}
        24%   {color:#C6FF00;}
        27%   {color:#FFD500;}
        30%  {color:#FF9E00;}
        33%   {color:#FFAD00;}
        36%   {color:#FFD500;}
        39%   {color:#C6FF00;}
        42%   {color:#77FF00;}
        45%   {color:#00FF68;}
        48%   {color:#77FF00;}
        51%   {color:#C6FF00;}
        54%   {color:#FFD500;}
        57%  {color:#FF9E00;}
        60%   {color:#FFAD00;}
        63%   {color:#FFD500;}
        66%   {color:#C6FF00;}
        69%   {color:#77FF00;}
        72%   {color:#00FF68;}
        75%   {color:#77FF00;}
        78%   {color:#C6FF00;}
        83%   {color:#FFD500;}
        88%  {color:#FF9E00;}
        95%   {color:#FFAD00;}
        100%   {color:#FFD500;}
        
    }
     @keyframes register
    {
        3%   {background-color:#C6FF00;}
        6%   {background-color:#FFD500;}
        9%  {background-color:#FF9E00;}
        12%   {background-color:#FFAD00;}
        15%   {background-color:#FFD500;}
        18%   {background-color:#77FF00;}
        21%   {background-color:#C6FF00;}
        24%   {background-color:#FFD500;}
        27%  {background-color:#FF9E00;}
        30%   {background-color:#FFAD00;}
        33%   {background-color:#FFD500;}
        36%   {background-color:#77FF00;}
        39%   {background-color:#C6FF00;}
        42%   {background-color:#FFD500;}
        45%  {background-color:#FF9E00;}
        48%   {background-color:#FFAD00;}
        51%   {background-color:#FFD500;}
        54%   {background-color:#77FF00;}
        57%   {background-color:#C6FF00;}
        60%   {background-color:#FFD500;}
        63%  {background-color:#FF9E00;}
        66%   {background-color:#FFAD00;}
        69%   {background-color:#FFD500;}
        71%   {background-color:#77FF00;}
        74%   {background-color:#C6FF00;}
        77%   {background-color:#FFD500;}
        81%  {background-color:#FF9E00;}
        87%   {background-color:#FFAD00;}
        92%   {background-color:#FFD500;}
        100%   {background-color:#C6FF00;}
        
    }
</style>