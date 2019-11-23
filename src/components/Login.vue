<template>
  <div>
      
        <van-row type="flex" justify="center" style="margin-top:10%;">
            <van-col span="4" offset="3">
                <img width="65px" height="65px" src="~assets/img/flag.png" />
            </van-col>
            <van-col span="15" offset="2">
                <p class="sign" style="margin-top:5%;">ByteFuture</p>
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
                    @blur=isPhone
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
                    clearable
                    right-icon=" "
                />
            </van-cell-group>

            <van-row type="flex" justify="center">
                <van-col span="20">
                    <van-button round 
                    class="user-login"
                    size="large"
                    icon="medel"
                    @click=login
                    :disabled=isIllegal()
                    style="margin-left:33%;margin-top:20%;width: 35%;"
                >登录
                </van-button>
                </van-col>
            </van-row>

            <van-row type="flex" justify="center" style="margin-top:20%;">
                <van-col span="6" >
                    <p @click="resetPwd" style="text-align: center;"><strong>忘记密码</strong></p>
                </van-col>
                <van-col span="3">
                    <p style="text-align: center;">|</p>
                </van-col>
                <van-col span="6" >
                    <p @click="register" style="text-align: center;"><strong>用户注册</strong></p>
                </van-col>
            </van-row>

            <van-row type="flex" justify="center" style="margin-top:3%;">
                <van-col span="20">
                    <p style="text-align: center;">登陆即代表阅读并同意<strong>服务协议</strong></p>
                </van-col>
            </van-row>
       </div>
    
  </div>
</template>

<script>
import {isMobileNumber} from "common/isMobileNumber"
import {loginRequest} from "network/loginRequest"
import {setUser} from 'common/auth'
export default {
    name: 'Login',
    data () {
        return {
            border: false,
            phoneFlag: false,
            username: '',
            password: '',
        }
    },
    methods: {
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
            if(this.phoneFlag == true  && this.password!= '' && !re.test(this.password)){
                return false
            }else{
                return true
            }
        },
        //忘记密码
        resetPwd() {
            
        },
        //注册用户
        register() {
            this.$router.push('/register')
        },
        //登录
        login(){
            const _router = this.$router
            const _route = this.$route
            loginRequest(this.username,this.password,_router,_route).then(res => {
                const notify = this.$notify
                if(res.flag == true){
                    //登录成功保存登录信息，调用工具类
                    setUser(res.data.id,res.data.name,res.data.avatarUrl,res.data.token,res.data.phone)
                    //跳回原来的路由,但是如果用户第一次打开浏览器的话就没有参数，走第二个逻辑
                    if(_route.params.page != undefined){
                        _router.push("/all/"+_route.params.page)
                    }else{
                        console.log(1)
                        _router.push("/all/main")
                    }
                    
                }else if(res.code == 20002){
                    notify.setDefaultOptions({type:"warning"})
                    notify('登录名错误~');
                     _router.push('/login')
                }else if(res.code == 20003){
                    notify.setDefaultOptions({type:"warning"})
                    notify('密码错误~');
                     _router.push('/login')
                }
            })
        }
        
    },
    created () {
        if(this.$route.params.username!=null){
            this.username = this.$route.params.username  
            this.password = this.$route.params.password
        }  
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
    .user-login{
        animation:login 100s;
        
    }
    .sign {
        font-size: 180%;
        font-family: 'Lucida Console';
        text-shadow: 3px 3px 3px #A6A5A5;
        animation:sign 100s;
    }

    @keyframes sign
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
    @keyframes login
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