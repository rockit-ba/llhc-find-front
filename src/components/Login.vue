<template>
  <div>
      
        <img width="20%" height="20%" style="margin-left:12%;margin-top:10%;" src="~assets/img/flag.png" />
        <span class="sign">ByteFuture</span>
      
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
            </van-cell-group>
            <div class="login-button">
                <van-button round 
                    class="user-login"
                    size="large"
                    icon="medel"
                    @click=login
                    :disabled=isIllegal()
                    style="margin-left:33%;margin-top:20%;width: 35%;"
                >登录
                </van-button>
            </div>
            <div class="login-bottom">
                <span @click="resetPwd" style="margin-left:18%;margin-top:80%;width: 35%;">忘记密码</span>
                <span style="margin-left:10%;">|</span>
                <span @click="register" style="margin-left:10%;margin-top:80%;width: 35%;">用户注册</span>
            </div>
            <div class="agreement">
                <span style="margin-left:11%;">登陆即代表阅读并同意<strong>服务协议</strong></span>
            </div>
       </div>
    
  </div>
</template>

<script>
export default {
    name: 'Login',
    data () {
        return {
            border: false,
            username: '',
            password: '',

        }
    },
    methods: {
        //判断用户是否填好了信息
        isIllegal() {
            const regu = "^[ ]+$";
            const re = new RegExp(regu);
            if(this.username.length == 11 && this.password!= '' && !re.test(this.password)){
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
        login(){
            console.log()
        }
        
    },
    created () {
        if(this.$route.query.username!=null){
            this.username = this.$route.query.username  
            this.password = this.$route.query.password
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
    .login-button {
       margin: auto;
        width: 80%;
    }
    .login-bottom {
        margin: auto;
        width: 80%;
        margin-top:20%;
    }
    .agreement {
        margin: auto;
        width: 80%;
        margin-top:3%;
    }


    .user-login{
        animation:login 100s;
    }
    .sign {
        margin-top: 15%;
        margin-right: 15%;
        float: right;
        text-align: center;
        font-size: 35px;
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